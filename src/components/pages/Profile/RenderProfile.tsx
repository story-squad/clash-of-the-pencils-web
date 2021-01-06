import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../api';
import { auth } from '../../../state';
import { Header, Input, SubCard } from '../../common';

interface RenderProfileProps {
  picList: Submissions.SubItem[];
}

const RenderProfile = ({ picList }: RenderProfileProps): React.ReactElement => {
  const { register, errors } = useForm();
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);
  const [emailFormVisible, setEmailFormVisible] = useState(false);
  const [codenameFormVisible, setcodenameFormVisible] = useState(false);

  const username = useRecoilValue(auth.username);

  // toggle the password reset form (open/close)
  const togglePasswordResetForm = () => {
    setPasswordFormVisible(!passwordFormVisible);
  };

  // toggle the email reset form (open/close)
  const toggleEmailResetForm = () => {
    setEmailFormVisible(!emailFormVisible);
  };

  // toggle the password reset form (open/close)
  const toggleCodenameResetForm = () => {
    setcodenameFormVisible(!codenameFormVisible);
  };

  // Regex to check entered codename contains only letters and numbers
  const codenamePattern = /^[A-Za-z0-9]*$/;

  return (
    <div className="profile-container">
      <Header />
      <div className="mystories-wrapper">
        <div className="profile-story-list">
          <h2>My Stories</h2>
          {picList.map((pic, i) => (
            <SubCard key={i} {...pic} />
          ))}
          {picList.length === 0 && (
            <div className="profile-story-error-msg">
              You don&apos;t have any past submissions. Check back later!
            </div>
          )}
        </div>
      </div>

      <div className="profile-form-wrapper">
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
            <button onClick={togglePasswordResetForm}>Cancel</button>
          </div>
        ) : (
          <button onClick={togglePasswordResetForm}>Reset Password</button>
        )}

        {emailFormVisible ? (
          <div>
            <Input
              name="oldemail"
              label="Old Email"
              type="email"
              errors={errors}
              register={register}
              rules={{ required: 'Please enter your old email' }}
            />
            <Input
              name="newemail"
              label="New Email"
              type="email"
              errors={errors}
              register={register}
              rules={{ required: 'Please enter your new email' }}
            />
            <Input
              name="confirmemail"
              label="Confirm New Email"
              type="email"
              errors={errors}
              register={register}
              rules={{ required: 'Please confirm your new email' }}
            />
            <button>Confirm Email</button>
            <button onClick={toggleEmailResetForm}>Cancel</button>
          </div>
        ) : (
          <button onClick={toggleEmailResetForm}>Reset Email</button>
        )}

        {codenameFormVisible ? (
          <div>
            <Input
              name="oldcodename"
              label="Old Codename"
              type="text"
              errors={errors}
              register={register}
              rules={{
                required: 'Please enter your old codename',
                validate: {
                  checkCharacters: (value) => {
                    return (
                      codenamePattern.test(value) ||
                      'Only letters and numbers are allowed.'
                    );
                  },
                },
              }}
            />
            <Input
              name="newcodename"
              label="New Codename"
              type="text"
              errors={errors}
              register={register}
              rules={{ required: 'Please enter your new codename' }}
            />
            <Input
              name="confirmcodename"
              label="Confirm New Codename"
              type="text"
              errors={errors}
              register={register}
              rules={{ required: 'Please confirm your new codename' }}
            />
            <button>Confirm Codename</button>
            <button onClick={toggleCodenameResetForm}>Cancel</button>
          </div>
        ) : (
          <button onClick={toggleCodenameResetForm}>Reset Codename</button>
        )}
      </div>
    </div>
  );
};

export default RenderProfile;
