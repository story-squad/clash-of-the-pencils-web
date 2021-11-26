import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { account, auth } from '../../../state';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type AccountEditProps = FormProps<AccountEditFields>;

export interface AccountEditFields {
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
  closeModal: () => void;
}

export default function AccountUpdateForm({
  closeModal,
  id,
  onSubmit,
}: NewPasswordProps): React.ReactElement {
  const { watch, clearErrors, handleSubmit, reset } = useFormContext();
  const user = useRecoilValue(auth.user);
  const setSubmited = useSetRecoilState(account.isSubmitted);

  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  const [submitForm, isSubmitting] = useAsync({
    run: async (data: AccountEditFields) => {
      if (id && data.password && data.confirmPassword) {
        await onSubmit({ id: id, password: data.password });
        reset();
        closeModal();
      }
    },
    onError: () => console.log('broke'),
    onSuccess: () => setSubmited(true),
  });

  return (
    <>
      <form className="account-form" onSubmit={handleSubmit(submitForm)}>
        {authFormInputs.email({
          rules: {
            validate: {
              matches: () =>
                watch('email') === user?.email ||
                'Email does not match email on file.',
            },
          },
        })}
        {authFormInputs.password()}
        {authFormInputs.confirmPassword({
          rules: {
            validate: {
              matches: (confirmValue) =>
                watch('password') === confirmValue || 'Passwords must match!',
            },
          },
        })}
        <div className="button-row">
          <Button type="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={clearFormError}
            disabled={isSubmitting}
            iconRight={isSubmitting && <LoadIcon />}
          >
            Confirm Changes
          </Button>
        </div>
      </form>
    </>
  );
}
