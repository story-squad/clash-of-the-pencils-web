import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '../../../../../api';
import { resetPassword } from '../../../../../api/Users';
import { Input } from '../../../../common';

const PasswordForm = (): React.ReactElement => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm({
    mode: 'onChange',
  });

  // onSubmit update the users password
  const onSubmit: SubmitHandler<{
    currentpassword: string;
    newpassword: string;
    confirmpassword: string;
  }> = (data) => {
    console.log('Form Submitted: ', data);

    // Use the form data for password reset
    const userPasswordBody = {
      currentpassword: data.currentpassword,
      newpassword: data.newpassword,
      confirmpassword: data.confirmpassword,
    };

    // Reset the password from the data provided in the form
    resetPassword(userPasswordBody)
      .then(() => {
        clearErrors();
        console.log('Successful password reset!');
      })
      .catch((err: Auth.AxiosError) => {
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
    <div className="profile-form">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          rules={{ required: 'Please enter your new password.' }}
        />
        <Input
          id="confirmpassword"
          name="confirmpassword"
          label="Confirm New Password"
          type="password"
          errors={errors}
          register={register}
          rules={{ required: 'Please confirm your new password.' }}
        />
        <input
          className="update-password-submit-btn"
          type="submit"
          value="Update Password"
          onClick={() => clearErrors('form')}
        />
      </form>
    </div>
  );
};

export default PasswordForm;
