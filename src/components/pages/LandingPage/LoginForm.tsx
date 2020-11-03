import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../../../api';
import { setToken } from '../../../utils';

const initialFormState = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const { push } = useHistory();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields
    if (form.email.length <= 0 || form.password.length <= 0) {
      setError('Fields cannot be empty!');
      return;
    }

    Auth.login(form)
      .then((res) => {
        setToken(res.data.token);
        push('/dashboard');
      })
      .catch((err: Auth.AxiosError | string) => {
        console.log({ err });
        if (typeof err === 'string') {
          setError(err);
        } else if (err.response?.data) {
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
      {error && <div className="error">{error}</div>}
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
