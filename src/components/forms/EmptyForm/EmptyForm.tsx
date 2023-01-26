import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import useAsync from '../../../hooks/useAsync';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import './styles/index.scss';

export type EmptyFormProps = FormProps<void>;

export default function EmptyForm({
  onSubmit,
  onError,
  onSuccess,
}: EmptyFormProps): React.ReactElement {
  const { handleSubmit, clearErrors } = useFormContext();
  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  const [submitForm, isSubmitting] = useAsync({
    asyncFunction: async () => {
      await onSubmit();
    },
    onError,
    onSuccess,
  });

  return (
    <>
      <form className="empty-form" onSubmit={handleSubmit(submitForm)}>
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
