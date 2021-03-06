/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import debounce from 'lodash/debounce';

import { Error, Loading, NoResults, MaxResults } from '../GenericStates';
import CardFeedList from './List';
import CardDetails from './CardDetails';

function CardFeedContainer({ searchTerm }) {
  const localStoreName = 'eslFavCards';
  let localFavCards = localStorage.getItem(localStoreName);

  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needCards, setNeedCards] = useState(true);
  const [reachedCardsLimit, setReachedCardsLimit] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const [selectedCardDetails, setSelectedCardDetails] = useState({});

  useEffect(() => {
    const getCards = async () => {
      const BASE_URL = `https://api.elderscrollslegends.io/v1/cards`;
      const MAX_RESULTS_TO_FETCH = 20;
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

        const responseCards = response.data.cards;

        responseCards.forEach((card) => {
          const cardRef = card;
          cardRef.favorited = false;
        });

        if (localFavCards) {
          const favCardsArray = localStorage.getItem(localStoreName).split(',');

          responseCards.forEach((card) => {
            const cardRef = card;
            if (favCardsArray.includes(card.id)) {
              cardRef.favorited = true;
            }
            return cardRef;
          });
        }

        setTotalPageCount(Math.ceil(response.data._totalCount / MAX_RESULTS_TO_FETCH));
        setCards([...cards, ...responseCards]);
        setPageNumber(pageNumber + 1);
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
  }, [needCards, searchTerm]);

  useEffect(() => {
    const resultsLimit = pageNumber > totalPageCount;
    setReachedCardsLimit(resultsLimit);
  }, [pageNumber]);

  useEffect(() => {
    setIsLoading(true);
    setPageNumber(1);
    setCards([]);
    setNeedCards(true);
  }, [searchTerm]);

  window.onscroll = debounce(() => {
    const WINDOW_HEIGHT = window.innerHeight + document.documentElement.scrollTop;
    const DOCUMENT_HEIGHT = document.documentElement.offsetHeight;
    if (WINDOW_HEIGHT >= DOCUMENT_HEIGHT && !reachedCardsLimit) {
      setNeedCards(true);
    }
  }, 300);

  const handleOpenCardDetails = (cardDetails) => {
    setSelectedCardDetails(cardDetails);
    setIsCardDetailsOpen(true);
  };

  const handleCloseCardDetails = () => {
    setSelectedCardDetails({});
    setIsCardDetailsOpen(false);
  };

  const favoriteCardToggle = (cardId) => {
    const cardToUpdate = cards.find((card) => card.id === cardId);

    if (localFavCards) {
      const favCardsArray = localFavCards.split(',');
      if (favCardsArray.includes(cardId)) {
        const filterCardsArray = favCardsArray.filter((card) => card !== cardId);

        localStorage.setItem(localStoreName, filterCardsArray.toString());
      } else {
        localStorage.setItem(localStoreName, (localFavCards += `,${cardId}`));
      }
    } else {
      localStorage.setItem(localStoreName, cardId);
    }

    cardToUpdate.favorited = !cardToUpdate.favorited;
    setCards([...cards]);
  };

  if (error) {
    return <Error message="We're sorry but something went wrong trying to fetch your cards" />;
  }
  if (!isLoading && cards.length === 0) {
    return <NoResults />;
  }
  return (
    <Fragment>
      <CardFeedList
        cards={cards}
        openCardDetails={handleOpenCardDetails}
        favoriteCardToggle={favoriteCardToggle}
      />
      {reachedCardsLimit && <MaxResults message="There are no more cards to show" />}
      {isLoading && <Loading />}
      {isCardDetailsOpen && (
        <CardDetails
          cardDetails={selectedCardDetails}
          isCardDetailsOpen={isCardDetailsOpen}
          closeCardDetails={handleCloseCardDetails}
        />
      )}
    </Fragment>
  );
}

CardFeedContainer.propTypes = {
  searchTerm: PropTypes.string,
};

CardFeedContainer.defaultProps = {
  searchTerm: '',
};

export default CardFeedContainer;
