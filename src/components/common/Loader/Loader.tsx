import React, { useEffect, useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { nav } from '../../../config';
import { Header } from '../Header';

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = 'Loading' }: LoaderProps): React.ReactElement => {
  const [dots, setDots] = useState('');

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
      <Header menuItems={nav.siteNavItems} />
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
