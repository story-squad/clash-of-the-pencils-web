import React from 'react';
import { SEO } from '../../common';
import { Home } from './Home';
import { Steps } from './Steps';
import { VotingInfo } from './VotingInfo';

const LandingPageContainer = (): React.ReactElement => {
  return (
    <div className="landing-page-container">
      <SEO title="Home" />
      {/* <div>
        <SubCard
          id={1}
          image="123432452342"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/landscaping-ideas-1582321830.jpg"
          userId={5}
          username="A Longer Username"
          rotation={0}
          prompt="Wtf bruv this is a decent length prompt suitable for testing."
        />
      </div> */}
      {/* <Modal.Component
        className="bonus"
        component={(props) => (
          <SecretBonus
            secretMessage="Wtf bruv this is a decent length prompt suitable for testing."
            {...props}
          />
        )}
        setVisible={() => null}
        visible={true}
        centered
      /> */}
      {/* <Modal.Component
        className="email"
        component={EmailCollectionForm}
        setVisible={() => null}
        visible={true}
        centered
      /> */}
      <Home />
      <Steps />
      <VotingInfo />
    </div>
  );
};

export default LandingPageContainer;
