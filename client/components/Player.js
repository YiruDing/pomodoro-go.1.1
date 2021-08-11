import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrPlayback } from '../store/spotify/getCurrPlayback';
import { getRecentTrack } from '../store/spotify/getRecentTrack';
import { resetQueue } from '../store/spotify/addToQueue';
import { extractQueries } from '../../utils/helper';

// everything material-ui
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { CardContent } from '@material-ui/core';
import { Grid } from '@material-ui/core';

//import other components
import PlayerPlaylist from './PlayerPlaylist';
import PlayerDevices from './PlayerDevices';
import CurrentPlayback from './CurrentPlayback';
import SpotifyControls from './SpotifyControls';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 400,
    marginRight: 10,
    height: 250,
    marginBottom: '10px',
    boxShadow: '0 3px 5px 2px #b49b8f',
    borderRadius: '15px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 230,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  spotifyConnect: {
    width: '50%',
    margin: 'auto',
  },
}));

const SpotifyConnectButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: '#1AB954',
    '&:hover': {
      backgroundColor: '#14873c',
    },
    borderRadius: 50,
    width: 200,
  },
}))(Button);

const Player = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const accessToken = props.location.search.slice(1);

  useEffect(() => {
    if (
      accessToken.length > 0 &&
      !window.localStorage.getItem('spotify_access_token')
    ) {
      let tokenParams = extractQueries(accessToken);
      window.localStorage.setItem(
        'spotify_access_token',
        tokenParams.access_token
      );
      window.localStorage.setItem(
        'spotify_refresh_token',
        tokenParams.refresh_token
      );
      props.getCurrPlayback(tokenParams.access_token);
      props.getRecentTrack(tokenParams.access_token);
    } else if (window.localStorage.getItem('spotify_access_token')) {
      props.getCurrPlayback(
        window.localStorage.getItem('spotify_access_token')
      );
    }
    // console.log('state duration - initial state', props.trackDuration);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('over here');
  //     props.getCurrPlayback(
  //       window.localStorage.getItem('spotify_access_token')
  //     );
  //   }, props.trackDuration);
  //   // console.log('update playback after designated delay', props.currPlayback);
  // }, [props]);

  return (
    <Grid container direction="column" alignItems="center">
      <div id="player">
        {window.localStorage.getItem('spotify_access_token') ? (
          <>
            <div>
              <Card className={classes.root}>
                <div className={classes.details}>
                  <CurrentPlayback
                    content={classes.content}
                    currPlayback={props.currPlayback}
                  />
                  <SpotifyControls
                    controls={classes.controls}
                    theme={theme}
                    playIcon={classes.playIcon}
                  />
                </div>
                <CardMedia
                  className={classes.cover}
                  image={`${props.currPlayback.item?.album?.images[0]?.url}`}
                  title="album cover"
                />
              </Card>
            </div>
            <PlayerDevices currPlayback={props.currPlayback} />
            <PlayerPlaylist />
          </>
        ) : (
          <a href={`${process.env.API_URL}/spotifyconnect`}>
            <Card className={classes.root}>
              <CardContent className={classes.spotifyConnect}>
                <SpotifyConnectButton>Connect to Spotify</SpotifyConnectButton>
              </CardContent>
            </Card>
          </a>
        )}
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    currPlayback: state.currPlayback,
    recentTrack: state.recentTrack,
    trackDuration: state.currPlayback?.item?.duration_ms,
    newlyAddedTrack: state.newlyAddedTrack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrPlayback: (accessToken) => {
      return dispatch(getCurrPlayback(accessToken));
    },
    getRecentTrack: (accessToken) => {
      return dispatch(getRecentTrack(accessToken));
    },
    resetQueue: () => {
      return dispatch(resetQueue());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player));
