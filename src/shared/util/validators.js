const VALIDATOR_REQUIRE = () => ({
  type: 'REQUIRE'
});
const VALIDATOR_FILE = () => ({
  type: 'FILE'
});
const VALIDATOR_MINLENGTH = val => ({
  type: 'MINLENGTH',
  val: val
});
const VALIDATOR_MAXLENGTH = val => ({
  type: 'MAXLENGTH',
  val: val
});
const VALIDATOR_MIN = val => ({
  type: 'MIN',
  val: val
});
const VALIDATOR_MAX = val => ({
  type: 'MAX',
  val: val
});
const VALIDATOR_EMAIL = () => ({
  type: 'EMAIL'
});
const VALIDATOR_NUMBER = () => ({
  type: 'NUMBER'
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === 'REQUIRE') {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === 'FILE') {
      isValid = isValid && value && value.size > 0;
    }
    if (validator.type === 'MINLENGTH') {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === 'MAXLENGTH') {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === 'MIN') {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === 'MAX') {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === 'EMAIL') {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === 'NUMBER') {
      isValid = isValid && /^\d+$/.test(value);
    }
  }
  return isValid;
};

export {
  VALIDATOR_REQUIRE,
  VALIDATOR_FILE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMBER
};

