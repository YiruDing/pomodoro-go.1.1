import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import { sessionsReducer, currentSessionReducer } from './sessions';
import { sitesReducer } from './sites';
import { blackListReducer } from './blackList';
import { blocksReducer } from './blocks';
import blockedSitesReducer from './blockSites';
import playlistsReducer from './spotify/getPlaylists';
import currPlaylistReducer from './spotify/getCurrPlaylist';
import currPlaybackReducer from './spotify/getCurrPlayback';
import devicesReducer from './spotify/getDevices';
import recPlaylistsReducer from './spotify/getRecPlaylists';
import addToQueueReducer from './spotify/addToQueue';
import recentTrackReducer from './spotify/getRecentTrack';
import { myRequestReducer, requestToMeReducer } from './getFriends';
import allUsersReducer from './getAllUsers';
import { newFriendRequestReducer } from './addFriend';

const reducer = combineReducers({
  auth,
  blockedSites: blockedSitesReducer,
  sessions: sessionsReducer,
  sites: sitesReducer,
  blackList: blackListReducer,
  blocks: blocksReducer,
  currentSession: currentSessionReducer,
  allPlaylists: playlistsReducer,
  currPlaylist: currPlaylistReducer,
  recPlaylists: recPlaylistsReducer,
  currPlayback: currPlaybackReducer,
  newlyAddedTrack: addToQueueReducer,
  devices: devicesReducer,
  recentTrack: recentTrackReducer,
  myRequests: myRequestReducer,
  requestsToMe: requestToMeReducer,
  allUsers: allUsersReducer,
  newFriendRequest: newFriendRequestReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
