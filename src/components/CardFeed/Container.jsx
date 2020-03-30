import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

import { Error, Loading, NoResults } from '../GenericStates';
import CardFeedList from './List';

function CardFeedContainer() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [resultLimit, setResultLimit] = useState(false);
  const [url, setUrl] = useState('https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20');

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);

      setCards(cards.concat(response.data.cards));
      // eslint-disable-next-line no-underscore-dangle
      setUrl(response.data._links.next);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`There was an error fetching cards ${err}`);
      setError(true);
      // return <Error />
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  window.onscroll = debounce(() => {
    const WINDOW_HEIGHT = window.innerHeight + document.documentElement.scrollTop;
    const DOCUMENT_HEIGHT = document.documentElement.offsetHeight;

    if (WINDOW_HEIGHT >= DOCUMENT_HEIGHT) {
      fetchCards();
    }
  }, 300);

  return (
    <Fragment>
      {cards.length > 0 && <CardFeedList cards={cards} />}
      {loading && <Loading />}
    </Fragment>
  );
}

export default CardFeedContainer;
