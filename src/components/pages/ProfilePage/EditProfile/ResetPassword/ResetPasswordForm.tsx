import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth, Users } from '../../../../../api';
import { Input } from '../../../../common';

const PasswordForm = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  // onSubmit update the users password
  const onSubmit: SubmitHandler<Users.UpdatePasswordBody> = (data) => {
    console.log('Form Submitted: ', data);

    // Use the form data for password reset
    const userPasswordBody = {
      currentpassword: data.currentpassword,
      newpassword: data.newpassword,
      confirmpassword: data.confirmpassword,
    };

    // Reset the password from the data provided in the form
    Users.resetPassword(userPasswordBody)
      .then(() => {
        clearErrors();
        console.log('Successful password reset!');
      })
      .catch((err: Auth.AxiosError) => {
        let message: string;
        console.log({ err });
        if (err.response?.data.message) message = err.response.data.message;
        else if (err.response?.data.error) message = err.response.data.error;
        else {
          message = 'An unknown error occurred. Please try again.';
        }
        setError('form', { type: 'manual', message });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.form && <div className="server-error">{errors.form.message}</div>}
      <Input
        id="currentpassword"
        name="currentpassword"
        label="Old Password"
        type="password"
        errors={errors}
        register={register}
        rules={{ required: 'Please enter your old password.' }}
      />
      <Input
        id="newpassword"
        name="newpassword"
        label="New Password"
        type="password"
        errors={errors}
        register={register}
        rules={{
          required: 'Password is required!',
          validate: {
            // checks entered password value contains required characters
            includesCapital: (value) => {
              const pattern = /[A-Z]/;
              return (
                pattern.test(value) ||
                'Password must include at least 1 capital letter.'
              );
            },
            includesNumber: (value) => {
              const pattern = /[0-9]/;
              return (
                pattern.test(value) ||
                'Password must include at least 1 number.'
              );
            },
            // checks that entered password value is a minimum of 8 chars
            checkLength: (value) => {
              return (
                (value.length >= 8 && value.length <= 32) ||
                'Password must be between 8 and 32 characters.'
              );
            },
          },
        }}
      />
      <Input
        id="confirmpassword"
        name="confirmpassword"
        label="Confirm New Password"
        type="password"
        errors={errors}
        register={register}
        rules={{
          required: 'Password confirmation is required!',
          validate: (value) => {
            // checks that the values in password and confirm inputs match
            return value === watch('newpassword') || "Passwords don't match!";
          },
        }}
      />
      <input
        className="update-password-submit-btn"
        type="submit"
        value="Update Password"
        onClick={() => clearErrors('form')}
      />
    </form>
  );
};

export default PasswordForm;
