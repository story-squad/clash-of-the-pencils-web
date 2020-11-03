import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { ClimbingBoxLoader } from 'react-spinners';

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
    <>
      <Header />
      <div className="loader">
        <ClimbingBoxLoader loading={true} />
        <div className="message">
          {message}
          {dots}
        </div>
      </div>
    </>
  );
};

export default Loader;
