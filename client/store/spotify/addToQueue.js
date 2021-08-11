import axios from 'axios';

const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
const RESET_QUEUE = 'RESET_QUEUE';

//add a track to queue
export const addToQueue = (accessToken, trackUri) => {
  return async (dispatch) => {
    try {
      let newlyAdded = await axios.post(
        `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('what is the newly added track?', newlyAdded);
      if (newlyAdded.status === 204) {
        dispatch(_addToQueue('Track added to queue'));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const _addToQueue = (successMessage) => {
  return {
    type: ADD_TO_QUEUE,
    successMessage,
  };
};

export const resetQueue = () => {
  return {
    type: RESET_QUEUE,
    resetMessage: '',
  };
};

const addToQueueReducer = (state = '', action) => {
  if (action.type === ADD_TO_QUEUE) {
    return (state = action.successMessage);
  } else if (action.type === RESET_QUEUE) {
    return (state = action.resetMessage);
  }
  return state;
};

export default addToQueueReducer;
