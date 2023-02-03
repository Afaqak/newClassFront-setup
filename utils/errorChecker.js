import validator from 'validator';

const checkError = (userData, type = 'register') => {
  let error = {};

  if (type === 'login') {
    if (!userData.username) {
      error.username = 'Username is required';
    }
    if (!userData.password) {
      error.password = 'Password is required';
    }
    // if (userData.username !== "" && !validator.isEmail(userData.username)) {
    //   error.username = "Username must be a valid email";
    // }
    if (userData.password && userData.password.length < 6) {
      error.password = 'Password must be at least 6 characters';
    }
    return error;
  }

  if (userData.username === '') {
    error.username = 'Username is required';
  }
  if (userData.firstName === '') {
    error.firstName = 'First Name is required';
  }
  if (userData.lastName === '') {
    error.lastName = 'Last Name is required';
  }
  if (userData.password === '') {
    error.password = 'Password is required';
  }
  if (userData.batch === '') {
    error.batch = 'Batch is required';
  }
  if (userData.program === '') {
    error.program = 'Program is required';
  }
  if (userData.username !== '' && validator.isEmail(userData.username)) {
    error.username = "Username can't be an email";
  }
  if (userData.password !== '' && userData.password.length < 6) {
    error.password = 'Password must be at least 6 characters';
  }
  if (userData.program !== '' && !validator.isAlpha(userData.program)) {
    error.program = 'Program must be a string';
  }
  if (userData.group === '') {
    error.group = 'Group is required';
  }
  return error;
};

export default checkError;
