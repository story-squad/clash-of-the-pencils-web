import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { user } from '../../../state';
import { token } from '../../../utils';
import { Loader } from '../Loader';

const Signout = (): React.ReactElement => {
  const { push } = useHistory();
  const setUserId = useSetRecoilState(user.userId);

  useEffect(() => {
    setTimeout(() => {
      setUserId(null);
      token.clear();
      push('/');
    }, 1000);
  }, []);

  return <Loader message="Logging out" />;
};

export default Signout;
