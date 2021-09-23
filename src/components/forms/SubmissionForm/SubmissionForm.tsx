import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { upload } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';

// TODO specify the proper data interface here
export type SubmissionFormProps = FormProps;

export default function SubmissionForm({
  onSubmit,
  onError,
}: SubmissionFormProps): React.ReactElement {
  // Standard Form Handlers
  const { clearErrors, setError, handleSubmit } = useFormContext();
  const clearFormError = () => clearErrors('form');
  const errorHandler = useCallback(
    onError ??
      ((error: unknown) => {
        if (error) {
          let message: string;
          if (Auth.isAxiosError(error) && error.response?.data?.message) {
            message = error.response.data.message;
          } else {
            message = 'An unknown error occurred. Please try again.';
          }
          setError('form', { type: 'manual', message });
        } else {
          clearErrors('form');
        }
      }),
    [onError],
  );
  const [exec, loading] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
    errorHandler,
  });

  // Submission-Specific Form Handlers
  // Store the selected file in state
  const [file, setFile] = useState<File>();
  // Store a URL location for the selected file in order to display a preview
  const [preview, setPreview] = useState<string>();

  // This extracts the file from the Input element's event object
  const fileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const selection = fileList[0];
      if (selection) {
        if (!upload.isValidImage(selection)) {
          setError('form', {
            message: 'Upload must be an image!',
            type: 'manual',
          });
        } else {
          clearFormError();
          setFile(selection);
          setPreview(URL.createObjectURL(selection));
        }
      }
    }
  };

  return (
    <form className="submission-form" onSubmit={exec}>
      <Button
        disabled={loading}
        onClick={clearFormError}
        iconRight={loading && <LoadIcon />}
      >
        Submit Story
      </Button>
    </form>
  );
}
