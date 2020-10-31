import React from 'react';

interface SplashProps {
  isLogin: boolean;
}

const Splash = ({ isLogin }: SplashProps): React.ReactElement => {
  return (
    <div className="splash">
      <h1>Story Squad</h1>
      {isLogin ? <LoginSplash /> : <SignupSplash />}
    </div>
  );
};

const LoginSplash = () => {
  return (
    <h2>
      Sign in for the <span className="b">Free Daily Story Contest!</span>
    </h2>
  );
};

const SignupSplash = () => {
  return (
    <>
      <h2>
        Sign up for our <span className="b">Free Daily Story Contest!</span>
      </h2>
      <h3>How It Works</h3>
      <ul>
        <li>
          <span className="b">Every Morning (7 days a week!):</span> Sign in to
          get the new story-writing prompt and start scribbling
        </li>
        <li>
          <span className="b">12:00 PST:</span> The deadline to upload your
          single-page story
        </li>
        <li>
          <span className="b">12:30 PST:</span> Finalists are announced and
          popular voting begins
        </li>
        <li>
          <span className="b">13:00 PST:</span> The winner of the popular vote
          gets crowned!
        </li>
      </ul>
    </>
  );
};

export default Splash;
