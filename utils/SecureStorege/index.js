/* eslint-disable no-return-await */
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

const setTokenSecure = async (token) =>
  await setItemAsync('popitalkSecure', JSON.stringify(token));

const getToken = async () => JSON.parse(await getItemAsync('popitalkSecure'));

const deleteSecureToken = async () => await deleteItemAsync('popitalkSecure');

export { setTokenSecure, getToken, deleteSecureToken };
