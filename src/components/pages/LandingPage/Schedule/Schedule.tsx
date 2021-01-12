import React from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../../state';
import { time } from '../../../../utils';

const Schedule = (): React.ReactElement => {
  const openAuthModal = useSetRecoilState(auth.authModalOpen);
  const setAuthModalIsLogin = useSetRecoilState(auth.authModalIsLogin);

  const openSignup = () => {
    openAuthModal(true);
    setAuthModalIsLogin(false);
  };

  return (
    <div className="schedule">
      <h2>How it Works</h2>
      <p>
        <strong>Every morning (7 days a week):</strong> sign in to get the new
        story-writing prompt and start scribbling
      </p>
      <p>
        <strong>{time.schedule.submit.end.format('h.mm A')}:</strong> The
        deadline to upload your single page story
      </p>
      <p>
        <strong>{time.schedule.vote.start.format('h.mm A')}:</strong> Finalists
        are announced & popular voting begins
      </p>
      <p>
        <strong>{time.schedule.vote.end.format('h.mm A')}:</strong> Winner of
        the popular vote gets crowned
      </p>
      <p>
        <em>Unleash your creativity and sign up today!</em>
      </p>
      <button onClick={openSignup}>Sign Up</button>
    </div>
  );
};

export default Schedule;
