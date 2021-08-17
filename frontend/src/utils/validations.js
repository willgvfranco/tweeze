export const emailValidation = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return regex.test(email);
};
