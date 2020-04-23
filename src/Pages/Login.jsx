import React from 'react';

import Link from '@material-ui/core/Link';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link href="/create">Don&apos;t have an account? Let&apos;s create one!</Link>
    </div>
  );
}

export default Login;
