import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginView, { LoginViewProps } from './LoginView';

export default function LoginViewContainer(
  props: LoginViewProps,
): React.ReactElement {
  const { state } = useLocation();
  return <LoginView {...props} {...state} />;
}
