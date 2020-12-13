import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { tooltips } from '../../../../../config';
import { prompts, user } from '../../../../../state';
import { Countdown, InfoHoverTip, Modal } from '../../../../common';
import SubmissionForm from './SubmissionForm';

const RenderPromptBox = (): React.ReactElement => {
  const username = useRecoilValue(user.username);
  const prompt = useRecoilValue(prompts.currentPrompt);

  // Modal State Handlers
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((cur) => !cur);

  return (
    <div className="prompt-box">
      <InfoHoverTip tip={tooltips.subInstructions} position="left" />
      <Modal.Component
        component={(props) => <SubmissionForm {...props} />}
        visible={showModal}
        setVisible={setShowModal}
        centered
        title="Submit a Story"
      />
      {username && <h2>Hey, {username}!</h2>}
      {prompt ? (
        // If there is a prompt
        <>
          {prompt.active ? (
            // If the existing prompt is active
            <>
              <h3>Here is today&apos;s prompt:</h3>
              <p>{prompt.prompt}</p>
            </>
          ) : (
            // If the prompt is NOT active!
            <p>Submissions are currently closed.</p>
          )}
          <p className="countdown-display">
            <Countdown toEvent="submit" /> left to submit!
          </p>
          <div className="prompt-footer">
            <button onClick={toggleModal} disabled={prompt.submitted}>
              {prompt.submitted ? 'Submission Received!' : 'Submit Your Story'}
            </button>
          </div>
        </>
      ) : (
        // If the prompt has not been loaded yet
        <p>Loading prompt...</p>
      )}
    </div>
  );
};
export default RenderPromptBox;
