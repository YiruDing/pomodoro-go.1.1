import axios from 'axios';
import history from '../history';
import socketIOClient from 'socket.io-client';
import { removeSession } from './sessions';
// comment
const ENDPOINT = process.env.API_URL;
export const socket = socketIOClient(ENDPOINT);

const TOKEN = 'token';
const SPOTIFY_ACCESS_TOKEN = 'spotify_access_token';
const SPOTIFY_REFRESH_TOKEN = 'spotify_refresh_token';
const NEW_SPOTIFY_DEVICE = 'new-spotify-device';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    console.log(process.env.API_URL);
    const res = await axios.get(`${process.env.API_URL}/auth/me`, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};
export const authenticateGoogle =
  (data = {}) =>
  async (dispatch) => {
    try {
      const response = await axios.post('/auth/google', data, {
        headers: { authorization: data.tokenId },
      });
      console.log(response.data);
      window.localStorage.setItem('token', response.data.token);
      dispatch(me());
    } catch (error) {
      console.log(error);
    }
  };

export const authenticate =
  (username, email, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.API_URL}/auth/${method}`,
        method === 'signup'
          ? { username, email, password }
          : { email, password }
      );
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const resetPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/forgotPassword`, {
      email,
    });
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('timerDone');
  window.localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
  window.localStorage.removeItem(SPOTIFY_REFRESH_TOKEN);
  window.localStorage.removeItem(NEW_SPOTIFY_DEVICE);

  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      if (action.auth.id) {
        socket.emit('login', { userId: action.auth.id });
      } else {
        socket.emit('logout', { userId: state.id });
      }
      return action.auth;
    default:
      return state;
  }
}
