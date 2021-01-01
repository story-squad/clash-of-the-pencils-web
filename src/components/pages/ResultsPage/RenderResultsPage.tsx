import React from 'react';
import celebrationPNG from '../../../assets/img/PNGs/celebration-station.png';
import celebrationWEBP from '../../../assets/img/WebPs/celebration-station.webp';
import { Header, Image } from '../../common';
import { Celebration } from './Celebration';
import { Scoreboard } from './Scoreboard';

const RenderResultsPage = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="results-page">
        <Image
          webp={celebrationWEBP}
          src={celebrationPNG}
          alt="Celebration Station"
        />
        <div className="results-modules">
          <Celebration />
          <Scoreboard />
        </div>
      </div>
    </div>
  );
};

export default RenderResultsPage;
