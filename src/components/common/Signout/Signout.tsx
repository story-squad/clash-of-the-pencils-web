import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { apiError, clearState } from '../../../state';
import { token } from '../../../utils';
import { Loader } from '../Loader';

const Signout = (): React.ReactElement => {
  const { push } = useHistory();
  const clearRecoilState = useSetRecoilState(clearState.all);
  const setError = useSetRecoilState(apiError.global);

  useEffect(() => {
    setError(null);
    setTimeout(() => {
      clearRecoilState(null);
      token.clear();
      push('/');
    }, 1000);
  }, []);

  return <Loader message="Logging out" />;
};

export default Signout;
