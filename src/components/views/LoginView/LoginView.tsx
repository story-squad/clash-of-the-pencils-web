import React from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../state';
import { LoginForm } from '../../forms';
import { DashboardTemplate } from '../../templates';

export default function LoginView(): React.ReactElement {
  const login = useSetRecoilState(auth.login);

  return (
    <DashboardTemplate useStorySquadHeader>
      <LoginForm onSuccess={login} />
    </DashboardTemplate>
  );
}
