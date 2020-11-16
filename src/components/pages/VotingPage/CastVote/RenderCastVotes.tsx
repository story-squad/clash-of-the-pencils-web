import React from 'react';

import { Header } from '../../../common';
import { nav } from '../../../../config';
import { DragBank } from '../DragBank';
import { DropContainers } from '../DropBank';

const RenderCastVotes = (): React.ReactElement => {
  const submitVotes = () => null;

  return (
    <div>
      <Header menuItems={nav.siteNavItems} />
      <div className="voting-page">
        <div className="top-text">
          <h2>Welcome to Dragon Drop!</h2>
          <p>We make voting simple and fun!</p>
          <p className="instructions">
            <span className="alt">Think</span> about the stories you just read,{' '}
            <span className="alt">then vote</span>! Drag your favorite story
            into <span className="alt-2">1st</span> place, then{' '}
            <span className="alt-2">2nd</span>, then{' '}
            <span className="alt-2">3rd</span>!{' '}
            <span className="alt">After</span> you vote, click the Vote button
            on the bottom to <span className="alt">submit</span>!
          </p>
        </div>
        <DragBank />
        <DropContainers />
        <div className="button-container">
          <button disabled={true} onClick={submitVotes}>
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderCastVotes;
