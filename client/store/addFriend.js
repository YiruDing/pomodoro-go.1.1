import customAxios from './customAxios';

const ADD_FRIEND = 'ADD_FRIEND';
const APPROVE_FRIEND = 'APPROVE_FRIEND';

const addFriend = (requesterId, requesteeId) => {
  return async (dispatch) => {
    try {
      const newRequest = (
        await customAxios.post(
          `friendship`,
          {
            requesterId: requesterId,
            requesteeId: requesteeId,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
      ).data;
      dispatch(_addFriend(newRequest));
    } catch (err) {
      console.log(err);
    }
  };
};

const _addFriend = (newRequest) => {
  return {
    type: ADD_FRIEND,
    newRequest,
  };
};

const approveFriend = (requesteeId, requesterId) => {
  return async (dispatch) => {
    try {
      const updateRequest = (
        await customAxios.put(
          `friendship`,
          {
            requesteeId: requesteeId,
            requesterId: requesterId,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
      ).data;
      dispatch(_approveFriend(updateRequest));
    } catch (err) {
      console.log(err);
    }
  };
};

const _approveFriend = (updateRequest) => {
  return {
    type: APPROVE_FRIEND,
    updateRequest,
  };
};

const newFriendRequestReducer = (state = {}, action) => {
  if (action.type === ADD_FRIEND) {
    return (state = action.newRequest);
  } else if (action.type === APPROVE_FRIEND) {
    return (state = action.updateRequest);
  }
  return state;
};

export { addFriend, approveFriend, newFriendRequestReducer };
