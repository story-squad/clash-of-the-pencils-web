import React, { useState } from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { top3, user } from '../../../../state';

import { Header, Modal } from '../../../common';
import { nav } from '../../../../config';
import { DropBank } from '../DropBank';
import { DragonBank } from '../DragonBank';
import { AiOutlineArrowLeft as Left } from 'react-icons/ai';
import EmailCollectionForm from './EmailCollectionForm';

const RenderCastVotes = (): React.ReactElement => {
  const setHasRead = useSetRecoilState(top3.hasFinishedReadingState);

  // grab the user id from recoil to ensure we are logged in
  const userId = useRecoilValue(user.userId);

  //check if a user has voted
  const [voted, setVoted] = useState(false);

  const submitVotes = () => {
    // updated the voted state to True
    setVoted(true);
    return null;
  };

  const backToRead = () => {
    setHasRead(false);
  };

  return (
    <div>
      <Header menuItems={userId ? nav.siteNavItems : nav.landingNavItems} />
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
        </div>
        <DragonBank />
        <DropBank />
        <div className="button-container">
          <button disabled={false} onClick={submitVotes}>
            Vote
          </button>
        </div>
      </div>
      {!userId && (
        <Modal
          component={EmailCollectionForm}
          visible={voted}
          setVisible={() => {
            setVoted(false);
          }}
        />
      )}
    </div>
  );
};

export default RenderCastVotes;
