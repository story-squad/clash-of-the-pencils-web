import React from 'react';
import { useRecoilValue } from 'recoil';
import { user } from '../../../../../state';
import { time } from '../../../../../utils';
import { Countdown } from '../../../../common';

const SubmissionsClosed = (): React.ReactElement => {
  const username = useRecoilValue(user.username);

  return (
    <div className="prompt-box inactive">
      <h2>Hey, {username}</h2>
      <h3>Submissions are closed!</h3>
      <p>
        Sorry you missed it :(
        <br />
        Submissions open back up at{' '}
        <span className="alt">
          {time.schedule.submit.start.format('h:mm A')}
        </span>
      </p>
      <p>
        Check back in <Countdown toEvent="submit" /> for a new prompt!
      </p>
    </div>
  );
};

export default SubmissionsClosed;
