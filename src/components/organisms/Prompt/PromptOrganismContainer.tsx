import React, { Suspense, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useConfirmationModal } from '../../../hooks';
import { app, auth, prompts } from '../../../state';
import { SubmissionModal } from '../../modals';
import { Loader } from '../../molecules';
import LoginToSubmitModal from './LoginToSubmitModal';
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

  const [successModal, openSuccessModal] = useConfirmationModal({
    hideCancelButton: true,
    title: 'Your submission has been received!',
    message: (
      <>
        Come back at 5:30 PM to vote.
        <br />
        The power to determine today’s winner is in your hands!
      </>
    ),
    confirmText: 'Back to Dashboard',
  });

  return (
    <>
      {userIsLoggedIn ? (
        // If they're logged in, they can submit!
        <SubmissionModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          prompt={prompt}
          onSuccess={openSuccessModal}
        />
      ) : (
        // Otherwise, they need to log in!
        <LoginToSubmitModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          openLoginPage={openLogin}
        />
      )}
      {successModal}
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
