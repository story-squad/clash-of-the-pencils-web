import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../../../state';
import { Input } from '../../../../common';

const CodenameForm = (): React.ReactElement => {
  const { register, errors } = useForm();

  const username = useRecoilValue(auth.username);

  const [codenameFormVisible, setCodenameFormVisible] = useState(false);

  // Toggle the password reset form (open/close)
  const toggleCodenameResetForm = () => {
    setCodenameFormVisible(!codenameFormVisible);
  };

  // HTTP request to udpate password upon submit
  const resetPassword = () => {
    console.log('RESET CODENAME');
  };

  // Regex to check entered codename contains only letters and numbers
  const codenamePattern = /^[A-Za-z0-9]*$/;

  return (
    <div>
      <h2>Current Username: {username}</h2>
      <Input
        id="oldcodename"
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
        id="newcodename"
        name="newcodename"
        label="New Codename"
        type="text"
        errors={errors}
        register={register}
        rules={{ required: 'Please enter your new codename' }}
      />
      <Input
        id="confirmcodename"
        name="confirmcodename"
        label="Confirm New Codename"
        type="text"
        errors={errors}
        register={register}
        rules={{ required: 'Please confirm your new codename' }}
      />
      <button onClick={toggleCodenameResetForm}>Confirm Codename</button>
    </div>
  );
};

export default CodenameForm;
