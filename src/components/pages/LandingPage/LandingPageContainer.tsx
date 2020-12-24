import React, { useRef, useEffect } from 'react';
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
      {/* <Scoreboard
        rows={[
          { score: 40, username: 'Brandon' },
          { score: 42, username: 'Brandon1' },
          { score: 44, username: 'Brandon2' },
        ]}
      /> */}
      <Home responsiveHeightRefs={responsiveHeightRefs} />
      <Steps responsiveHeightRefs={responsiveHeightRefs} />
      <VotingInfo responsiveHeightRefs={responsiveHeightRefs} />
    </div>
  );
};

export default LandingPageContainer;
