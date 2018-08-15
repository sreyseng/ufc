import { _save, _get } from '../utils/StorageAPI';
import { RECEIVE_DECKS, DECK_CREATED, CARD_ADDED } from './types';

export const getDecks = () => {
  return (dispatch) => {
    _get().then((data) => {
      dispatch({
        type: RECEIVE_DECKS,
        payload: JSON.parse(data)
      });
    });
  };
};

export const addDeck = (title, callback) => {
  if (!title) {
    console.warn('title required');
    return;
  }
  return (dispatch) => {
    _get().then((results) => {
      let data = JSON.parse(results);
      if (!data) {
        data = {};
      }

      const deck = {
        title,
        questions: []
      };

      data[title] = deck;

      return _save(JSON.stringify(data)).then(() => {
        dispatch({
          type: DECK_CREATED,
          payload: deck
        });
        callback();
      });
    });
  };
};

export const addCardToDeck = (title, card, callback) => {
  return (dispatch) => {
    _get().then((results) => {
      const data = JSON.parse(results);
      const deck = data[title];
      if (deck && deck.questions) {
        deck.questions.push(card);
        data[title] = deck;
      }

      _save(JSON.stringify(data)).then(() => {
        dispatch({
          type: CARD_ADDED,
          payload: {
            title,
            card
          }
        });
        callback();
      });
    });
  };
};

export const resetDecks = () => {
  return () => {
    _save(JSON.stringify({}));
  };
};
