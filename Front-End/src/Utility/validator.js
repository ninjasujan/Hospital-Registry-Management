export const nameValidate = (name) => {
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
