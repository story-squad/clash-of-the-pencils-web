import React from 'react';
import { Link } from 'react-router-dom';
import { time } from '../../../../utils';

const Schedule = (): React.ReactElement => {
  return (
    <div className="schedule">
      <h2>&#129300; How it Works &#129300;</h2>
      <p className="disclaimer">
        * All times are displayed in your local timezone <em>&#9200;</em>
      </p>
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

      <Link to="/game">Get Started</Link>
    </div>
  );
};

export default Schedule;
