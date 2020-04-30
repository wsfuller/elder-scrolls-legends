import React, { Fragment } from 'react';

import Routes from './Pages/Routes';
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
