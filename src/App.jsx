import React, { Fragment } from 'react';

import Container from '@material-ui/core/Container';

import AppNavigation from './components/AppNavigation';
import CardFeed from './components/CardFeed';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <Fragment>
      <AppNavigation />
      <Container maxWidth="xl">
        <CardFeed />
      </Container>
      <BackToTop />
    </Fragment>
  );
}

export default App;
