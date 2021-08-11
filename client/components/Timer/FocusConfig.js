import React, { useContext, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import TimerInput from './TimerInput';
import GoalSelector from './GoalSelector';
import { TimerContext } from './CreateSession';
import { SessionContext } from '../../app';

const useStyles = makeStyles(() => {
  return {
    container: {
      boxShadow: '0 3px 5px 2px #b49b8f',
      borderRadius: '15px',
      backgroundColor: 'white',
      height: '100%',
      minHeight: '120px',
      width: '500px',
      margin: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingBottom: '10px',
    },
    goal: {
      padding: '1rem',
      margin: '1rem',
    },

    gridContainer: {
      margin: '0',
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
    },
    inputContainer: {
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-around',
    },
    taskArea: {
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
    },
    taskList: {
      height: '100%',
    },
  };
});

const FocusConfig = (props) => {
  const currentSession = useSelector((state) => state.currentSession);
  const {
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
    setSessionTime,
  } = useContext(TimerContext);
  const classes = useStyles();
  const sessionActive = JSON.parse(localStorage.getItem('sessionActive'));

  useEffect(() => {
    const convertToMilliseconds = () => {
      let totalTime = 0;
      totalTime += seconds * 1000;
      totalTime += minutes * 60000;
      totalTime += hours * 3600000;
      return totalTime;
    };
    // should updated everytime input changes, goal selected and when session starts
    if (!sessionActive && currentSession.status === 'Not Started') {
      setSessionTime(convertToMilliseconds());
      localStorage.setItem('sessionTime', convertToMilliseconds());
    }
    const session = JSON.parse(localStorage.getItem('currentSession'));
    if (session?.status === 'Done') {
      localStorage.setItem('currentSession', null);
    }
  }, [seconds, minutes, hours]);
  return (
    <Paper className={classes.container} elevation={10}>
      <Grid
        justifyContent="center"
        item
        container
        xs={12}
        spacing={2}
        className={classes.gridContainer}
      >
        <Grid item>
          {currentSession.status !== 'Ongoing' ? (
            <Typography align="center">Create Session</Typography>
          ) : (
            <Typography>Current Session</Typography>
          )}
        </Grid>
        <Grid container direction="row">
          <Grid item xs={3}>
            {currentSession.status !== 'Ongoing' ? (
              <GoalSelector className={classes.goal} />
            ) : (
              <Typography>Goal : {currentSession.goal}</Typography>
            )}
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              display: currentSession.status === 'Ongoing' ? 'none' : null,
            }}
            className={classes.inputContainer}
          >
            {[
              ['Hours', setHours, hours],
              ['Minutes', setMinutes, minutes],
              ['Seconds', setSeconds, seconds],
            ].map((bundle, idx) => (
              <TimerInput
                key={idx * 10}
                label={bundle[0]}
                state={bundle[2]}
                setTime={bundle[1]}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default connect(({ currentSession }) => ({ currentSession }))(
  FocusConfig
);
