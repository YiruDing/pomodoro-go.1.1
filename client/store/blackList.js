import axios from 'axios';
import customAxios from './customAxios';
const LOAD_BLACKLIST = 'LOAD_BLACKLIST';
const loadBlackListActionCreator = (blackList) => {
  return {
    type: LOAD_BLACKLIST,
    blackList,
  };
};

const loadBlackList = () => {
  return async (dispatch) => {
    try {
      const response = await customAxios.get(`blackList`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const blackList = response.data;
      dispatch(loadBlackListActionCreator(blackList));
    } catch (error) {
      console.log('error in loadBlackList thunk');
      console.log(error);
    }
  };
};

const UPDATE_BLACKLIST = 'UPDATE_BLACKLIST';

const updateBlackListActionCreator = (blackList) => {
  return {
    type: UPDATE_BLACKLIST,
    blackList,
  };
};

const updateBlackList = (blackListId, blackListInfo) => {
  console.log('blackListInfo:', blackListInfo);
  return async (dispatch) => {
    const response = await customAxios.put(
      `blackList/${blackListId}`,
      blackListInfo,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    const { data } = response;
    dispatch(updateBlackListActionCreator(data));
  };
};

const blackListReducer = (state = [], action) => {
  if (action.type === LOAD_BLACKLIST) {
    state = action.blackList;
  }
  if (action.type === UPDATE_BLACKLIST) {
    const blackLists = state.map((blackList) => {
      if (blackList.id === action.blackList.id) {
        return action.blackList;
      }
      return blackList;
    });
    state = blackLists;
  }
  return state;
};

export { loadBlackList, updateBlackList, blackListReducer };
