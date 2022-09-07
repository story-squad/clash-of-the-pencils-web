import './styles/index.scss';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: unknown) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="First name"
        {...register('First name', { required: true, maxLength: 80 })}
      />
      <input
        type="text"
        placeholder="Last name"
        {...register('Last name', { required: true, maxLength: 100 })}
      />
      <input
        type="text"
        placeholder="Codename"
        {...register('Codename', {
          required: true,
          maxLength: 15,
          pattern: /[^a-zA-Z0-9]/,
        })}
      />
      <input
        type="datetime"
        placeholder="Birthday"
        {...register('Birthday', { required: true })}
      />
      <input
        type="email"
        placeholder="Parent Email"
        {...register('Parent Email', { required: true })}
      />
      <input
        type="checkbox"
        placeholder="Terms of Service"
        {...register('Terms of Service', { required: true })}
      />

      <input type="submit" />
    </form>
  );
};

export default SignupForm;
