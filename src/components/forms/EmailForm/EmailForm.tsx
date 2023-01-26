import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import useAsync from '../../../hooks/useAsync';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type EmailFormProps = FormProps<{ email: string }>;

export default function EmailForm({
  onSubmit,
  onError,
  onSuccess,
}: EmailFormProps): React.ReactElement {
  const { handleSubmit, clearErrors } = useFormContext();
  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  const [submitForm, isSubmitting] = useAsync({
    asyncFunction: async (data: { email: string }) => {
      await onSubmit(data);
    },
    onError,
    onSuccess,
  });

  return (
    <>
      <form
        className="email-form"
        onSubmit={handleSubmit((data) => {
          const userData = { email: data.email };

          submitForm(userData);
        })}
      >
        {authFormInputs.email()}
        <Button
          onClick={clearFormError}
          disabled={isSubmitting}
          iconRight={isSubmitting && <LoadIcon />}
        >
          Submit
        </Button>
      </form>
    </>
  );
}
