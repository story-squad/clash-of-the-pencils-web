import React from 'react';

import { nav } from '../../../../config';
import { Header } from '../../../common';

const RenderCastVotes = (): React.ReactElement => {
  return (
    <div className="cast-votes">
      <Header menuItems={nav.siteNavItems} />
    </div>
  );
};

export default RenderCastVotes;
