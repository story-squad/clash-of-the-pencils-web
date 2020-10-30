import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = (props) => {
  return (
    <form>
      <h2>Sign Up!</h2>
      <label>
        <input placeholder="Username" />
      </label>
      <label>
        <input placeholder="Email" />
      </label>
      <label>
        <input placeholder="Password" type="password" />
      </label>
      <label>
        <input placeholder="Confirm Password" type="password" />
      </label>
      <label>
        <input placeholder="Age" />
      </label>
      <input type="submit" value="Sign Up" />
      <div className="tos">
        By signing up with our site, you are agreeing to our&nbsp;
        <span className="text-button">Terms & Conditions</span>.
      </div>
      <div>
        Already have an account?
        <br />
        <Link to="/login">Log In Here!</Link>
      </div>
      <button>Just Voting</button>
    </form>
  );
};

export default SignupForm;
