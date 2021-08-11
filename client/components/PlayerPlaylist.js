import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { getPlaylists } from '../store/spotify/getPlaylists';
import {
  getCurrPlaylist,
  resetCurrPlaylist,
} from '../store/spotify/getCurrPlaylist';
import { getRecPlaylists } from '../store/spotify/getRecPlaylists';
import { addToQueue } from '../store/spotify/addToQueue';

const useStyles = makeStyles((theme) => ({
  playLists: {
    width: '100%',
    maxWidth: 400,
    height: 250,
    overflow: 'scroll',
  },
  playlist: {
    borderBottom: '1px solid #545764',
  },
}));

const PlayerPlaylist = (props) => {
  const classes = useStyles();
  const accessToken = window.localStorage.getItem('spotify_access_token');

  const [open, setOpen] = useState({
    'my-playlist': false,
    'rec-playlist': false,
  });

  const handleClick = (target) => {
    setOpen({
      ...open,
      [target]: !open[target],
    });
  };
  let tracks = props.currPlaylist.items;

  useEffect(() => {
    props.getPlaylists(accessToken);
    props.getRecPlaylists(accessToken);
  }, []);

  return (
    <div id="all-playlists">
      {props.currPlaylist.items && props.currPlaylist.items.length > 0 ? (
        <List
          subheader={<ListSubheader>Tracks</ListSubheader>}
          className={classes.playLists}
        >
          <ListItem className={classes.playlist}>
            <ListItemText id="go-back" primary="Go back" />
            <ListItemSecondaryAction>
              <KeyboardReturnIcon onClick={() => props.resetCurrPlaylist()} />
            </ListItemSecondaryAction>
          </ListItem>
          {tracks.map((each) => {
            return (
              <ListItem key={each.id} className={classes.playlist}>
                <ListItemText id="track-name" primary={each.track.name} />
                <ListItemSecondaryAction>
                  <Tooltip title="Add this track to queue" placement="top">
                    <AddIcon
                      onClick={() =>
                        props.addToQueue(accessToken, each.track.uri)
                      }
                    />
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <>
          {props.allPlaylists !== undefined &&
          props.recPlaylists !== undefined ? (
            <List
              subheader={<ListSubheader>Playlists</ListSubheader>}
              className={classes.playLists}
            >
              <ListItem button onClick={() => handleClick('my-playlist')}>
                <ListItemText primary="My playlists" />
                {open['my-playlist'] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open['my-playlist']} timeout="auto" unmountOnExit>
                {props.allPlaylists.items &&
                  props.allPlaylists.items.length > 0 &&
                  props.allPlaylists.items.map((each) => {
                    return (
                      <ListItem key={each.id} className={classes.playlist}>
                        <ListItemText id="playlist-name" primary={each.name} />
                        <ListItemSecondaryAction>
                          <PlaylistPlayIcon
                            onClick={() =>
                              props.getCurrPlaylist(
                                each.id,
                                window.localStorage.getItem(
                                  'spotify_access_token'
                                )
                              )
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
              </Collapse>
              <ListItem button onClick={() => handleClick('rec-playlist')}>
                <ListItemText primary="🌟 Our recommendation" />
                {open['rec-playlist'] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open['rec-playlist']} timeout="auto" unmountOnExit>
                {props.recPlaylists.items.length > 0 &&
                  props.recPlaylists.items.map((each) => {
                    return (
                      <ListItem key={each.id} className={classes.playlist}>
                        <ListItemText id="playlist-name" primary={each.name} />
                        <ListItemSecondaryAction>
                          <PlaylistPlayIcon
                            onClick={() =>
                              props.getCurrPlaylist(
                                each.id,
                                window.localStorage.getItem(
                                  'spotify_access_token'
                                )
                              )
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
              </Collapse>
            </List>
          ) : (
            <div>Cannot load playlists info</div>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allPlaylists: state.allPlaylists,
    currPlaylist: state.currPlaylist,
    recPlaylists: state.recPlaylists.playlists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaylists: (accessToken) => {
      return dispatch(getPlaylists(accessToken));
    },
    getCurrPlaylist: (playlistId, accessToken) => {
      return dispatch(getCurrPlaylist(playlistId, accessToken));
    },
    resetCurrPlaylist: () => {
      return dispatch(resetCurrPlaylist());
    },
    getRecPlaylists: (accessToken) => {
      return dispatch(getRecPlaylists(accessToken));
    },
    addToQueue: (accessToken, trackUri) => {
      return dispatch(addToQueue(accessToken, trackUri));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPlaylist);
