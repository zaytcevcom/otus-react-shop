import axios from 'axios';
const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');

  if (null !== token) {
    return 'Bearer ' + token;
  }

  return null;
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: getAuthorizationHeader(),
  },
});
