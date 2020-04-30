import React, { Fragment, useContext, useEffect } from 'react';

import Routes from './Pages/Routes';
// import { UserContext } from './Context/UserContext';
import AppNavigation from './components/AppNavigation';

function App() {
  return (
    <Fragment>
      <AppNavigation />
      <Routes />
    </Fragment>
  );
}

export default App;
