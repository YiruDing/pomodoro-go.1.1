import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Avatar, Badge, Tooltip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import LastSession from '../Dashboard/LastSession';
import TotalSessions from '../Dashboard/TotalSessions';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  contain: {
    background: 'linear-gradient(110deg, #4a4d6c 60%, #fce7a9 60%)',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    color: 'white',
  },
  avatar: {
    backgroundColor: 'black',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const FriendsSession = (props) => {
  const classes = useStyles();
  let sessions = useSelector((state) => state.sessions);

  if (props.friend) {
    sessions = sessions.filter((session) => session.userId === props.friend.id);
  }

  return (
    <div id="friends-stats" className={classes.contain}>
      {props.onlineStatus ? (
        <Tooltip title="Online" placement="right">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar className={classes.avatar}>
              <FaceIcon />
            </Avatar>
          </StyledBadge>
        </Tooltip>
      ) : (
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
      )}
      <h4>Email | {props.friend.email}</h4>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <LastSession sessions={sessions} />
        </Grid>
        <Grid item xs={7}>
          <TotalSessions sessions={sessions} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FriendsSession;
