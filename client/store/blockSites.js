import customAxios from './customAxios';
const GET_SITES = 'GET_SITES';
const ADD_SITE = 'ADD_SITE';
const DELETE_SITE = 'DELETE_SITE';
//get sites
export const getSites = (userId) => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('token')) {
        const currentUser = (
          await customAxios.get(`users/${userId}`, {
            headers: { authorization: localStorage.getItem('token') },
          })
        ).data;
        const blockedSites = currentUser.sites;
        dispatch(_getSites(blockedSites));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const _getSites = (blockedSites) => {
  return {
    type: GET_SITES,
    blockedSites,
  };
};

//add new site
export const addSite = (site, userId) => {
  return async (dispatch) => {
    try {
      const newSite = (
        await customAxios.post(
          `sites`,
          {
            ...site,
            userId: userId,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
      ).data;
      dispatch(getSites(userId));
    } catch (err) {
      console.log(err);
    }
  };
};

//delete a site from a user
export const deleteSite = (userId, siteId) => {
  console.log('userId', userId, 'siteId', siteId);
  return async (dispatch) => {
    try {
      await customAxios.delete(`sites/${userId}/${siteId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      dispatch(getSites(userId));
    } catch (err) {
      console.log(err);
    }
  };
};

//update whether a site is de-blocked for the user temporarily
export const updateBlocking = (userId, siteId) => {
  return async (dispatch) => {
    try {
      await customAxios.put(`blackList/${userId}/${siteId}`);
      dispatch(getSites(userId));
    } catch (err) {
      console.log(err);
    }
  };
};

const blockedSitesReducer = (state = [], action) => {
  if (action.type === GET_SITES) {
    return (state = action.blockedSites);
  }
  return state;
};

export default blockedSitesReducer;
