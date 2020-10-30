import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  return (
    <form className="login-form">
      <h2>Log In!</h2>
      <label>
        <input placeholder="Email" />
      </label>
      <label>
        <input placeholder="Password" type="password" />
      </label>
      <input type="submit" value="Log In" />
      <div>
        Don&apos;t have an account?
        <br />
        <Link to="/register">Sign Up Here!</Link>
      </div>
      <button>Just Voting</button>
    </form>
  );
};

export default LoginForm;
