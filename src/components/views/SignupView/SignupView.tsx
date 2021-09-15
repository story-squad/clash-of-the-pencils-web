import React from 'react';
import { Users } from '../../../api';

export interface SignupViewProps {
  onSubmit?: (data: Users.INewUser) => void;
  openLoging?: () => void;
}

export default function SignupView({}: SignupViewProps): React.ReactElement {
  return (
    
  )
}