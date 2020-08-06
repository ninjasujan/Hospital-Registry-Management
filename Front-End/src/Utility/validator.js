export const nameValidate = (name) => {
  if (!name) return false;
  return name.length > 2 ? true : false;
};

export const emailValidate = (email) => {
  const patt = /[^@]+@[^.]+..+/;
  return patt.test(email);
};

export const passwordValidate = (password) => {
  return password.length >= 7;
};

export const reTypeValidate = (password, confirmPass) => {
  return password === confirmPass;
};

export const contactValidate = (number) => {
  return number.length === 10;
};

export const rangeValidate = (value) => {
  if (value <= 0 || value > 90) return false;
  return true;
};

export const timingsValidation = (timing) => {
  if (timing.length > 3 || timing.length <= 0) return false;
  if (timing[0] === 0 && timing[1] === 0 && timing[2] === 0) return false;
  return true;
};
