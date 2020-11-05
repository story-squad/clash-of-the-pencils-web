import React from 'react';
import { time } from '../../../../utils';

const Info = (): React.ReactElement => {
  return (
    <div className="info-page">
      <h1>How It Works</h1>
      {timeList.map((li, i) => (
        <p key={i}>
          {li.title}: {li.text}
        </p>
      ))}
    </div>
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
export default Info;
