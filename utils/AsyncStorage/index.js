/* eslint-disable no-return-await */
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStore = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

const GetFromStore = async (key = 'userData') =>
  JSON.parse(await AsyncStorage.getItem(key));

const DeleteStore = async (key = 'userData') =>
  await AsyncStorage.removeItem(key);

export { AsyncStore, GetFromStore, DeleteStore };
