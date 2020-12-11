import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { user } from '../../../state';
import { Header, Input } from '../../common';

const RenderProfile = (): React.ReactElement => {
  const { register, errors } = useForm();
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);
  const username = useRecoilValue(user.username);

  const toggleShowPasswordForm = () => {
    setPasswordFormVisible(!passwordFormVisible);
  };

  return (
    <div className="profile-container">
      <Header />
      <h1>Hello {username}</h1>

      {/* 3 inputs: old password, new password x2, 1 button that says "edit password" >> 1 button "reset password" that will appear once edit password is clicked.  */}

      {passwordFormVisible ? (
        <div>
          <Input
            name="oldpassword"
            label="Old Password"
            type="password"
            errors={errors}
            register={register}
            rules={{ required: 'Please enter your old password' }}
          />
          <Input
            name="newpassword"
            label="New Password"
            type="password"
            errors={errors}
            register={register}
            rules={{ required: 'Please enter your new password' }}
          />
          <Input
            name="confirmpassword"
            label="Confirm New Password"
            type="password"
            errors={errors}
            register={register}
            rules={{ required: 'Please confirm your new password' }}
          />
          <button>Confirm Password</button>
          <button onClick={toggleShowPasswordForm}>Cancel</button>
        </div>
      ) : (
        <button onClick={toggleShowPasswordForm}>Reset Password</button>
      )}
    </div>
  );
};

export default RenderProfile;
