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
    <>
      <p className="signup-success">
        -+9 Thanks for signing up!
        <br />
        Check your email for a verification link to log in.
        <br />
      </p>
      <button onClick={clickHandler}>Home</button>
    </>
  );
};

export default SignupSuccess;
