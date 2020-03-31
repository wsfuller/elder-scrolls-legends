import React, { Fragment, useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';

import AppNavigation from './components/AppNavigation';
import CardFeed from './components/CardFeed';
import BackToTop from './components/BackToTop';
import SearchInput from './components/SearchInput';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resetCardFeed, setResetCardFeed] = useState(false);

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm]);

  const getSearchTerm = (retrivedSearchTerm) => {
    if (retrivedSearchTerm) {
      setSearchTerm(retrivedSearchTerm);
    }
  };

  const resetSearch = () => {
    console.log('reseting all the things');
    // setSearchTerm('');
    // setResetSearch(true);
  };

  return (
    <Fragment>
      <AppNavigation />
      <Container maxWidth="xl">
        <SearchInput getSearchTerm={getSearchTerm} resetSearch={resetSearch} />
        <CardFeed searchTerm={searchTerm} />
      </Container>
      <BackToTop />
    </Fragment>
  );
}

export default App;
