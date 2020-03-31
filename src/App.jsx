import React, { Fragment, useState } from 'react';

import Container from '@material-ui/core/Container';

import AppNavigation from './components/AppNavigation';
import CardFeed from './components/CardFeed';
import BackToTop from './components/BackToTop';
import SearchInput from './components/SearchInput';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const getSearchTerm = (retrivedSearchTerm) => {
    if (retrivedSearchTerm) {
      setSearchTerm(retrivedSearchTerm);
    }
  };

  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <Fragment>
      <AppNavigation />
      <Container maxWidth="xl">
        <SearchInput getSearchTerm={getSearchTerm} clearSearchTerm={clearSearchTerm} />
        <CardFeed searchTerm={searchTerm} />
      </Container>
      <BackToTop />
    </Fragment>
  );
}

export default App;
