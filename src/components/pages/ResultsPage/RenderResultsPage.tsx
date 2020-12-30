import React from 'react';
import celebration from '../../../assets/img/celebration-station.png';
import { Header } from '../../common';
import { Celebration } from './Celebration';
import { Scoreboard } from './Scoreboard';

const RenderResultsPage = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="results-page">
        <img src={celebration} alt="Celebration Station" />
        <div className="results-modules">
          <Celebration />
          <Scoreboard />
        </div>
      </div>
    </div>
  );
};

export default RenderResultsPage;
