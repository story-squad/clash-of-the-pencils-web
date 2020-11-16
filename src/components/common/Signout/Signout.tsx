import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { token } from '../../../utils';
import { Loader } from '../Loader';

const Signout = (): React.ReactElement => {
  const { push } = useHistory();

  useEffect(() => {
    setTimeout(() => {
      token.clear();
      push('/');
    }, 1000);
  }, []);

  return <Loader message="Logging out" />;
};

export default Signout;
