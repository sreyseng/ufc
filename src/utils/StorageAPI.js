import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'f5b54e62';

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    return JSON.parse(results);
  });
}

export function getDeck(id) {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    return data[id];
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title] = {
        title,
        questions: []
      };
      return data;
    })
    .then((data) => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)));
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      const deck = data[title];
      if (deck && deck.questions) {
        deck.questions.push(card);
        data[title] = deck;
      }
      return data;
    })
    .then((data) => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)));
}
