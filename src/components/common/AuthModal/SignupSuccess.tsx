import React from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../state';

const SignupSuccess: React.FC = () => {
  const setSignupWasSuccessful = useSetRecoilState(auth.signupWasSuccessful);
  const setAuthModalOpen = useSetRecoilState(auth.authModalOpen);

  const clickHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthModalOpen(false);
    setTimeout(() => {
      setSignupWasSuccessful(false);
    }, 1000);
  };
  return (
    <div className="signup-success">
      <p>Thanks for signing up!</p>
      <p>Check your email for a verification link to log in.</p>
      <button onClick={clickHandler}>Back to Site</button>
    </div>
  );
};

export default SignupSuccess;
