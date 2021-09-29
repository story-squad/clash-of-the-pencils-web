import React, { Suspense, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { app, auth, prompts } from '../../../state';
import { SubmissionModal } from '../../modals';
import { Loader } from '../../molecules';
import LoginToVoteModal from './LoginToVoteModal';
import PromptOrganism from './PromptOrganism';

function PromptOrganismContainer(): React.ReactElement {
  // Handle submission form modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Async retrieve current prompt
  const prompt = useRecoilValue(prompts.currentPrompt);
  // If the user isn't logged in they can't submit!
  const userIsLoggedIn = useRecoilValue(auth.isLoggedIn);

  const userSubmission = useRecoilValue(app.userSubForToday);
  const openAnImage = useSetRecoilState(app.imageView.openImage);

  // This will open either the modal or the FullscreenImage component based on sub status
  const openHandler = () => {
    // If the user has submitted, it should open fullscreen image! NOT Submission form
    if (userSubmission) {
      openAnImage({
        description: userSubmission.prompt,
        source: userSubmission.src,
        rotation: userSubmission.rotation,
      });
    } else {
      // Here, we open the submission form since user hasn't submitted!
      setModalIsOpen(true);
    }
  };

  // Code to open the login page when not logged in
  const { push } = useHistory();
  const openLogin = () => push('/login');

  return (
    <>
      {userIsLoggedIn ? (
        // If they're logged in, they can submit!
        <SubmissionModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          prompt={prompt}
        />
      ) : (
        // Otherwise, they need to log in!
        <LoginToVoteModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          openLoginPage={openLogin}
        />
      )}
      <PromptOrganism
        prompt={prompt}
        openUploadModalOrSubmission={openHandler}
        userHasSubmitted={!!userSubmission}
      />
    </>
  );
}

export default function PromptOrganismContainerFallback(): React.ReactElement {
  return (
    <Suspense fallback={<Loader />}>
      <PromptOrganismContainer />
    </Suspense>
  );
}
