import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { clearState } from '../../../state';
import { token } from '../../../utils';
import { Loader } from '../Loader';

const Signout = (): React.ReactElement => {
  const { push } = useHistory();
  const clearRecoilState = useSetRecoilState(clearState.all);

  useEffect(() => {
    setTimeout(() => {
      clearRecoilState(null);
      token.clear();
      push('/');
    }, 1000);
  }, []);

  return <Loader message="Logging out" />;
};

export default Signout;
