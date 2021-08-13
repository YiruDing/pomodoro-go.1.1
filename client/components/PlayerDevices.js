import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import Tooltip from '@material-ui/core/Tooltip';

import { getDevices } from '../store/spotify/getDevices';
import { getCurrPlayback } from '../store/spotify/getCurrPlayback';

const useStyles = makeStyles((theme) => ({
  deviceList: {
    width: '100%',
  },
  deviceItem: {
    borderBottom: '1px solid #545764',
  },
}));

const PlayerDevices = (props) => {
  const classes = useStyles();

  // const [devices, setDevices] = useState('');

  const transferDevice = async (deviceId) => {
    const args = window.localStorage.getItem('spotify_access_token');
    await axios.put(
      'https://api.spotify.com/v1/me/player',
      {
        device_ids: [deviceId],
      },
      {
        headers: {
          Authorization: `Bearer ${args}`,
        },
      }
    );
    props.getCurrPlayback(window.localStorage.getItem('spotify_access_token'));
  };

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = window.localStorage.getItem('spotify_access_token');
      if (token) {
        window.localStorage.setItem('new-spotify-device', '');
        const player = new Spotify.Player({
          name: 'Pomodoro-go Spotify Player',
          getOAuthToken: (cb) => {
            cb(token);
          },
        });
        // Error handling
        player.addListener('initialization_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('authentication_error', ({ message }) => {
          console.error(message);
          window.localStorage.removeItem('spotify_access_token');
          window.localStorage.removeItem('spotify_refresh_token');
          window.localStorage.removeItem('new-spotify-device');
        });
        player.addListener('account_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('playback_error', ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener('player_state_changed', (state) => {
          if (state) {
            window.localStorage.setItem(
              'spotify_current_track',
              state.track_window.current_track.id
            );
            props.getCurrPlayback(
              window.localStorage.getItem('spotify_access_token')
            );
          }
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          window.localStorage.setItem('new-spotify-device', device_id);
          // localDevice.current = {device: device_id};
          props.getDevices(window.localStorage.getItem('spotify_access_token'));
          transferDevice(device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      }
    };
    props.getDevices(window.localStorage.getItem('spotify_access_token'));
    props.getCurrPlayback(window.localStorage.getItem('spotify_access_token'));
  }, []);

  return (
    <div id="device-list">
      <List
        subheader={<ListSubheader>Available devices</ListSubheader>}
        className={classes.deviceList}
      >
        {props.devices.devices ? (
          props.devices.devices.map((each) => {
            return (
              <ListItem key={each.id} className={classes.deviceItem}>
                <ListItemText id="device-name" primary={each.name} />
                <ListItemSecondaryAction>
                  {props.currPlayback.device &&
                  props.currPlayback.device.id === each.id ? (
                    <MusicNoteIcon />
                  ) : (
                    <Tooltip title="Play on this device" placement="top">
                      <PlayArrowOutlinedIcon
                        onClick={() => transferDevice(each.id)}
                      />
                    </Tooltip>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        ) : (
          <div>cannot find device info</div>
        )}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    devices: state.devices,
    currPlayback: state.currPlayback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDevices: (accessToken) => {
      return dispatch(getDevices(accessToken));
    },
    getCurrPlayback: (accessToken) => {
      return dispatch(getCurrPlayback(accessToken));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDevices);
