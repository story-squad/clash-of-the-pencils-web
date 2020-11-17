import React from 'react';
import { Link } from 'react-router-dom';

import { nav } from '../../../config';
import { Header } from '../Header';

const ComingSoon = (): React.ReactElement => {
  return (
    <div>
      <Header menuItems={nav.siteNavItems} />
      <div className="coming-soon">
        <p>
          This page is currently under construction.
          <br />
          Check back later!
        </p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default ComingSoon;
