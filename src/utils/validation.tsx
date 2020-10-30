export const validatePassword = (pass: string): boolean => {
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
