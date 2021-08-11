import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const allUsers = (await axios.get(`${process.env.API_URL}/api/users`))
        .data;
      dispatch(_getAllUsers(allUsers));
    } catch (err) {
      console.log(err);
    }
  };
};

const _getAllUsers = (allUsers) => {
  return {
    type: GET_ALL_USERS,
    allUsers,
  };
};

const allUsersReducer = (state = [], action) => {
  if (action.type === GET_ALL_USERS) {
    return (state = action.allUsers);
  }
  return state;
};

export default allUsersReducer;
