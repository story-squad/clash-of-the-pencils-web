import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clever } from '../../../api';
import LoginView, { LoginViewProps } from './LoginView';

export default function LoginViewContainer(
  props: LoginViewProps,
): React.ReactElement {
  const { state } = useLocation<Clever.MergeRedirectState>();
  return <LoginView {...props} {...state} />;
}
