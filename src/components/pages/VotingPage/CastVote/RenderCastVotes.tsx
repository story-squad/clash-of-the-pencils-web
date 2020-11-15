import React from 'react';

import { Header } from '../../../common';
import { nav } from '../../../../config';

const RenderCastVotes = (): React.ReactElement => {
  return (
    <div className="cast-votes">
      <Header menuItems={nav.siteNavItems} />
    </div>
  );
};

export default RenderCastVotes;
