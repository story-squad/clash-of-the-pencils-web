import React from 'react';
import { formatUTCToLocalTimestring } from '../../../utils';

interface SplashProps {
  isLogin: boolean;
}

const timeList = [
  {
    title: 'Every Morning (7 days a week!)',
    text: 'Sign in to get the new story-writing prompt and start scribbling',
  },
  {
    title: formatUTCToLocalTimestring('19:00'),
    text: 'The deadline to upload your single-page story',
  },
  {
    title: formatUTCToLocalTimestring('19:30'),
    text: 'Finalists are announced and popular voting begins',
  },
  {
    title: formatUTCToLocalTimestring('22:00'),
    text: 'The winner of the popular vote gets crowned!',
  },
];

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
        {timeList.map((li, i) => (
          <li key={i}>
            <span className="b">{li.title}:</span> {li.text}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Splash;
