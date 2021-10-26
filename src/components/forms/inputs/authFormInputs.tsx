import React from 'react';
import { dataConstraints } from '../../../config';
import { Input } from '../../molecules';
import { FormInputMapProps } from './types';

export default {
  codename: function CodenameInput(
    { rules, ...props }: FormInputMapProps = {},
    orEmail = false,
  ): React.ReactElement {
    return (
      <Input
        {...props}
        name="codename"
        label={`Codename${orEmail ? ' or Email' : ''}`}
        rules={{ required: 'Please enter your codename or email!', ...rules }}
        placeholder="Codename or email address"
      />
    );
  },
  password: function PasswordInput({
    rules,
    ...props
  }: FormInputMapProps = {}): React.ReactElement {
    return (
      <Input
        {...props}
        name="password"
        label="Password"
        inputType="password"
        rules={{
          required: 'Please enter a password!',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
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
          ...rules,
        }}
        placeholder="Password must be at least 8 characters"
      />
    );
  },
  confirmPassword: function ConfirmPasswordInput({
    rules,
    ...props
  }: FormInputMapProps = {}): React.ReactElement {
    return (
      <Input
        {...props}
        name="confirmPassword"
        label="Re-Enter Password"
        inputType="password"
        rules={{ required: 'Please enter a password!', ...rules }}
        placeholder="Re-enter your password"
      />
    );
  },
  firstname: function FirstnameInput({
    rules,
    ...props
  }: FormInputMapProps = {}): React.ReactElement {
    return (
      <Input
        {...props}
        name="firstname"
        label="First Name"
        rules={{ required: 'Please enter your first name!', ...rules }}
        placeholder="First Name"
      />
    );
  },
  lastname: function LastnameInput({
    rules,
    ...props
  }: FormInputMapProps = {}): React.ReactElement {
    return (
      <Input
        {...props}
        name="lastname"
        label="Last Name"
        rules={{ required: 'Last name is required!', ...rules }}
        placeholder="Last Name"
      />
    );
  },
  birthday: function BirthdayInput({
    rules,
    ...props
  }: FormInputMapProps = {}): React.ReactElement {
    return (
      <Input
        {...props}
        name="dob"
        label="Birthday"
        inputType="date"
        rules={{ required: 'Birthday is required!', ...rules }}
        placeholder="Birthday"
      />
    );
  },
  email: function EmailInput({
    rules,
    ...props
  }: FormInputMapProps = {}): React.ReactElement {
    return (
      <Input
        {...props}
        name="email"
        label="Email Address"
        inputType="email"
        rules={{
          required: 'Email is required!',
          pattern: {
            value: dataConstraints.emailPattern,
            message: 'Must be a valid email address',
          },
          ...rules,
        }}
        placeholder="Email Address"
      />
    );
  },
  parentEmail: function EmailInput({
    rules,
    ...props
  }: FormInputMapProps = {}): React.ReactElement {
    return (
      <Input
        {...props}
        name="parentEmail"
        label="Parent Email Address"
        inputType="email"
        rules={{
          required: 'Parent email is required for users under 13!',
          ...rules,
        }}
        placeholder="Parent Email Address"
      />
    );
  },
};
