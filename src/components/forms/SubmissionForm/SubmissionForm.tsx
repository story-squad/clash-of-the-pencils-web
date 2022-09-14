import { classnames, useAsync } from '@story-squad/react-utils';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Auth, Prompts, Submissions } from '../../../api';
import { app } from '../../../state';
import { stopPropagation, upload } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
import { DragonLoader } from '../../molecules';
import { FormProps } from '../formTypes';
import './styles/index.scss';

export type SubmissionFormProps = FormProps & {
  enableLogs?: boolean;
  onCancel?: () => void;
  currentPrompt: Prompts.IPrompt;
};

export default function SubmissionForm({
  onSubmit,
  onSuccess,
  onError,
  enableLogs = false,
  onCancel,
  currentPrompt,
}: SubmissionFormProps): React.ReactElement {
  // Store the selected file in state
  const [file, setFile] = useRecoilState(app.submissionModal.file);
  // Store a URL location for the selected file in order to display a preview
  const [preview, setPreview] = useRecoilState(app.submissionModal.preview);

  // Need to be able to set today's sub in recoil state on success
  const setUserSubForToday = useSetRecoilState(app.userSubForToday);

  // Form Error Handlers
  const [error, setError] = useState<string>();
  const clearError = () => setError(undefined);

  const errorHandler = useCallback(
    (err: unknown) => {
      // If there's an onError function, call it with our error object
      onError?.(err);

      if (Auth.isAxiosError(err)) {
        // Custom error handling case for DS API error
        if (err.response?.data?.error === 'Transcription error') {
          setError('Your submission must be a story!');
        } else {
          setError(
            err.response?.data?.error ??
              err.response?.data?.message ??
              err.message,
          );
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during upload');
      }
    },
    [onError],
  );

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!file) {
      setError('No image selected');
    } else {
      try {
        // Create the request body form data
        const reqBody = new FormData();
        reqBody.append('story', file);
        reqBody.append('promptId', `${currentPrompt.id}`);

        // Send it to the server
        // Coercing type because we know what response is, AND undefined is valid value
        const sub = (await onSubmit(reqBody)) as Submissions.ISubItem;
        // On success, store it in state!
        setUserSubForToday(sub);
        onSuccess?.();
      } catch (err) {
        errorHandler(err);
      }
    }
  };

  const [exec, loading] = useAsync({
    run: submitHandler,
    onError: errorHandler,
  });

  const [convertHEICImage, loadingHEIC] = useAsync({
    run: upload.heicToPng,
    onSuccess: async (pngImage) => {
      setFile(pngImage);
      setPreview(await upload.generatePreview(pngImage));
    },
  });

  // This extracts the file from the Input element's event object
  const fileSelection = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Get the selected file from the event object
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log('[FILE]', selectedFile);
      clearError();
      if (upload.isHeic(selectedFile)) {
        convertHEICImage(selectedFile);
      } else if (upload.isValidImage(selectedFile)) {
        // If a file was selected, check that it's a valid image
        // If its valid, update the file and preview in state
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        // Invalid image!
        setError('Upload must be an image!');
      }
    }
  };

  // Log the file if specified to do so in props
  useEffect(() => {
    enableLogs && console.log('[FILE]', file);
  }, [file]);

  return (
    <form className="submission-form" onSubmit={exec}>
      <h2>File Upload</h2>
      <p>
        {preview
          ? 'Click your story to pick a different image'
          : 'Select a file to upload your story'}
      </p>
      <label className={classnames('file-input')}>
        {loadingHEIC ? (
          <div className="placeholder loading-heic" onClick={stopPropagation}>
            <DragonLoader message="Converting" />
          </div>
        ) : preview ? (
          <img
            className="preview"
            src={preview}
            alt="Upload preview"
            onClick={stopPropagation}
          />
        ) : (
          <div className="placeholder" onClick={stopPropagation}>
            <FiUploadCloud onClick={stopPropagation} />
            <span className="icon-text" onClick={stopPropagation}>
              Click to Upload
            </span>
          </div>
        )}
        <input type="file" onChange={fileSelection} hidden />
      </label>
      {error && (
        <div className="server-error">
          <span className="red">*</span>
          {error}
        </div>
      )}
      <div className="button-row">
        {onCancel && (
          <Button
            disabled={loading || loadingHEIC}
            onClick={onCancel}
            htmlType="button"
            type="secondary"
          >
            Cancel
          </Button>
        )}
        <Button
          disabled={loading || loadingHEIC}
          onClick={clearError}
          iconRight={loading && <LoadIcon />}
        >
          Submit Story
        </Button>
      </div>
    </form>
  );
}
