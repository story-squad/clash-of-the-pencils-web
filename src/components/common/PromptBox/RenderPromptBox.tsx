import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tooltips } from '../../../config';
import { auth, prompts } from '../../../state';
import { Countdown } from '../Countdown';
import { InfoHoverTip } from '../InfoHoverTip';
import { Modal } from '../Modal';
import { PromptBoxProps } from './PromptBoxTypes';
import SubmissionForm from './SubmissionForm';

const RenderPromptBox = ({
  // hideSubmitButton = false,
  showHeader = false,
}: PromptBoxProps): React.ReactElement => {
  const prompt = useRecoilValue(prompts.currentPrompt);
  const isLogged = useRecoilValue(auth.isLoggedIn);
  const setAuthModalVisible = useSetRecoilState(auth.authModalOpen);

  // Modal State Handlers
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    if (isLogged) setShowModal((cur) => !cur);
    else setAuthModalVisible(true);
  };

  return (
    <div className="prompt-box">
      <InfoHoverTip tip={tooltips.subInstructions} position="left" />
      {isLogged && (
        <Modal.Component
          className="submissions"
          component={(props) => <SubmissionForm {...props} />}
          visible={showModal}
          setVisible={setShowModal}
          centered={!!isLogged}
          title={isLogged ? 'Submit a Story' : ''}
        />
      )}
      {prompt ? (
        // If there is a prompt
        <>
          {showHeader && <h2>Today&apos;s Prompt</h2>}
          <p>{prompt.prompt}</p>
          <p className="countdown-display">
            <Countdown toEvent="submit" /> left to submit!
          </p>
          <div className="prompt-footer">
            {/* {!hideSubmitButton && (
              <button onClick={toggleModal} disabled={prompt.submitted}>
                {prompt.submitted
                  ? 'Submission Received!'
                  : 'Submit Your Story'}
              </button>
            )} */}
            <button onClick={toggleModal}>Submit Your Story</button>
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
