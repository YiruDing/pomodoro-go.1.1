import axios from 'axios';

const GET_DEVICES = 'GET_DEVICES';

//get playlists
export const getDevices = (accessToken) => {
  return async(dispatch) => {
    try {
      let response = (
        await axios.get('https://api.spotify.com/v1/me/player/devices', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      );
      if (response.status === 200) {
        const devices = response.data;
        dispatch(_getDevices(devices));
      } else {
        window.localStorage.removeItem('spotify_access_token');
        window.localStorage.removeItem('spotify_refresh_token');
        window.localStorage.removeItem('new-spotify-device');
        history.push('/home');
      }
    } catch(err) {
      console.log(err);
    }
  };
};

const _getDevices = (devices) => {
  return {
    type: GET_DEVICES,
    devices
  };
};

const devicesReducer = (state = {}, action) => {
  if (action.type === GET_DEVICES) {
    return (state = action.devices);
  }
  return state;
};

export default devicesReducer;
