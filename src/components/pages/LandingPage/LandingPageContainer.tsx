import React, { useEffect, useRef } from 'react';
import { SubCard } from '../../common';
import { Home } from './Home';
import { Steps } from './Steps';
import { VotingInfo } from './VotingInfo';

const LandingPageContainer = (): React.ReactElement => {
  useEffect(() => {
    window.addEventListener('resize', setWindowHeight);
    return () => window.removeEventListener('resize', setWindowHeight);
  }, []);

  // Contains all refs of elements that need height resizing on window dimension change
  const responsiveHeightRefs = useRef<Set<HTMLDivElement>>(new Set());

  // Dynamically set height for all refs
  const setWindowHeight = () => {
    console.log(responsiveHeightRefs.current.size);
    responsiveHeightRefs.current.forEach((element) => {
      if (element) {
        element.style.setProperty('height', `${window.innerHeight}px`);
      }
    });
  };

  return (
    <div className="landing-page-container">
      <div>
        <SubCard
          id={1}
          image="123432452342"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/landscaping-ideas-1582321830.jpg"
          userId={5}
          username="A Longer Username"
          rotation={0}
          prompt="Wtf bruv this is a decent length prompt suitable for testing."
        />
      </div>
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
      <Home responsiveHeightRefs={responsiveHeightRefs} />
      <Steps responsiveHeightRefs={responsiveHeightRefs} />
      <VotingInfo responsiveHeightRefs={responsiveHeightRefs} />
    </div>
  );
};

export default LandingPageContainer;
