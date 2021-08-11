import axios from 'axios';

const GET_MY_REQUEST_TO_OTHERS = 'GET_MY_REQUEST_TO_OTHERS';
const GET_REQUEST_TO_ME = 'GET_REQUEST_TO_ME';

const getMyRequestToOthers = (userId) => {
  return async (dispatch) => {
    try {
      const currentUser = (
        await axios.get(`${process.env.API_URL}/api/users/${userId}`)
      ).data;
      const myRequests = currentUser.requester; //get where current user is the requester of friends requests
      dispatch(_getMyRequestToOthers(myRequests));
    } catch (err) {
      console.log(err);
    }
  };
};

const _getMyRequestToOthers = (myRequests) => {
  return {
    type: GET_MY_REQUEST_TO_OTHERS,
    myRequests,
  };
};

const getRequestsToMe = (userId) => {
  return async (dispatch) => {
    try {
      const currentUser = (
        await axios.get(`${process.env.API_URL}/api/users/${userId}`)
      ).data;
      const requestsToMe = currentUser.requestee; //get where current user is the requester of friends requests
      dispatch(_getRequestsToMe(requestsToMe));
    } catch (err) {
      console.log(err);
    }
  };
};

const _getRequestsToMe = (requestsToMe) => {
  return {
    type: GET_REQUEST_TO_ME,
    requestsToMe,
  };
};

const myRequestReducer = (state = [], action) => {
  if (action.type === GET_MY_REQUEST_TO_OTHERS) {
    return (state = action.myRequests);
  }
  return state;
};

const requestToMeReducer = (state = [], action) => {
  if (action.type === GET_REQUEST_TO_ME) {
    return (state = action.requestsToMe);
  }
  return state;
};

export {
  getMyRequestToOthers,
  myRequestReducer,
  getRequestsToMe,
  requestToMeReducer,
};
