import React from 'react';
import { useRecoilValue } from 'recoil';
import { Users } from '../../../api';
import { account } from '../../../state';
import { PasswordFormProps } from '../../forms';
import { AccountActivation, AccountSettings } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface AccountViewProps {
  submitHandler: PasswordFormProps['onSubmit'];
  user: Users.IUser;
}

export default function AccountView({
  submitHandler,
  user,
}: AccountViewProps): React.ReactElement {
  // For Changes pop up at top of the page
  const submited = useRecoilValue(account.isSubmitted);

  return (
    <DashboardTemplate className="account-view">
      {submited && <div> Your Changes Have Been Saved</div>}
      {/* Only show this if the user is not already validated! */}
      {!user.isValidated && <AccountActivation />}
      {user && <AccountSettings id={user.id} submitHandler={submitHandler} />}
    </DashboardTemplate>
  );
}
