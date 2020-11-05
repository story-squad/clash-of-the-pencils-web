import React from 'react';
import { useHistory } from 'react-router-dom';

const SignupSuccess: React.FC = () => {
  const { push } = useHistory();
  const clickHandler = (e: React.FormEvent) => {
    e.preventDefault();
    push('/');
  };
  return (
    <p className="signup-success">
      Thanks for signing up!
      <br />
      Check your email for a verification link to log in.
      <br />
      <button onClick={clickHandler}>Home</button>
    </p>
  );
};

export default SignupSuccess;
