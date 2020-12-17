import React, { useState } from 'react';
import ReactScroller from 'react-page-scroller';
import { Home } from './Home';
import { NavDirection } from './NavArrowButton';
import { Steps } from './Steps';
import { VotingInfo } from './VotingInfo';

const ScrollingLandingPageContainer = (): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const changePage = (newNum: number) => setCurrentPage(newNum);
  const beforePageChange = (newNum: number) => console.log(newNum);

  const buttonNavY = (navDirection: NavDirection) => {
    if (navDirection === 'up') {
      changePage((currentPage ? currentPage : 0) - 1);
    } else if (navDirection === 'down')
      changePage((currentPage ? currentPage : 0) + 1);
  };

  return (
    <ReactScroller
      pageOnChange={changePage}
      onBeforePageScroll={beforePageChange}
      customPageNumber={currentPage}
      renderAllPagesOnFirstRender
    >
      <Home buttonNav={buttonNavY} />
      <Steps buttonNavY={buttonNavY} />
      <VotingInfo buttonNav={buttonNavY} />
    </ReactScroller>
  );
};

export default ScrollingLandingPageContainer;
