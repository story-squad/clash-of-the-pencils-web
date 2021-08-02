import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Checkbox, Input } from '../..';
import { Auth, Users } from '../../../../api';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import squadUp from '../../../../assets/img/squad-up.png';
import { dataConstraints } from '../../../../config';
import { auth } from '../../../../state';

const SignupForm = (): React.ReactElement => {
  const {
    register,
    errors,
    watch,
    handleSubmit,
    clearErrors,
    setError,
    // setValue,
  } = useForm({ mode: 'onChange' });

  const setSignupWasSuccessful = useSetRecoilState(auth.signupWasSuccessful);

  // This function will run an API call to retrieve a new random username
  // const setRNGusername = () => {
  //   Auth.getRNGusername()
  //     .then((res) => {
  //       setValue('username', res.data);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // };

  const onSubmit: SubmitHandler<Users.INewUser> = (data): void => {
    // Format form data for API call body
    const credentials = Auth.formatSignupBody(data);
    Auth.signup(credentials)
      .then(() => {
        clearErrors();

        // send Convert Kit the email address
        axios.post('https://api.convertkit.com/v3/forms/1903505/subscribe', {
          api_key: process.env.REACT_APP_CONVERTKIT_URL,
          email: credentials.email,
        });
        setSignupWasSuccessful(true);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dragon-boi">
        <DragonBoi className="dragon" />
      </div>
      <img src={squadUp} alt="Squad Up!" />
      <p>
        Can&apos;t wait to start writing? Create a free, safe, and super-secret
        account below!
      </p>
      {errors.form && <div className="server-error">{errors.form.message}</div>}
      <div className="inputs">
        <Input
          id="firstname"
          name="firstname"
          label="First Name"
          errors={errors}
          register={register}
          rules={{
            required: 'First name is required!',
          }}
          placeholder="Your first name"
        />
        <Input
          id="lastname"
          name="lastname"
          label="Last Name"
          errors={errors}
          register={register}
          rules={{
            required: 'Last name is required!',
          }}
          placeholder="Your last name"
        />
        <div className="codename-input">
          <Input
            id="codename"
            name="codename"
            label="Codename"
            errors={errors}
            register={register}
            rules={{
              required: 'Codename is required!',
              validate: {
                checkCharacters: (value) => {
                  return (
                    // ensures the user's entered codename contains only allowed characters
                    dataConstraints.codenamePattern.test(value) ||
                    'Only letters and numbers are allowed.'
                  );
                },
                checkLength: (value) => {
                  return (
                    value.length < 15 || 'Cannot be more than 15 characters.'
                  );
                },
              },
            }}
            placeholder="Your secret codename!"
          />
          {/* <GiRollingDices
            title="Get a random Codename"
            onClick={setRNGusername}
          /> */}
        </div>
        <Input
          id="age"
          name="ageStr"
          label="Age"
          errors={errors}
          register={register}
          rules={{
            required: 'Age is required!',
            validate: (value) => !!parseInt(value) || 'Age must be a number!',
          }}
          placeholder="How old are you?"
        />
        <Input
          id="signupEmail"
          name="email"
          label="Email"
          type="email"
          errors={errors}
          register={register}
          rules={{
            required: 'Email is required!',
            pattern: {
              // ensures the entered email string matches a valid email address pattern
              value: dataConstraints.emailPattern,
              message: 'Please enter a valid email address.',
            },
          }}
          placeholder="What's your email address?"
        />

        {/* If the user is younger than 13, require a parent email */}
        {parseInt(watch('ageStr')) < 13 && (
          <Input
            id="parentEmail"
            name="parentEmail"
            label="Parent Email"
            errors={errors}
            register={register}
            rules={{
              validate: {
                // required field if the entered age is less than 13
                required: (value) => {
                  if (parseInt(watch('ageStr')) < 13)
                    return value.length > 1 || 'Parent email is required!';
                  else return true;
                },
                // checks the email and parent email to make sure they are different
                differentEmail: (value) => {
                  return (
                    value !== watch('email') ||
                    'Parent email must be different than email!'
                  );
                },
              },
              pattern: {
                // ensures the entered parent email string matches a valid email address pattern
                value: dataConstraints.emailPattern,
                message: 'Please enter a valid email address.',
              },
            }}
            placeholder="What's your parent's email?"
          />
        )}
        <div style={{ flexBasis: '100%' }}>
          {/* This is a flex line break*/}
        </div>
        <Input
          id="signupPassword"
          name="password"
          label="Password"
          type="password"
          showPassword
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
          placeholder="Create a safe and secret password!"
        />
        <Input
          id="signupConfirm"
          name="confirm"
          label="Confirm Password"
          type="password"
          showPassword
          errors={errors}
          register={register}
          rules={{
            required: 'Password confirmation is required!',
            validate: (value) => {
              // checks that the values in password and confirm inputs match
              return value === watch('password') || "Passwords don't match!";
            },
          }}
          placeholder="Type your password one more time!"
        />
      </div>

      <Checkbox
        id="termsCheckbox"
        name="termsCheckbox"
        label={
          <>
            I have read and agree to the&nbsp;
            <Link
              to="/tos"
              className="text-button"
              target="_blank"
              tabIndex={-1}
            >
              Terms & Conditions
            </Link>
            .
          </>
        }
        errors={errors}
        register={register}
        rules={{ required: 'You must agree to the terms!' }}
      />

      <input
        type="submit"
        value="Create Account"
        onClick={() => clearErrors('form')}
      />
    </form>
  );
};

export default SignupForm;
