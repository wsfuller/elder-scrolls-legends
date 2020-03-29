import React, { Fragment } from 'react';

import Container from '@material-ui/core/Container';

import AppNavigation from './components/AppNavigation';
import CardFeed from './components/CardFeed';

function App() {
  return (
    <Fragment>
      <AppNavigation />
      <Container maxWidth="xl">
        <CardFeed />
      </Container>
    </Fragment>
  );
}

export default App;
