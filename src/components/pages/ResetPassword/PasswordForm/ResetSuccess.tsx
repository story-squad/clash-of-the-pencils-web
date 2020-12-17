import React from 'react';
import { useHistory } from 'react-router-dom';
const ResetSuccess: React.FC = () => {
  const { push } = useHistory();

  const clickHandler = (e: React.FormEvent) => {
    e.preventDefault();
    push('/login');
  };
  return (
    <>
      <p className="signup-success">
        Password Reset Successful!
        <br />
        Please log in to complete the reset process.
        <br />
        <button onCanPlayThrough={clickHandler}>Login</button>
      </p>
    </>
  );
};

export default ResetSuccess;
