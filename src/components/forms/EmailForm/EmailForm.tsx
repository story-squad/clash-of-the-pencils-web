import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, LoadIcon } from '../../atoms';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type EmailFormProps = {
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onError: (error: unknown) => void;
  onSuccess: () => void;
};

const EmailForm = (props: EmailFormProps): React.ReactElement => {
  const { onSubmit, onError, onSuccess } = props;
  const { handleSubmit, clearErrors } = useFormContext();
  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  const [submitForm, isSubmitting] = useAsync({
    run: async (data: Record<string, string>) => {
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
