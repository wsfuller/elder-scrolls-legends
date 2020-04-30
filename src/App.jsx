import React, { Fragment, useState } from 'react';

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
      <AppNavigation user={user} isUserAuthenticated={isUserAuthenticated} />
      <Routes isUserAuthenticated={isUserAuthenticated} />
    </Fragment>
  );
}

export default App;
