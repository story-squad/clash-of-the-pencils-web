import React, { useEffect, useState } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';
import { prompts, user } from '../../../../state';

import { Prompts } from '../../../../api';

import { InfoHoverTip, Modal } from '../../../common';
import { tooltips } from '../../../../config';
import SubmissionForm from './SubmissionForm';

const PromptBox = (): React.ReactElement => {
  const [showModal, setShowModal] = useState(false);

  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);
  const username = useRecoilValue(user.username);

  useEffect(() => {
    if (!prompt) {
      Prompts.getCurrent()
        .then(({ data }) => {
          setPrompt(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const toggleModal = () => setShowModal((cur) => !cur);

  return (
    <div className="prompt-box">
      <InfoHoverTip tip={tooltips.subInstructions} position="left" />
      <Modal
        component={() => <SubmissionForm closeModal={toggleModal} />}
        visible={showModal}
        setVisible={setShowModal}
        centered
        title="Submit a Story"
      />
      <h2>Hey, {username}!</h2>
      {prompt ? (
        <>
          {prompt.active ? (
            <>
              <h3>Here is today&apos;s prompt:</h3>
              <p>{prompt.prompt}</p>
            </>
          ) : (
            <p>Submissions are currently closed.</p>
          )}
          <div className="prompt-footer">
            {/* <div className="streak">
          <h3>Hot Streak:</h3>
          <span className="flames">
          {[...new Array(props.streak)].map(() => '(f)')}
          </span>
        </div> */}
            <button onClick={toggleModal} disabled={prompt.submitted}>
              {prompt.submitted
                ? 'You have already submitted today'
                : 'Submit Your Story'}
            </button>
          </div>
        </>
      ) : (
        <p>Loading prompt...</p>
      )}
    </div>
  );
};

export default PromptBox;
