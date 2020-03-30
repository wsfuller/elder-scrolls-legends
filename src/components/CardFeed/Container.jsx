import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

import { Error, Loading, NoResults, MaxResults } from '../GenericStates';
import CardFeedList from './List';

function CardFeedContainer() {
  const MAX_RESULTS_TO_FETCH = 20;
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needCards, setNeedCards] = useState(true);
  const [reachedCardsLimit, setReachedCardsLimit] = useState(false);
  const [url, setUrl] = useState(
    `https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=${MAX_RESULTS_TO_FETCH}`
  );

  useEffect(() => {
    const getCards = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        // eslint-disable-next-line no-underscore-dangle
        const nextUrlToFetch = response.data._links.next;

        setCards([...cards, ...response.data.cards]);

        if (nextUrlToFetch) {
          setUrl(nextUrlToFetch);
        } else {
          setReachedCardsLimit(true);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`There was an error fetching cards ${err}`);
        setError(true);
      } finally {
        setIsLoading(false);
        setNeedCards(false);
      }
    };

    if (needCards) {
      getCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needCards]);

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

export default CardFeedContainer;
