import React, { useCallback, useMemo } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '../../../api';
import { parse } from '../../../utils';
import { PasswordFormProps } from '../../forms';
import ResetPasswordView from './ResetPasswordView';

export default function ResetPasswordViewContainer(): React.ReactElement {
  const { search } = useLocation();
  const { code, email } = useMemo(
    () => parse<'code' | 'email'>(search),
    [search],
  );
  const navigate = useNavigate();
  const openLogin = useCallback(() => navigate('/login'), [navigate]);

  const submitHandler: PasswordFormProps['onSubmit'] = useCallback(
    async ({ password }) => {
      if (email && code) {
        await Auth.updatePassword({ password, email, code });
      }
    },
    [email, code],
  );

  if (!code || !email) {
    return <Navigate to="/" replace />;
  } else
    return (
      <ResetPasswordView submitHandler={submitHandler} openLogin={openLogin} />
    );
}
