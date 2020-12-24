import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '../../../../api';
import { getResetEmail } from '../../../../api/Auth';
import { Input } from '../../../common';

const EmailForm: React.FC = () => {
  // deconstruct our useForm() methods
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  // onSubmit should send the users email a reset password link/token that has a 10 min timer
  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    console.log('Form Submitted: ');
    const userEmail = data.email;
    getResetEmail(userEmail)
      .then(() => {
        clearErrors();
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        let message: string;
        if (err.response?.data) {
          message = err.response.data.error;
        } else {
          message = 'An unknown error occurred. Please try again.';
        }
        setError('form', { type: 'manual', message });
      });
  };

  return (
    <div className="password-form-wrapper">
      <form className="email-form" onSubmit={handleSubmit(onSubmit)}>
        <p>Please enter your email to receive a reset link.</p>
        {errors.form && (
          <div className="server-error">{errors.form.message}</div>
        )}
        <p className="email-form-input">
          <Input
            name="email"
            label="Email"
            placeholder="enter your email"
            errors={errors}
            register={register}
            rules={{ required: 'Please enter your email!' }}
          />
        </p>
        <input
          className="submit-email-btn"
          type="submit"
          value="Send"
          onClick={() => clearErrors('form')}
        />
      </form>
    </div>
  );
};

export default EmailForm;
