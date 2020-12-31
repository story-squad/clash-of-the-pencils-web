import React, { useState } from 'react';
import {
  AiOutlineArrowLeft as Left,
  AiOutlineReload as Reload,
} from 'react-icons/ai';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { Voting } from '../../../../../api';
import dragonDropText from '../../../../../assets/img/PNGs/dragon-drop.png';
import { auth, dnd, top3 } from '../../../../../state';
import { Header, Modal } from '../../../../common';
import { DragonBank } from '../DragonBank';
import { DropBank } from '../DropBank';
import EmailCollectionForm from './EmailCollectionForm';
import SecretBonus from './SecretBonus';

const RenderCastVotes = (): React.ReactElement => {
  const setHasRead = useSetRecoilState(top3.hasFinishedReadingState);
  const resetDnd = useResetRecoilState(dnd.dndContainerState);
  const voteSubmission = useRecoilValue(dnd.voteSubmissionState);
  // grab the user id from recoil to ensure we are logged in
  const userId = useRecoilValue(auth.userId);
  const [error, setError] = useState<null | string>(null);

  //check if a user has voted
  const [voted, setVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [secretMessage, setSecretMessage] = useState<null | string>(null);

  const submitVotes = () => {
    setError(null);
    Voting.submit(voteSubmission)
      .then((res) => {
        // SUBMISSION SUCCESSFUL!
        setVoted(true);
        setSecretMessage(res.data.tomorrow);
        setShowModal(true);
      })
      .catch((err) => {
        console.log({ err });
        setError('Could not submit vote. Please try again later.');
      });
  };

  const backToRead = () => {
    setError(null);
    setHasRead(false);
  };

  /**
   * Resets the vote choices to starting positions
   */
  const resetVotes = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    setError(null);
    resetDnd();
  };

  return (
    <div>
      <Header />
      <div className="voting-page">
        <div className="top-text">
          <h2>Welcome to</h2>
          <img src={dragonDropText} alt="Dragon Drop" />
          <p className="instructions">
            <span className="alt">Vote</span> by dragging the Drag-N-Drop
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
        {error && <div className="error">{error}</div>}
        <div className="button-container">
          <button
            // disable the vote button if any of the submission containers don't have a vote
            disabled={voted}
            onClick={submitVotes}
          >
            Vote
          </button>
        </div>
      </div>
      {showModal && (
        <Modal.Component
          className={userId ? 'bonus' : 'email'}
          component={
            userId
              ? (props) => (
                  <SecretBonus
                    {...props}
                    secretMessage={secretMessage as string}
                  />
                )
              : EmailCollectionForm
          }
          visible={showModal}
          setVisible={() => {
            setShowModal(false);
          }}
          centered={true}
        />
      )}
    </div>
  );
};

export default RenderCastVotes;
