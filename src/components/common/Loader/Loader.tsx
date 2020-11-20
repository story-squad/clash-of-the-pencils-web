import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiError, user } from '../../../state';

import { Header } from '../Header';
import { nav } from '../../../config';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = 'Loading' }: LoaderProps): React.ReactElement => {
  const [dots, setDots] = useState('');
  const userId = useRecoilValue(user.userId);
  const [loadingError, setLoadingError] = useRecoilState(apiError.global);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((cur) => {
        if (cur.length >= 3) return '';
        else return cur + '.';
      });
    }, 500);
    return () => {
      clearInterval(dotTimer);
      setLoadingError(null);
    };
  }, []);

  return (
    <div className="loader">
      <Header menuItems={userId ? nav.siteNavItems : nav.landingNavItems} />
      <div className="loader-body">
        {loadingError ? (
          <>
            <div className="message error">
              An error occured. Please try again later.
            </div>
            <Link to="/dashboard">Back to Dashboard</Link>
          </>
        ) : (
          <>
            <ClimbingBoxLoader loading={true} />
            <div className="message">
              {message}
              {dots}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Loader;
