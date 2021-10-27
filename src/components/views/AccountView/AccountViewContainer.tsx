import React from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import AccountView from './AccountView';

export default function AccountViewContainer(): React.ReactElement {
  const user = useRecoilValue(auth.user);

  if (!user) return <Redirect to="/login" />;
  else return <AccountView user={user} />;
}
