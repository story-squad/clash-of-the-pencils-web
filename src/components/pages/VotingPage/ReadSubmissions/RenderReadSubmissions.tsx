import React from 'react';
import { Submissions } from '../../../../api';
import { nav } from '../../../../config';
import { Header } from '../../../common';
import SubmissionList from './SubmissionList';

const RenderReadSubmissions = (
  props: RenderReadSubmissionsProps,
): React.ReactElement => {
  return (
    <div>
      <Header menuItems={nav.siteNavItems} />
      <div className="read-submissions">
        <div className="top-text">
          <h2>Welcome to the Voting Station!</h2>
          <p>Voting is simple!</p>
          <p className="instructions">
            <span className="alt">First</span>, click on each of the stories to
            read them.
          </p>
          <p className="instructions">
            <span className="alt">Then</span>, click the orange button to begin
            voting.
          </p>
        </div>
        <SubmissionList
          list={props.list}
          incrementCount={props.incrementCount}
        />
        <div className="button-container">
          <button disabled={props.readCount < 3} onClick={props.markAsRead}>
            Start Voting
          </button>
        </div>
      </div>
    </div>
  );
};

interface RenderReadSubmissionsProps {
  list: Submissions.SubItem[];
  readCount: number;
  incrementCount: (index: number) => void;
  markAsRead: () => void;
}

export default RenderReadSubmissions;
