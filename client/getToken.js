import history from './history';

export default () => {
  const authToken = window.localStorage.getItem('token');
  if (!authToken) {
    return;
    const error = new Error('Unauthorized');
    throw error;
  }
  const payload = {
    headers: {
      authorization: authToken,
    },
  };
  return payload;
};
