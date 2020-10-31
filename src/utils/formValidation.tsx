import { SignupFormState } from '../api/auth';

export const validateSignup = (
  form: SignupFormState,
  setError: (err: string | null) => void,
): boolean => {
  // Check that all fields have content
  if (checkIfEmpty(form)) {
    setError('Fields cannot be empty!');
    return false;
  }
  // Check if passwords match
  if (form.password !== form.confirm) {
    setError('Passwords must match!');
    return false;
  }
  // Check if password passes validation
  if (validatePassword(form.password)) {
    setError(
      'Password must be between 8 and 32 characters and contain both letters and numbers.',
    );
    return false;
  }
  // Make sure age field is a number
  if (parseInt(form.ageStr) === NaN) {
    setError('Age must be a number.');
    return false;
  }
  // If everything passes, return true
  return true;
};

const checkIfEmpty = (form: SignupFormState): boolean => {
  if (
    Object.values(form).filter((val) => val.length <= 0).length >
    (parseInt(form.ageStr) < 13 ? 0 : 1)
  ) {
    return false;
  }
  return true;
};

const validatePassword = (pass: string): boolean => {
  const letterRegex = /[a-z]/gi;
  const nums = /[0-9]/g;
  if (
    !pass.match(letterRegex) ||
    !pass.match(nums) ||
    pass.length < 8 ||
    pass.length > 32
  ) {
    return false;
  } else {
    return true;
  }
};
