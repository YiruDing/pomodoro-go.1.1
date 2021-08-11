import axios from 'axios';

const GET_PLAYLISTS = 'GET_PLAYLISTS';

//get playlists
export const getPlaylists = (accessToken) => {
  return async(dispatch) => {
    try {
      let playlists = (
        await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      ).data;
      dispatch(_getPlaylists(playlists));
    } catch(err) {
      console.log(err);
    }
  };
};

const _getPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    playlists
  };
};

const playlistsReducer = (state = {}, action) => {
  if (action.type === GET_PLAYLISTS) {
    return (state = action.playlists);
  }
  return state;
};

export default playlistsReducer;
