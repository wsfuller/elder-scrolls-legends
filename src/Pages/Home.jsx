import React, { Fragment, useState } from 'react';

import Container from '@material-ui/core/Container';

import CardFeed from '../components/CardFeed';
import SearchInput from '../components/SearchInput';
import BackToTop from '../components/BackToTop';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const getSearchTerm = (retrievedSearchTerm) => {
    if (retrievedSearchTerm) {
      setSearchTerm(retrievedSearchTerm);
    }
  };

  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <Fragment>
      <Container maxWidth="xl">
        <SearchInput getSearchTerm={getSearchTerm} clearSearchTerm={clearSearchTerm} />
        <CardFeed searchTerm={searchTerm} />
      </Container>
      <BackToTop />
    </Fragment>
  );
}

export default Home;
