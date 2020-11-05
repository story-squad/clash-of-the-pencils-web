import React from 'react';
import { time } from '../../../../utils';

const SignupSplash = (): React.ReactElement => {
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

const format = 'h:mm A';

const timeList = [
  {
    title: 'Every Morning (7 days a week!)',
    text: 'Sign in to get the new story-writing prompt and start scribbling',
  },
  {
    title: time.utcToLocal(20, 0).format(format),
    text: 'The deadline to upload your single-page story',
  },
  {
    title: time.utcToLocal(20, 30).format(format),
    text: 'Finalists are announced and popular voting begins',
  },
  {
    title: time.utcToLocal(23, 0).format(format),
    text: 'The winner of the popular vote gets crowned!',
  },
];

export default SignupSplash;
