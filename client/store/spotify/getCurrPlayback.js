import axios from 'axios';

const GET_CURRPLAYBACK = 'GET_CURRPLAYBACK';

//get current playback
export const getCurrPlayback = (accessToken) => {
  // console.log('access token', accessToken);
  return async (dispatch) => {
    try {
      const params = 'market=from_token';
      let response = await axios.get(
        `https://api.spotify.com/v1/me/player?${params}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        const currPlayback = response.data;
        dispatch(_getCurrPlayback(currPlayback));
      } else if (response.status === 401) {
        window.localStorage.removeItem('spotify_access_token');
        window.localStorage.removeItem('spotify_refresh_token');
        window.localStorage.removeItem('new-spotify-device');
        history.push('/home');
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const _getCurrPlayback = (currPlayback) => {
  return {
    type: GET_CURRPLAYBACK,
    currPlayback,
  };
};

const currPlaybackReducer = (state = {}, action) => {
  if (action.type === GET_CURRPLAYBACK) {
    return (state = action.currPlayback);
  }
  return state;
};

export default currPlaybackReducer;
