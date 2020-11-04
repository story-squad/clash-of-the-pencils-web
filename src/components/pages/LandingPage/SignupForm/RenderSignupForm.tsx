import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../../../../api';

const RenderSignupForm = (props: RenderSignupFormProps): React.ReactElement => {
  const { form, error, changeHandler, onSubmit } = props;
  return (
    <form>
      <h2>Sign Up!</h2>
      <label>
        <input
          onChange={changeHandler}
          name="username"
          placeholder="Username"
        />
      </label>
      <label>
        <input onChange={changeHandler} name="email" placeholder="Email" />
      </label>
      <label>
        <input
          onChange={changeHandler}
          name="password"
          placeholder="Password"
          type="password"
        />
      </label>
      <label>
        <input
          onChange={changeHandler}
          name="confirm"
          placeholder="Confirm Password"
          type="password"
        />
      </label>
      <label>
        <input onChange={changeHandler} name="ageStr" placeholder="Age" />
      </label>
      {/* If the user is younger than 13, require a parent email */}
      {parseInt(form.ageStr) < 13 && (
        <label>
          <input
            onChange={changeHandler}
            name="parentEmail"
            placeholder="Parent Email"
          />
        </label>
      )}
      {error && <div className="error">{error}</div>}
      <input type="submit" value="Sign Up" onClick={onSubmit} />
      <div className="tos">
        By signing up with our site, you are agreeing to our{' '}
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

interface RenderSignupFormProps {
  form: Auth.SignupFormState;
  error: string | null;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default RenderSignupForm;
