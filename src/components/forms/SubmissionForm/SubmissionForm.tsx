import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { upload } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';

// TODO specify the proper data interface here
export type SubmissionFormProps = FormProps & { enableLogs?: boolean };

export default function SubmissionForm({
  onSubmit,
  onError,
  enableLogs = false,
}: SubmissionFormProps): React.ReactElement {
  // Standard Form Handlers
  const { clearErrors, setError, handleSubmit, register } = useFormContext();
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

  const { onChange: registeredChangeHandler, ...inputParams } = register(
    'story',
    { required: { message: 'You must select an image!', value: true } },
  );

  // This extracts the file from the Input element's event object
  const fileSelection = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
          registeredChangeHandler(e);
        }
      }
    }
  };

  // Log the file if specified to do so in props
  useEffect(() => {
    enableLogs && console.log('[FILE]', file);
  }, [file]);

  return (
    <form className="submission-form" onSubmit={exec}>
      {preview ? (
        <div className="preview">
          <img src={preview} alt="Upload preview" />
        </div>
      ) : (
        'NO IMAGE YET?'
      )}
      <label className={file ? 'selected' : ''}>
        {/* IMAGE SHOULD REPLACE THE FOLLOWING LINE! */}
        {file ? 'Change Picture' : 'Select a Picture'}
        <input type="file" onChange={fileSelection} hidden {...inputParams} />
      </label>
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
