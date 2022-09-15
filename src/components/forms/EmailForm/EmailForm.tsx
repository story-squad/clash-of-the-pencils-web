import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, LoadIcon } from '../../atoms';
import { authFormInputs } from '../inputs';
import './styles/index.scss';
import { FormProps } from '../formTypes';

type EmailFormProps = FormProps<{ email: string }>;

const EmailForm = ({
  onSubmit,
  onError,
  onSuccess,
}: EmailFormProps): React.ReactElement => {
  const { handleSubmit, clearErrors } = useFormContext();
  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  const [submitForm, isSubmitting] = useAsync({
    run: async (data: any) => {
      await onSubmit(data);
    },
    onError,
    onSuccess,
  });

  return (
    <form className="email-form" onSubmit={handleSubmit(submitForm)}>
      {authFormInputs.email()}
      <Button
        onClick={clearFormError}
        disabled={isSubmitting}
        iconRight={isSubmitting && <LoadIcon />}
      >
        Submit
      </Button>
    </form>
  );
};

export default EmailForm;
