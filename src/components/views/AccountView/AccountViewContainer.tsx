import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Users } from '../../../api';
import { auth } from '../../../state';
import { EditProps } from '../../forms/EditAccountForm/EditPasswordForm';
import AccountView from './AccountView';

export default function AccountViewContainer(): React.ReactElement {
  const user = useRecoilValue(auth.user);

  const submitHandler: EditProps['onSubmit'] = useCallback(
    async ({ password, firstname, lastname, dob }) => {
      console.log('run');
      await Users.update({ password, firstname, lastname, dob });
    },
    [],
  );

  if (!user) return <Redirect to="/login" />;
  else return <AccountView user={user} submitHandler={submitHandler} />;
}
