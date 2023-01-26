import React from 'react';
import { useLocation } from 'react-router-dom';
import SignupView, { SignupViewProps } from './SignupView';

export default function SignupViewContainer(
  props: SignupViewProps,
): React.ReactElement {
  const { state } = useLocation();
  return <SignupView {...props} {...state} />;
}
