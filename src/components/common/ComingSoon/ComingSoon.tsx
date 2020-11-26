import React from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../Header';

const ComingSoon = ({
  fullPage = true,
}: ComingSoonProps): React.ReactElement => {
  return (
    <div>
      {fullPage && <Header />}
      <div className="coming-soon">
        <p>
          This {fullPage ? 'page' : 'feature'} is currently under construction.
        </p>
        <p>Check back later!</p>
        {fullPage && <Link to="/dashboard">Back to Dashboard</Link>}
      </div>
    </div>
  );
};

interface ComingSoonProps {
  fullPage?: boolean;
}

export default ComingSoon;
