import { _save, _get } from '../utils/StorageAPI';

export const RECEIVE_DECKS = 'receive_decks';
export const DECK_CREATED = 'deck_created';
export const RECEIVE_DECK = 'receive_deck';
export const CARD_ADDED = 'card_added';

export const getDecks = () => {
  return (dispatch) => {
    _get().then((data) => {
      dispatch({
        type: RECEIVE_DECKS,
        payload: data
      });
    });
  };
};

export const createNewDeck = (title) => {
  return (dispatch) => {
    _get().then((results) => {
      const data = JSON.parse(results);
      data[title] = {
        title,
        questions: []
      };

      _save(JSON.stringify(data)).then(() => {
        dispatch({
          type: DECK_CREATED,
          payload: title
        });
      });
    });
  };
};

export const getDeck = (id) => {
  return (dispatch) => {
    _get().then((results) => {
      const data = JSON.parse(results);
      dispatch({
        TYPE: RECEIVE_DECK,
        payload: data[id]
      });
    });
  };
};

export const addCardToDeck = (title, card) => {
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
      });
    });
  };
};
