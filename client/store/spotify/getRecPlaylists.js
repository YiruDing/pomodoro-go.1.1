import axios from 'axios';

const GET_REC_PLAYLISTS = 'GET_REC_PLAYLISTS';

//get recommended playlists
export const getRecPlaylists = (accessToken) => {
  return async (dispatch) => {
    try {
      let recPlaylists = (
        await axios.get(
          'https://api.spotify.com/v1/browse/categories/focus/playlists?country=US',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
      ).data;
      dispatch(_getRecPlaylists(recPlaylists));
    } catch (err) {
      console.log(err);
    }
  };
};

const _getRecPlaylists = (recPlaylists) => {
  return {
    type: GET_REC_PLAYLISTS,
    recPlaylists,
  };
};

const recPlaylistsReducer = (state = {}, action) => {
  if (action.type === GET_REC_PLAYLISTS) {
    return (state = action.recPlaylists);
  }
  return state;
};

export default recPlaylistsReducer;
