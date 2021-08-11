import axios from 'axios';

const GET_CURRPLAYLIST = 'GET_CURRPLAYLIST';
const RESET_CURRPLAYLIST = 'RESET_CURRPLAYLIST';

//get playlists
export const getCurrPlaylist = (playlistId, accessToken) => {
  return async(dispatch) => {
    try {
      let currPlaylist = (
        await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      ).data;
      dispatch(_getCurrPlaylist(currPlaylist));
    } catch(err) {
      console.log(err);
    }
  };
};

const _getCurrPlaylist = (currPlaylist) => {
  return {
    type: GET_CURRPLAYLIST,
    currPlaylist
  };
};

export const resetCurrPlaylist = (currPlaylist={}) => {
  return {
    type: RESET_CURRPLAYLIST,
    currPlaylist
  };
};

const currPlaylistReducer = (state = {}, action) => {
  if (action.type === GET_CURRPLAYLIST) {
    return (state = action.currPlaylist);
  } else if (action.type === RESET_CURRPLAYLIST) {
    return (state = action.currPlaylist);
  }
  return state;
};

export default currPlaylistReducer;
