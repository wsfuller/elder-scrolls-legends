/* eslint-disable no-underscore-dangle */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import debounce from 'lodash/debounce';

import { Error, Loading, NoResults, MaxResults } from '../GenericStates';
import CardFeedList from './List';

function CardFeedContainer({ searchTerm }) {
  console.log('CARD FEED CONTAINER SEARCH TERM: ', searchTerm);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needCards, setNeedCards] = useState(false);
  const [reachedCardsLimit, setReachedCardsLimit] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);

  // INITIAL EFFECT FOR CARDS
  // useEffect(() => {
  //   getCards();
  // }, []);

  useEffect(() => {
    const getCards = async () => {
      console.log('GET CARDS CARDS BREH 1: ', cards);
      const BASE_URL = `https://api.elderscrollslegends.io/v1/cards`;
      const MAX_RESULTS_TO_FETCH = 2;
      const requestParams = {
        ...(searchTerm && { name: encodeURI(searchTerm) }),
        pageSize: MAX_RESULTS_TO_FETCH,
        page: pageNumber,
      };

      setIsLoading(true);

      try {
        const response = await axios.get(BASE_URL, {
          params: requestParams,
        });

        console.log('API RESPONSE: ', response);

        setTotalPageCount(Math.ceil(response.data._totalCount / MAX_RESULTS_TO_FETCH));
        // debugger;
        setCards(response.data.cards);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`There was an error fetching cards ${err}`);
        setError(true);
      } finally {
        setIsLoading(false);
        setNeedCards(false);
        if (pageNumber > totalPageCount) {
          setReachedCardsLimit(true);
        }
      }
      console.log('GET CARDS CARDS BREH 2: ', cards);
      // console.log('SEARCH TERM: ', searchTerm);
    };

    setCards([]);
    setPageNumber(1);
    getCards();
  }, [searchTerm]);

  // useEffect(())

  // REACH BOTTOM OF PAGE EFFECT
  // useEffect(() => {
  //   console.log('BOTTOM OF PAGE EFFECT');
  //   if (needCards) {
  //     setPageNumber(pageNumber + 1);
  //     getCards();
  //   }
  // }, [needCards]);

  // SEARCH EFFECT
  // useEffect(() => {
  //   console.log('SEARCH EFFECT');
  //   setSearchQuery(searchTerm);
  //   setPageNumber(1);
  //   if (needCards) {
  //     getCards();
  //   }
  // }, [searchTerm]);

  // console.log('REACHED LIMIT BREH: ', reachedCardsLimit);
  // console.log('PAGE NUMBER STATE: ', pageNumber);
  // console.log('TOTAL PAGE COUNT: ', totalPageCount);

  window.onscroll = debounce(() => {
    const WINDOW_HEIGHT = window.innerHeight + document.documentElement.scrollTop;
    const DOCUMENT_HEIGHT = document.documentElement.offsetHeight;

    if (WINDOW_HEIGHT >= DOCUMENT_HEIGHT && !reachedCardsLimit) {
      setNeedCards(true);
    }
  }, 300);

  if (error) {
    return <Error message="We're sorry but something went wrong trying to fetch your cards" />;
  }
  if (!isLoading && cards.length === 0) {
    return <NoResults />;
  }
  return (
    <Fragment>
      <CardFeedList cards={cards} />
      {reachedCardsLimit && <MaxResults message="There are no more cards to show" />}
      {isLoading && <Loading />}
    </Fragment>
  );
}

CardFeedContainer.propTypes = {
  searchTerm: PropTypes.string,
  // resetSearch: PropTypes.bool.isRequired,
};

CardFeedContainer.defaultProps = {
  searchTerm: '',
};

export default CardFeedContainer;
