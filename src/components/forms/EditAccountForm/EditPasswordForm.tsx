import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { account } from '../../../state';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type EditProps = FormProps<AccountEditFields>;

interface AccountEditFields {
  id?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstname?: string;
  lastname?: string;
  dob?: string;
}

export type NewPasswordProps = FormProps<{ id: number; password: string }> &
  AccountUpdateFormProps;

interface AccountUpdateFormProps {
  id: number;
}

export default function AccountUpdateForm({
  id,
  onSubmit,
}: NewPasswordProps): React.ReactElement {
  const { handleSubmit, watch, clearErrors } = useFormContext();
  const setSubmited = useSetRecoilState(account.isSubmitted);

  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  const [submitForm, isSubmitting] = useAsync({
    run: async (data: AccountEditFields) => {
      if (id && data.password && data.confirmPassword) {
        await onSubmit({ id: id, password: data.password });
      }
    },
    onError: () => console.log('broke'),
    onSuccess: () => setSubmited(true),
  });

  return (
    <>
      <form className="email-form" onSubmit={handleSubmit(submitForm)}>
        {authFormInputs.email()}
        {authFormInputs.password()}
        {authFormInputs.confirmPassword({
          rules: {
            validate: {
              matches: (confirmValue) =>
                watch('password') === confirmValue || 'Passwords must match!',
            },
          },
        })}
        <Button
          onClick={clearFormError}
          disabled={isSubmitting}
          iconRight={isSubmitting && <LoadIcon />}
        >
          Confirm Changes
        </Button>
      </form>
    </>
  );
}
