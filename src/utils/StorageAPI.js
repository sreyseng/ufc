import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'f5b54e62';

export function _get() {
  return AsyncStorage.getItem(STORAGE_KEY);
}

export function _save(data) {
  return AsyncStorage.setItem(STORAGE_KEY, data);
}
