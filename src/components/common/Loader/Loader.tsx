import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { user } from '../../../state';

import { Header } from '../Header';
import { nav } from '../../../config';
import { ClimbingBoxLoader } from 'react-spinners';

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = 'Loading' }: LoaderProps): React.ReactElement => {
  const [dots, setDots] = useState('');
  const userId = useRecoilValue(user.userId);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((cur) => {
        if (cur.length >= 3) return '';
        else return cur + '.';
      });
    }, 500);
    return () => clearInterval(dotTimer);
  }, []);

  return (
    <div className="loader">
      <Header menuItems={userId ? nav.siteNavItems : nav.landingNavItems} />
      <div className="loader-body">
        <ClimbingBoxLoader loading={true} />
        <div className="message">
          {message}
          {dots}
        </div>
      </div>
    </div>
  );
};

export default Loader;
