import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clever } from '../../../api';
import SignupView, { SignupViewProps } from './SignupView';

export default function SignupViewContainer(
  props: SignupViewProps,
): React.ReactElement {
  const { state } = useLocation<Clever.NewRedirectState>();
  return <SignupView {...props} {...state} />;
}
