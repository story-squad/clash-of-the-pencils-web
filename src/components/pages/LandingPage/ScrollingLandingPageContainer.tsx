import React, { useState, useRef, useEffect } from 'react';
import ReactScroller from 'react-page-scroller';
import { Home } from './Home';
import { NavDirection } from './NavArrowButton';
import { Steps } from './Steps';
import { VotingInfo } from './VotingInfo';

const ScrollingLandingPageContainer = (): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const changePage = (newNum: number) => setCurrentPage(newNum);
  const beforePageChange = (newNum: number) => console.log(newNum);

  useEffect(() => {
    window.addEventListener('resize', setWindowHeight);
    return () => window.removeEventListener('resize', setWindowHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('orientationchange', setWindowHeight);
    return () =>
      window.removeEventListener('orientationchange', setWindowHeight);
  }, []);

  const buttonNavY = (navDirection: NavDirection) => {
    if (navDirection === 'up') {
      changePage((currentPage ? currentPage : 0) - 1);
    } else if (navDirection === 'down')
      changePage((currentPage ? currentPage : 0) + 1);
  };

  // Contains all refs of elements that need height resizing on window dimension change
  const responsiveHeightRefs = useRef<[HTMLElement] | []>([]);

  // Dynamically set height for all refs
  const setWindowHeight = () => {
    console.log(responsiveHeightRefs.current);
    responsiveHeightRefs.current.forEach((element) => {
      if (element) {
        element.style.setProperty('height', `${window.innerHeight / 100}px`);
      }
    });
  };

  return (
    <ReactScroller
      pageOnChange={changePage}
      onBeforePageScroll={beforePageChange}
      customPageNumber={currentPage}
      renderAllPagesOnFirstRender
    >
      {/* <Scoreboard
        rows={[
          { score: 40, username: 'Brandon' },
          { score: 42, username: 'Brandon1' },
          { score: 44, username: 'Brandon2' },
        ]}
      /> */}
      <Home
        buttonNav={buttonNavY}
        responsiveHeightRefs={responsiveHeightRefs}
      />
      <Steps
        buttonNavY={buttonNavY}
        responsiveHeightRefs={responsiveHeightRefs}
      />
      <VotingInfo
        buttonNav={buttonNavY}
        responsiveHeightRefs={responsiveHeightRefs}
      />
    </ReactScroller>
  );
};

export default ScrollingLandingPageContainer;
