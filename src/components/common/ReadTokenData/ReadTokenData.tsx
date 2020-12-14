import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { user } from '../../../state';

const ReadTokenData = (): React.ReactElement => {
  const [isLogged, login] = useRecoilState(user.isLoggedIn);
  useEffect(() => {
    if (!isLogged) {
      login(true);
    }
  }, []);

  return <></>;
};

export default ReadTokenData;
