import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../../../../api';
import { token } from '../../../../utils';

import { useForm, SubmitHandler } from 'react-hook-form';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  const { push } = useHistory();

  const formError = (message: string): void =>
    setError('form', { type: 'manual', message });

  const onSubmit: SubmitHandler<Auth.LoginBody> = (data) => {
    console.log(data);
    Auth.login(data)
      .then((res) => {
        token.set(res.data.token);
        push('/dashboard');
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        if (err.response?.data) {
          formError(err.response.data.error);
        } else {
          formError('An error occurred while attempting to log in.');
        }
      });
  };

  useEffect(() => {
    console.log(errors);
    if (errors.password || errors.email) formError('Fields cannot be empty!');
  }, [errors]);

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Log In!</h2>
      <label>
        <input
          ref={register({ required: 'Please enter your email!' })}
          name="email"
          placeholder="Email"
          className={errors.email ? 'error' : undefined}
        />
      </label>
      <label>
        <input
          ref={register({ required: 'Please enter your password!' })}
          name="password"
          placeholder="Password"
          type="password"
          className={errors.password ? 'error' : undefined}
        />
      </label>
      {errors.form && <div className="error">{errors.form.message}</div>}
      <input type="submit" value="Log In" onClick={() => clearErrors('form')} />
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
