import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Users } from '../../../api';
import { account } from '../../../state';
import { AccountEditProps } from '../../forms/EditAccountForm/EditPasswordForm';
import { AccountActivation, AccountSettings } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface AccountViewProps {
  submitHandler: AccountEditProps['onSubmit'];
  user: Users.IUser;
}

export default function AccountView({
  submitHandler,
  user,
}: AccountViewProps): React.ReactElement {
  // For Changes pop up at top of the page
  const [submitted, setSubmited] = useRecoilState(account.isSubmitted);

  useEffect(() => {
    if (submitted === true) {
      setTimeout(() => {
        setSubmited(false);
      }, 4000);
    } else return;
  }, [submitted]);
  return (
    <DashboardTemplate className="account-view">
      {submitted && (
        <div className="success"> Your Changes Have Been Saved</div>
      )}
      {/* Only show this if the user is not already validated! */}
      {!user.isValidated && <AccountActivation />}
      <AccountSettings id={user.id} submitHandler={submitHandler} />
    </DashboardTemplate>
  );
}
