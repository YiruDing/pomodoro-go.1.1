import axios from 'axios';

const GET_RECENT_PLAYED = 'GET_RECENT_PLAYED';

//get recommended playlists
export const getRecentTrack = (accessToken) => {
  return async (dispatch) => {
    try {
      let recentTrack = (
        await axios.get(
          'https://api.spotify.com/v1/me/player/recently-played',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
      ).data;
      dispatch(_getRecentTrack(recentTrack));
    } catch (err) {
      console.log(err);
    }
  };
};

const _getRecentTrack = (recentTrack) => {
  return {
    type: GET_RECENT_PLAYED,
    recentTrack,
  };
};

const recentTrackReducer = (state = {}, action) => {
  if (action.type === GET_RECENT_PLAYED) {
    return (state = action.recentTrack);
  }
  return state;
};

export default recentTrackReducer;
