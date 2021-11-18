import React from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { AccountCards } from '../../molecules';
import reformatDate from './reformatDate';
import './styles/index.scss';

export default function AccountContainer(): React.ReactElement {
  const user = useRecoilValue(auth.user);

  const newDate = reformatDate(user?.dob);

  return (
    <div className="account-wrapper">
      <h2>Account Settings</h2>
      {user && (
        <AccountCards
          codename={user.codename}
          dob={newDate}
          email={user.email}
          firstname={user.firstname}
          lastname={user.lastname}
        />
      )}
    </div>
  );
}
