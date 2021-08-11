import { Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../app';

const TimeDisplay = (props) => {
  const { sessionTime } = useContext(SessionContext);
  let seconds;
  const msToHMS = (ms) => {
    seconds = ms / 1000;

    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;

    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? (seconds >= 0 ? '0' + seconds : '00') : seconds;
    return hours + ':' + minutes + ':' + seconds;
  };

  return (
    <Grid item>
      <Typography
        variant="h1"
        style={{
          position: 'relative',
          top: '185px',
          fontSize: '100px',
        }}
      >
        {msToHMS(sessionTime)}{' '}
      </Typography>
    </Grid>
  );
};

export default TimeDisplay;
