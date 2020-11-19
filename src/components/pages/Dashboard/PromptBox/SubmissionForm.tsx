import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { prompts } from '../../../../state';

import { Submissions } from '../../../../api';
import { upload } from '../../../../utils';

import { BarLoader } from 'react-spinners';

const SubmissionForm = (props: SubmissionFormProps): React.ReactElement => {
  const [file, setFile] = useState<null | File>(null);
  const [preview, setPreview] = useState<null | string>(null);
  const promptId = useRecoilValue(prompts.promptId);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('No image selected!');
    } else if (!upload.isValidImage(file)) {
      setError('Upload must be an image!');
    } else if (!promptId) {
      // Couldn't load prompt info, please reset
      setError('Error occurred. Try again later.');
    } else {
      setLoading(true);
      try {
        // ALL GOOD TO UPLOAD!
        console.log('BRO');
        const base64Image = await upload.toBase64(file);
        if (!base64Image) {
          // Error!
          return;
        }
        const reqBody = new FormData();
        reqBody.append('image', file);
        reqBody.append('promptId', promptId.toString());
        reqBody.append('base64Image', base64Image.toString());

        await Submissions.uploadSubmission(reqBody);
        setComplete(true);
      } catch (err) {
        setError('Error occurred. Try again later.');
      }
      setLoading(false);
    }
  };

  const fileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0]) {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  return (
    <div className="submission-form">
      <h2>Submit a Story</h2>
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
        {!complete ? (
          // If the submission hasn't been processed successfully
          <>
            <label className={file ? 'selected' : ''}>
              {file ? 'Change Picture' : 'Select a Picture'}
              <input type="file" onChange={fileSelection} hidden />
            </label>
            <button type="submit">Submit</button>
          </>
        ) : (
          // Once the submission is done, show a button.
          <>
            <p>Submission successful!</p>
            <button onClick={props.closeModal}>Back to Dashboard</button>
          </>
        )}
      </form>
    </div>
  );
};

interface SubmissionFormProps {
  closeModal: () => void;
}

export default SubmissionForm;
