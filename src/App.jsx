import React, { Fragment, useState } from 'react';

import Button from '@material-ui/core/Button';

import Routes from './Pages/Routes';
import AppNavigation from './components/AppNavigation';

const INTIAL_USER = {
  username: '',
  id: '',
};

function App() {
  const [user, setUser] = useState(INTIAL_USER);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setIsUserAuthenticated(!isUserAuthenticated)}>Login User</Button>
      <AppNavigation user={user} isUserAuthenticated={isUserAuthenticated} />
      <Routes />
    </Fragment>
  );
}

export default App;
