import Cookies from 'js-cookie';

// let history = useHistory();

export const handleLogin = (token) => {
  return new Promise((resolve, reject) => {
    const tokenName = 'esl_token';

    Cookies.set(tokenName, token);

    if (Cookies.get(tokenName)) {
      resolve(true);
    } else {
      reject(Error('error setting cookie'));
    }
  });
};

// export const handleLogin = (token) => {
//   // SAVE TOKEN TO COOKIE

//   // REDIRECT USER TO PROFILE
//   history.push('/');
// };

export const handleLogout = () => {
  // REMOVE COOKIE TOKEN
  // REDIRECT USER TO LOGIN PAGE
  // window.localStorage.setItem('logout', Date.now());
};

export const redirectUser = (ctx, location) => {
  // if (ctx.req) {
  //   ctx.res.writeHead(302, { Location: location });
  //   ctx.res.end();
  // } else {
  //   Router.push(location);
  // }
};
