import axios from 'axios';
const LOAD_BLOCKS = 'LOAD_BLOCKS';
const loadBlocksActionCreator = (blocks) => {
  return {
    type: LOAD_BLOCKS,
    blocks,
  };
};

const loadBlocks = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/blocks`);
      const blocks = response.data;
      dispatch(loadBlocksActionCreator(blocks));
    } catch (error) {
      console.log('error in loadBlocks thunk');
      console.log(error);
    }
  };
};

//CREATE BLOCK

const CREATE_BLOCK= 'CREATE_BLOCK';

const createBlockActionCreator = (block) => {
  return {
    type: CREATE_BLOCK,
    block,
  };
};
const createBlock = (userId, siteId) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/api/blocks`, {
      userId,
      siteId,
    });
    const { data } = response;
    dispatch(createBlockActionCreator(data));
  } catch (error) {
    console.log('error in createBlock thunk');
    console.log(error);
  }
};

const blocksReducer = (state = [], action) => {
  if (action.type === LOAD_BLOCKS) {
    state = action.blocks;
  }
  if (action.type === CREATE_BLOCK) {
    state = [...state, action.block];
  }
  return state;
};

export { loadBlocks, createBlock, blocksReducer };
