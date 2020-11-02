import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../../api';
import { validateSignup } from '../../../utils';

import { Modal } from '../../common';
import SignupSuccess from './SignupSuccess';

const initialFormState = {
  username: '',
  email: '',
  parentEmail: '',
  password: '',
  confirm: '',
  ageStr: '',
};

const SignupForm = (): React.ReactElement => {
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!validateSignup(form, setError)) {
      return;
    }

    // Format form data for API call body
    const credentials = auth.formatSignupBody(form);
    auth
      .signup(credentials)
      .then(() => {
        setError(null);
        setShowModal(true);
      })
      .catch((err: auth.AxiosError) => {
        if (err.response?.data) {
          setError(err.response.data.error);
        } else {
          setError('An unknown error occurred. Please try again.');
        }
      });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        component={SignupSuccess}
        closable={false}
        centered={true}
      />
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
    </>
  );
};

export default SignupForm;
