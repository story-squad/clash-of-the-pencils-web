import React, { useCallback, useMemo } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Auth } from '../../../api';
import { parse } from '../../../utils';
import { ResetPasswordFormProps } from '../../forms';
import ResetPasswordView from './ResetPasswordView';

export default function ResetPasswordViewContainer(): React.ReactElement {
  const { search } = useLocation();
  const { code, email } = useMemo(
    () => parse<'code' | 'email'>(search),
    [search],
  );
  const { push } = useHistory();
  const openLogin = useCallback(() => push('/login'), [push]);

  const submitHandler: ResetPasswordFormProps['onSubmit'] = useCallback(
    async ({ password }) => {
      if (email && code) {
        await Auth.updatePassword({ password, email, code });
      }
    },
    [email, code],
  );

  if (!code || !email) {
    return <Redirect to="/" />;
  } else
    return (
      <ResetPasswordView submitHandler={submitHandler} openLogin={openLogin} />
    );
}
