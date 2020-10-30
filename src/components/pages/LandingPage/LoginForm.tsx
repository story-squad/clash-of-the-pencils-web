import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../api';

const initialFormState = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [form, setForm] = useState(initialFormState);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth
      .login(form)
      .then((res) => {
        console.log('SUCC', res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="login-form">
      <h2>Log In!</h2>
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
      <input type="submit" value="Log In" onClick={onSubmit} />
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
