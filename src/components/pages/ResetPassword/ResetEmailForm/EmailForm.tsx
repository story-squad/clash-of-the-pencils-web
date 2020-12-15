import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common';

const EmailForm: React.FC = () => {
  // deconstruct our useForm() methods
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  // onSubmit should send the users email a reset password link/token that has a 10 min timer
  const onSubmit = (e: any) => {
    console.log('Form Submitted: ', e);
  };

  // TODO - need error handlers, remove console log in onSubmit

  return (
    <div className="landing-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Password Reset</h3>
        <p>Please enter your email to receive a reset link.</p>
        {errors.form && (
          <div className="server-error">{errors.form.message}</div>
        )}
        <Input
          name="email"
          label="Email"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter your email!' }}
        />
        <input type="submit" value="Send" onClick={() => clearErrors('form')} />
      </form>
    </div>
  );
};

export default EmailForm;
