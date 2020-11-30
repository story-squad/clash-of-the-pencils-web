import React from 'react';
import { Link } from 'react-router-dom';
import howItWorks from '../../../../assets/img/how-it-works.png';
import creativity from '../../../../assets/img/unleash-creativity-image.png';
import { time } from '../../../../utils';

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
    title: time.schedule.submit.end.format(format),
    text: 'Daily Story Submission Deadline',
  },
  {
    title: time.schedule.vote.start.format(format),
    text: 'Top 3 Stories Announced.',
  },
  {
    title:
      time.schedule.vote.start.format(format) +
      ' - ' +
      time.schedule.vote.end.format(format),
    text: 'Read 3 short stories and vote for your favorite',
  },
  {
    title: time.schedule.stream.start.format(format),
    text:
      "Winner of the popular vote gets crowned & tomorrow's story prompt announced!",
  },
];
export default Info;
