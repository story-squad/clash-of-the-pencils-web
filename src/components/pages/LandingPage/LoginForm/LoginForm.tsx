import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../../../../api';
import { token } from '../../../../utils';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../../common';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  const { push } = useHistory();

  const onSubmit: SubmitHandler<Auth.LoginBody> = (data) => {
    console.log(data);
    Auth.login(data)
      .then((res) => {
        token.set(res.data.token);
        push('/dashboard');
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        setError('form', {
          type: 'manual',
          message: 'Uh Oh! Login Unsuccessful',
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Welcome Back!</h1>
      <p>Hey! Thanks for coming back. Please sign in below.</p>
      {errors.form && <div className="server-error">{errors.form.message}</div>}
      <Input
        name="email"
        label="Email"
        errors={errors}
        register={register}
        rules={{ required: 'Please enter your email!' }}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        errors={errors}
        register={register}
        rules={{ required: 'Please enter a password!' }}
      />
      <div className="text">
        Need an account? <Link to="/register">Click Here.</Link>
      </div>
      <input
        type="submit"
        value="Sign In"
        onClick={() => clearErrors('form')}
      />
    </form>
  );
};

export default LoginForm;
