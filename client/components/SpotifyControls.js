import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import playPrevious from './spotifyUtils/playPrevious';
import playStart from './spotifyUtils/playStart';
import playNext from './spotifyUtils/playNext';

import Badge from '@material-ui/core/Badge';

const SpotifyControls = (props) => {
  const { controls, theme, playIcon } = props;
  return (
    <div className={controls}>
      <IconButton aria-label="previous" onClick={() => playPrevious(props)}>
        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
      </IconButton>
      <IconButton aria-label="play/pause" onClick={() => playStart(props)}>
        {!props.currPlayback.is_playing ? (
          <PlayArrowIcon className={playIcon} />
        ) : (
          <PauseIcon className={playIcon} />
        )}
      </IconButton>
      {props.newlyAddedTrack && props.newlyAddedTrack !== '' ? (
        <Badge color="secondary" variant="dot" overlap="circle">
          <IconButton aria-label="next" onClick={(props) => playNext(props)}>
            {theme.direction === 'rtl' ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Badge>
      ) : (
        <IconButton aria-label="next" onClick={(props) => playNext(props)}>
          {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
        </IconButton>
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyControls);
