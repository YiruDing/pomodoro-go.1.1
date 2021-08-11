import axios from 'axios';
const playNext = async (props) => {
  const args = window.localStorage.getItem('spotify_access_token');
  await axios.post(
    'https://api.spotify.com/v1/me/player/next',
    {},
    {
      headers: {
        Authorization: `Bearer ${args}`,
      },
    }
  );
  props.getCurrPlayback(window.localStorage.getItem('spotify_access_token'));
  props.resetQueue();
};

export default playNext;
