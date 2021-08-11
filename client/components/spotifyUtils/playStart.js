import axios from 'axios';
const playStart = async (props) => {
  try {
    const args = window.localStorage.getItem('spotify_access_token');
    if (props.currPlayback.is_playing === true) {
      await axios.put(
        'https://api.spotify.com/v1/me/player/pause',
        {},
        {
          headers: {
            Authorization: `Bearer ${args}`,
          },
        }
      );
      props.getCurrPlayback(
        window.localStorage.getItem('spotify_access_token')
      );
    } else {
      await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        {},
        {
          headers: {
            Authorization: `Bearer ${args}`,
          },
        }
      );
      props.getCurrPlayback(
        window.localStorage.getItem('spotify_access_token')
      );
    }
    // console.log('play! updated playback: ', props.currPlayback);
  } catch (error) {
    console.log('issue with playing/pausing spotify');
    console.log(error);
  }
};

export default playStart;
