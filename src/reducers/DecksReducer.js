import {
  RECEIVE_DECK,
  RECEIVE_DECKS,
  DECK_CREATED,
  CARD_ADDED
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.payload;
    case DECK_CREATED:
      return { ...state, [action.payload.title]: action.payload };
    case CARD_ADDED: {
      const deck = state[action.payload.title];
      deck.questions.push(action.payload.card);
      return { ...state, [action.payload.title]: deck };
    }
    default:
      return state;
  }
};
