import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Users } from '../../../api';
import { account, auth } from '../../../state';
import { AccountEditProps } from '../../forms/EditAccountForm/EditPasswordForm';
import AccountView from './AccountView';

export default function AccountViewContainer(): React.ReactElement {
  const [user, setUser] = useRecoilState(auth.user);
  const [submitted, setSubmited] = useRecoilState(account.isSubmitted);

  useEffect(() => {
    if (submitted === true) {
      setTimeout(() => {
        setSubmited(false);
      }, 4000);
    } else return;
  }, [submitted]);

  const submitHandler: AccountEditProps['onSubmit'] = useCallback(
    async ({ password, firstName, lastname, dob, id }) => {
      await Users.update({ id, password, firstName, lastname, dob })
        .then((res) => {
          if (res) setSubmited(true), setUser(res);
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
