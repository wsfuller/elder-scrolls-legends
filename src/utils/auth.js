const tokenName = 'esl_user_token';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
}

export function getUserCredentials() {
  const userToken = localStorage.getItem(tokenName);

  if (userToken) {
    return parseJwt(userToken);
  }
  return null;
}

export function handleLogin(token) {
  return new Promise((resolve, reject) => {
    localStorage.setItem(tokenName, token);
    const userToken = localStorage.getItem(tokenName);

    if (userToken) {
      resolve(parseJwt(userToken));
    } else {
      reject(Error('error setting token'));
    }
  });
}

export function handleLogout() {
  localStorage.setItem('logout', Date.now());
  localStorage.removeItem(tokenName);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  return isEmailValid;
}
