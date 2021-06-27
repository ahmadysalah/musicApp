import axios from 'axios';
import { getToken, deleteSecureToken } from '../SecureStorege';
import { DeleteStore } from '../AsyncStorage';

// use axios like function with call back or promise
// Axios('/xxxx',{},post or get)

const refRefreshToken = async (route, body, method) => {
  await deleteSecureToken();
  await DeleteStore();
  throw Error('notAuthorize');
};

const apiUrl = 'http://api.popitalk.com/';
const Axios = async (route, body, method) => {
  const errHandle = (error) => {
    const {
      data: { statusCode },
    } = error.response;
    if (statusCode === 401) {
      return refRefreshToken(route, body, method);
    }
    throw error;
  };

  const Cookie = await getToken();
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',

    ...(Cookie && { Cookie }),
  };
  if (method === undefined) {
    return axios
      .get(apiUrl.concat(route), {
        headers,
      })
      .then((res) => res)
      .catch(errHandle);
  }

  if (method === 'delete') {
    return axios
      .delete(apiUrl.concat(route), {
        headers,
        data: { ...body },
      })
      .then((res) => res)
      .catch(errHandle);
  }

  return axios[method](apiUrl.concat(route), body, { headers })
    .then((res) => res)
    .catch(errHandle);
};

export default Axios;
