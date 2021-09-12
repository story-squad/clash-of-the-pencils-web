import React from 'react';
import { Input } from '../../molecules';
import { CustomRulesProps } from './types';

export default {
  codename: function CodenameInput(
    rules: CustomRulesProps = {},
  ): React.ReactElement {
    return (
      <Input
        name="codename"
        label="Codename"
        rules={{ required: 'Please enter your codename!', ...rules }}
        placeholder="Codename"
      />
    );
  },
  password: function PasswordInput(
    rules: CustomRulesProps = {},
  ): React.ReactElement {
    return (
      <Input
        name="password"
        label="Password"
        inputType="password"
        rules={{
          required: 'Please enter a password!',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          ...rules,
        }}
        placeholder="Password must be at least 8 characters"
      />
    );
  },
  confirmPassword: function ConfirmPasswordInput(
    rules: CustomRulesProps = {},
  ): React.ReactElement {
    return (
      <Input
        name="password"
        label="Password"
        inputType="password"
        rules={{ required: 'Please enter a password!', ...rules }}
        placeholder="Password must be at least 8 characters"
      />
    );
  },
  firstname: function FirstnameInput(
    rules: CustomRulesProps = {},
  ): React.ReactElement {
    return (
      <Input
        name="firstname"
        label="First Name"
        rules={{ required: 'Please enter your first name!', ...rules }}
        placeholder="First Name"
      />
    );
  },
  lastname: function LastnameInput(
    rules: CustomRulesProps = {},
  ): React.ReactElement {
    return (
      <Input
        name="lastname"
        label="Last Name"
        rules={{ required: 'Last name is required!', ...rules }}
        placeholder="Last Name"
      />
    );
  },
};
