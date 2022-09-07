import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Users } from '../../../api';
import { account, auth } from '../../../state';
import { AccountEditProps } from '../../forms/EditAccountForm/EditPasswordForm';
import AccountView from './AccountView';

export default function AccountViewContainer(): React.ReactElement {
  const [user, setUser] = useRecoilState(auth.user);
  const [submitted, setSubmitted] = useRecoilState(account.isSubmitted);

  useEffect(() => {
    if (submitted === true) {
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } else return;
  }, [submitted]);

  const submitHandler: AccountEditProps['onSubmit'] = useCallback(
    async ({ password, firstName, lastName, dob, id }) => {
      await Users.update({ id, password, firstName, lastName, dob })
        .then((res) => {
          if (res) setSubmitted(true), setUser(res);
        })
        .catch((err) => console.log(err));
    },
    [],
  );

  if (!user) return <Redirect to="/login" />;
  else
    return (
      <AccountView
        user={user}
        submitHandler={submitHandler}
        submitted={submitted}
      />
    );
}
