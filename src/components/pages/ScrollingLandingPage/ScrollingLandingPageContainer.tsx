import React, { useState } from 'react';
import ReactScroller from 'react-page-scroller';
import { Home } from '../LandingPage/Home';

const ScrollingLandingPageContainer = (): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const changePage = (newNum: number) => setCurrentPage(newNum);
  const beforePageChange = (newNum: number) => console.log(newNum);

  return (
    <ReactScroller
      pageOnChange={changePage}
      onBeforePageScroll={beforePageChange}
      customPageNumber={currentPage}
    >
      <Home />
      <div>First thingy</div>
      <div>Second Thingy</div>
    </ReactScroller>
  );
};

export default ScrollingLandingPageContainer;
