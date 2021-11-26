import { useAsync } from '@story-squad/react-utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import { AccountEditFields, AccountUpdateFormProps } from './EditPasswordForm';
import './styles/index.scss';

export type UpdatePersonalProps = FormProps<{
  id: number;
  firstname: string;
  lastname: string;
  dob: string;
}> &
  AccountUpdateFormProps;

export default function EditPersonalForm({
  onCancel,
  id,
  onSubmit,
}: UpdatePersonalProps): React.ReactElement {
  const user = useRecoilValue(auth.user);
  const { handleSubmit, reset } = useFormContext();

  const cancel = () => {
    onCancel();
    reset();
  };

  const [submitForm, isSubmitting] = useAsync({
    run: async (data: AccountEditFields) => {
      if (id && data.firstname && data.lastname && data.dob) {
        await onSubmit({
          id: id,
          firstname: data.firstname,
          lastname: data.lastname,
          dob: data.dob,
        });
        await cancel();
      }
    },
  });

  return (
    <form className="personal-form" onSubmit={handleSubmit(submitForm)}>
      {authFormInputs.firstname({
        defaultValue: user?.firstname,
      })}
      {authFormInputs.lastname({
        defaultValue: user?.lastname,
      })}
      {authFormInputs.birthday({
        defaultValue: user?.dob,
      })}
      <div className="button-row">
        <Button type="secondary">Cancel</Button>
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
