import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Prompts } from '../../../../api';
import { prompts, user } from '../../../../state';
import { InfoHoverTip, Modal } from '../../../common';
import SubmissionForm from './SubmissionForm';

const submissionInstructions =
  "First, read the prompt. Then, write a one-page story by hand. \
  When you're done, take a picture and upload it to our site. \
  Happy writing!";

const PromptBox = (): React.ReactElement => {
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);
  const username = useRecoilValue(user.username);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!prompt) {
      Prompts.getCurrent()
        .then(({ data }) => {
          setPrompt(data.prompt);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const toggleModal = () => setShowModal((cur) => !cur);

  return (
    <div className="prompt-box">
      <InfoHoverTip tip={submissionInstructions} position="left" />
      <Modal
        component={() => <SubmissionForm closeModal={toggleModal} />}
        visible={showModal}
        setVisible={setShowModal}
        centered
      />
      <h2>Hey, {username}!</h2>
      {prompt ? (
        <>
          <h3>Here is today&apos;s prompt:</h3>
          <p>{prompt.prompt}</p>
        </>
      ) : (
        <p>Loading prompt...</p>
      )}
      <div className="prompt-footer">
        {/* <div className="streak">
          <h3>Hot Streak:</h3>
          <span className="flames">
            {[...new Array(props.streak)].map(() => '(f)')}
          </span>
        </div> */}
        <button onClick={toggleModal}>Submit Your Story</button>
      </div>
    </div>
  );
};

export default PromptBox;
