import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../common';

const PasswordForm = (): React.ReactElement => {
  const { register, errors } = useForm();

  // HTTP request to udpate password upon submit
  const resetPassword = () => {
    console.log('RESET PASSWORD');
  };

  return (
    <div className="profile-form">
      <Input
        id="currentpassword"
        name="oldpassword"
        label="Old Password"
        type="password"
        errors={errors}
        register={register}
        rules={{ required: 'Please enter your old password' }}
      />
      <Input
        id="newpassword"
        name="newpassword"
        label="New Password"
        type="password"
        errors={errors}
        register={register}
        rules={{ required: 'Please enter your new password' }}
      />
      <Input
        id="confirmpassword"
        name="confirmpassword"
        label="Confirm New Password"
        type="password"
        errors={errors}
        register={register}
        rules={{ required: 'Please confirm your new password' }}
      />
      <button onClick={resetPassword}>Confirm Password</button>
    </div>
  );
};

export default PasswordForm;
