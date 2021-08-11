import axios from 'axios';
const playPrevious = async (props) => {
  const args = window.localStorage.getItem('spotify_access_token');
  await axios.post(
    'https://api.spotify.com/v1/me/player/previous',
    {},
    {
      headers: {
        Authorization: `Bearer ${args}`,
      },
    }
  );
  props.getCurrPlayback(window.localStorage.getItem('spotify_access_token'));
};

export default playPrevious;
