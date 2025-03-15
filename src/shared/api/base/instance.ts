import axios from 'axios';
const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');

  if (null !== token) {
    return 'Bearer ' + token;
  }

  return null;
};

export const instance = axios.create({
  baseURL: 'http://19429ba06ff2.vps.myjino.ru/api',
  headers: {
    Authorization: getAuthorizationHeader(),
  },
});
