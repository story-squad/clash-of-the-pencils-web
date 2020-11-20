import React, { useState } from 'react';

import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { top3, user, DnD } from '../../../../state';

import { Header, Modal } from '../../../common';
import { nav } from '../../../../config';
import EmailCollectionForm from './EmailCollectionForm';

import { DropBank } from '../DropBank';
import { DragonBank } from '../DragonBank';
import {
  AiOutlineArrowLeft as Left,
  AiOutlineReload as Reload,
} from 'react-icons/ai';

const RenderCastVotes = (): React.ReactElement => {
  const setHasRead = useSetRecoilState(top3.hasFinishedReadingState);
  const resetDnD = useResetRecoilState(DnD.DnDContainerState);
  const voteSubmission = useRecoilValue(DnD.voteSubmissionState);
  const disableButton = useRecoilValue(DnD.disableVoteButton);
  // grab the user id from recoil to ensure we are logged in
  const userId = useRecoilValue(user.userId);
  const top3list = useRecoilValue(top3.top3List);

  //check if a user has voted
  const [voted, setVoted] = useState(false);

  const submitVotes = () => {
    // API call goes in here
    // updated the voted state to True
    setVoted(true);
    console.log(
      voteSubmission,
      top3list?.map((x) => x.id),
    );
    alert('We got your vote!');
    return null;
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
    resetDnD();
  };

  return (
    <div>
      <Header menuItems={userId ? nav.siteNavItems : nav.landingNavItems} />
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
          <button className="small" onClick={resetVotes}>
            <Reload />
            Reset Votes
          </button>
        </div>
        <DragonBank />
        <DropBank />
        <div className="button-container">
          <button
            // disable the vote button if any of the submission containers don't have a vote
            disabled={disableButton}
            onClick={submitVotes}
          >
            Vote
          </button>
        </div>
      </div>
      {!userId && (
        <Modal
          className="email"
          component={EmailCollectionForm}
          visible={voted}
          setVisible={() => {
            setVoted(false);
          }}
          centered={true}
        />
      )}
    </div>
  );
};

export default RenderCastVotes;
