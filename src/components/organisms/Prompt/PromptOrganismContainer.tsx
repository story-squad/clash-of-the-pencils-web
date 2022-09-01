import React, { Suspense, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useConfirmationModal } from '../../../hooks';
import { app, prompts } from '../../../state';
import { time } from '../../../utils';
import { SubmissionModal } from '../../modals';
import { DragonLoader } from '../../molecules';
import LoginToSubmitModal from './LoginToSubmitModal';
import PromptOrganism from './PromptOrganism';
import './styles/promptOrganismLoader.scss';
import { useAuth0 } from '@auth0/auth0-react';

function PromptOrganismContainer(): React.ReactElement {
  // Handle submission form modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Async retrieve current prompt
  const prompt = useRecoilValue(prompts.currentPrompt);
  // If the user isn't logged in they can't submit!
  // const userIsLoggedIn = useRecoilValue(auth.isLoggedIn);
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Auth status comes from the Auth0 provider

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

  const votingTime = useMemo(
    () => time.schedule.vote.start.toLocal().toFormat('h:mm a'),
    [time.schedule.vote.start],
  );

  const [successModal, openSuccessModal] = useConfirmationModal({
    hideCancelButton: true,
    title: 'Your submission has been received!',
    message: (
      <>
        Come back at {votingTime} to vote.
        <br />
        The power to determine today’s winner is in your hands!
      </>
    ),
    confirmText: 'Back to Dashboard',
  });
  return (
    <>
      {isAuthenticated ? (
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
          openLoginPage={loginWithRedirect}
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
    <Suspense fallback={<DragonLoader className="prompt-organism-loader" />}>
      <PromptOrganismContainer />
    </Suspense>
  );
}
