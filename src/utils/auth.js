const tokenName = 'esl_user_token';

export const handleAuthentication = () => {
  console.log('handle authentication');
};

export const handleLogin = (token) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem(tokenName, token);

    if (localStorage.getItem(tokenName)) {
      resolve(true);
    } else {
      reject(Error('error setting cookie'));
    }
  });
};

export const handleLogout = () => {
  localStorage.setItem('logout', Date.now());
  localStorage.removeItem(tokenName);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  return isEmailValid;
};
