import React from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { top3, DnD } from '../../../../state';

import { Header } from '../../../common';
import { nav } from '../../../../config';
import { DropBank } from '../DropBank';
import { DragonBank } from '../DragonBank';
import {
  AiOutlineArrowLeft as Left,
  AiOutlineReload as Reload,
} from 'react-icons/ai';

const RenderCastVotes = (): React.ReactElement => {
  const setHasRead = useSetRecoilState(top3.hasFinishedReadingState);
  const [DnDState, SetDnDState] = useRecoilState(DnD.DnDContainerState);

  const submitVotes = () => null;

  const backToRead = () => {
    setHasRead(false);
  };

  // Resets the vote choices to starting positions
  const resetVotes = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    // Hooks cannot be used inside event handlers so we aren't able
    // to simply reset by using useResetRecoilState hook
    SetDnDState(DnD.initDnDContainerState);
  };

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
        <div className="button-container">
          <button className="small" onClick={backToRead}>
            <Left />
            Go Back
          </button>
          <button className="small" onClick={(e) => resetVotes(e)}>
            <Reload />
            Reset Votes
          </button>
        </div>
        <DragonBank />
        <DropBank />
        <div className="button-container">
          <button
            disabled={
              DnDState['sub-1'].isEmpty ||
              DnDState['sub-2'].isEmpty ||
              DnDState['sub-3'].isEmpty
                ? true
                : false
            }
            onClick={submitVotes}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderCastVotes;
