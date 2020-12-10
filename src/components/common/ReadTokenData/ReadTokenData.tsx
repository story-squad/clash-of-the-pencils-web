import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { user } from '../../../state';
import { token } from '../../../utils';

const ReadTokenData = (): React.ReactElement => {
  const [userId, setUserId] = useRecoilState(user.userId);
  const [username, setUsername] = useRecoilState(user.username);

  useEffect(() => {
    if (!userId) {
      const id = token.get('userId');
      if (typeof id === 'number') setUserId(id);
    }
    if (!username) {
      const usr = token.get('username');
      if (typeof usr === 'string') setUsername(usr);
    }
  }, []);

  return <></>;
};

export default ReadTokenData;
