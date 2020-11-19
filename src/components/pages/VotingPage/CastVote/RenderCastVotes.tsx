import React from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
  const voteSubmission = useRecoilValue(DnD.voteSubmissionState);

  const submitVotes = () => {
    // API call goes in here
    console.log(voteSubmission);
    alert('We got your vote!');
  };

  const backToRead = () => {
    setHasRead(false);
  };

  /**
   * Resets the vote choices to starting positions
   */
  const resetVotes = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
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
          <h2>Welcome to</h2>
          <h1>Dragon Drop!</h1>
          <p className="instructions">
            <span className="alt vote">Vote</span> by dragging the Drag-N-Drop
            Dragons onto your favorite story below.{' '}
            <span className="alt">Then</span> click the vote button!
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
            // disable the vote button if any of the submission containers don't have a vote
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
