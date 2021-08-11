import axios from 'axios';
const LOAD_SITES = 'LOAD_SITES';
const loadSitesActionCreator = (sites) => {
  return {
    type: LOAD_SITES,
    sites,
  };
};

const loadSites = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/sites`);
      const sites = response.data;
      dispatch(loadSitesActionCreator(sites));
    } catch (error) {
      console.log('error in loadSites thunk');
      console.log(error);
    }
  };
};

const UPDATE_SITE = 'UPDATE_SITE';

const updateSiteActionCreator = (site) => {
  return {
    type: UPDATE_SITE,
    site,
  };
};

const updateSite = (siteId, siteInfo) => {
  return async (dispatch) => {
    const response = await axios.put(
      `${process.env.API_URL}/api/sites/${siteId}`,
      siteInfo
    );

    const { data } = response;
    dispatch(updateSiteActionCreator(data));
  };
};

const sitesReducer = (state = [], action) => {
  if (action.type === LOAD_SITES) {
    state = action.sites;
  }
  if (action.type === UPDATE_SITE) {
    const sites = state.map((site) => {
      if (site.id === action.site.id) {
        return action.site;
      }
      return site;
    });
    state = sites;
  }
  return state;
};

export { loadSites, updateSite, sitesReducer };
