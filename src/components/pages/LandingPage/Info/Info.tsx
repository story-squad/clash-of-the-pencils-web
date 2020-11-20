import React from 'react';
import { Link } from 'react-router-dom';
import { time } from '../../../../utils';

import howItWorks from '../../../../assets/how-it-works.png';
import creativity from '../../../../assets/unleash-creativity-image.png';

const Info = (): React.ReactElement => {
  return (
    <div className="info-page">
      <div className="landing-splash flex-center">
        <img
          src={creativity}
          alt="Unleash your creativity with Story Squad's free daily story contest!"
        />
      </div>
      <div className="info-wrapper">
        <img src={howItWorks} alt="How it Works" />
        <p>
          Story Squad&apos;s Free Daily Story Contest runs 7 days a week.{' '}
          <Link to="/login">Log in</Link> to receive today&apos;s story-writing
          prompt and get scribbling!
        </p>
        {timeList.map((li, i) => (
          <p key={i}>
            <span className="title">{li.title}</span>: {li.text}
          </p>
        ))}
        <p>Sign up today, and unleash your creativity!</p>
        <Link to="/signup">Create Account</Link>
      </div>
    </div>
  );
};

const format = 'h:mm A';

const timeList = [
  {
    title: time.utcToLocal(20, 0).format(format),
    text: 'Daily Story Submission Deadline',
  },
  {
    title: time.utcToLocal(20, 30).format(format),
    text: 'Top 3 Stories Announced.',
  },
  {
    title:
      time.utcToLocal(20, 30).format(format) +
      ' - ' +
      time.utcToLocal(23, 0).format(format),
    text:
      "Voting (secret advantage: you can unlock 's story prompt after voting)",
  },
  {
    title: time.utcToLocal(23, 0).format(format),
    text:
      "Winner of the popular vote gets crowned & tomorrow's story prompt announced!",
  },
];
export default Info;
