import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useAsync from '../../../hooks/useAsync';
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

export interface AccountUpdateFormProps {
  id: number;
  onCancel: () => void;
}

export default function AccountUpdateForm({
  id,
  onCancel,
  onSubmit,
  onError,
}: NewPasswordProps): React.ReactElement {
  const { watch, handleSubmit, reset } = useFormContext();
  const user = useRecoilValue(auth.user);
  const setSubmited = useSetRecoilState(account.isSubmitted);

  const cancel = () => {
    onCancel();
    reset();
  };

  const [submitForm, isSubmitting] = useAsync({
    asyncFunction: async (data: AccountEditFields) => {
      if (id && data.password && data.confirmPassword) {
        await onSubmit({ id: id, password: data.password });
        cancel();
      }
    },
    onError,
    onSuccess: () => setSubmited(true),
  });

  return (
    <form className="account-form" onSubmit={handleSubmit(submitForm)}>
      {authFormInputs.email({
        defaultValue: user?.email,
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
        <Button type="secondary" onClick={cancel}>
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          iconRight={isSubmitting && <LoadIcon />}
        >
          Confirm Changes
        </Button>
      </div>
    </form>
  );
}
