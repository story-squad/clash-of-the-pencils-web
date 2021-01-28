import React from 'react';
import { BarLoader } from 'react-spinners';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { InfoHoverTip, Modal } from '..';
import { Submissions } from '../../../api';
import { tooltips } from '../../../config';
import { auth, prompts, submitModal } from '../../../state';
import { upload } from '../../../utils';

const SubmissionForm = (
  props: Modal.ModalComponentProps,
): React.ReactElement => {
  const [file, setFile] = useRecoilState(submitModal.selected);
  const [preview, setPreview] = useRecoilState(submitModal.preview);
  const [error, setError] = useRecoilState(submitModal.error);
  const [loading, setLoading] = useRecoilState(submitModal.loading);
  const [complete, setComplete] = useRecoilState(submitModal.success);
  const username = useRecoilValue(auth.username);

  const markAsSubmitted = useSetRecoilState(prompts.hasSubmitted);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('No image selected!');
    } else {
      setLoading(true);
      try {
        // ALL GOOD TO UPLOAD!
        const base64Image = await upload.toBase64(file);
        if (!base64Image) {
          setError('Error occurred. Try again later.');
          // Error!
          return;
        }
        const reqBody = new FormData();
        reqBody.append('image', file);
        reqBody.append('base64Image', base64Image.toString());

        await Submissions.uploadSubmission(reqBody);
        setComplete(true);
        markAsSubmitted(true);
      } catch (err) {
        if (err?.response?.data?.error) {
          if (err.response.data.error === 'Transcription error')
            setError('Picture must be of written text');
          else setError(err.response.data.error);
        } else {
          setError('An error occurred. Try again later');
        }
      }
      setLoading(false);
    }
  };

  const fileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const selection = fileList[0];
      if (selection) {
        if (!upload.isValidImage(selection)) {
          setError('Upload must be an image!');
        } else {
          setError(null);
          setFile(selection);
          setPreview(URL.createObjectURL(selection));
        }
      }
    }
  };

  return (
    <>
      <InfoHoverTip tip={tooltips.filetypes} position="right" />
      <div className="submission-form">
        {username && <h2>Hey, {username}!</h2>}
        <form onSubmit={onSubmit}>
          {preview && (
            <div className="preview">
              <img src={preview} alt="Upload preview" />
              <div className={`loader${loading ? ' visible' : ''}`}>
                <BarLoader />
              </div>
            </div>
          )}
          {error && <div className="error">{error}</div>}
          {!complete && (
            // If the submission hasn't been processed successfully
            <>
              <label className={file ? 'selected' : ''}>
                {file ? 'Change Picture' : 'Select a Picture'}
                <input type="file" onChange={fileSelection} hidden />
              </label>
              <button type="submit">Submit</button>
            </>
          )}
        </form>
        {complete && (
          // Once the submission is done, show a button.
          <>
            <div className="success">Submission successful!</div>
            <button onClick={props.closeModal}>Back to Site</button>
          </>
        )}
      </div>
    </>
  );
};

export default SubmissionForm;
