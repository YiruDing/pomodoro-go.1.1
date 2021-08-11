import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Typography,
  makeStyles,
  Card,
  Grid,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from '../../app';
import { TimerContext } from './CreateSession';
import { Circle } from 'rc-progress';
const useStyles = makeStyles(() => ({
  timerContainer: {
    borderRadius: '15px',
    height: '500px',
    width: '500px',
    margin: '35px',
    padding: '10px',
  },
  timer: {
    fontSize: '100px',
  },
}));

const Timer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { info, primary, secondary, text, error } = theme.palette;
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  const { setHours, setMinutes, setSeconds } = useContext(TimerContext);

  const { expectedEndTime, startTime } = currentSession;
  const end = Date.parse(expectedEndTime);
  const start = Date.parse(startTime);
  const { setCountDown, sessionTime, countDown, setSessionTime } =
    useContext(SessionContext);
  const targetTime = (end - start);
  const { updateSession } = props;
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

  const msToS = (ms) => {
    seconds = ms / 1000;
    seconds = seconds % 3600;
    seconds = seconds % 60;
    seconds = seconds < 10 ? (seconds >= 0 ? '0' + seconds : '00') : seconds;
    if (seconds === '00') {
      return 100;
    } else {
      return (seconds / 60) * 100;
    }
  };

  const toggleTimer = (ev) => {
    const button = ev.target.innerText;
    if (button === 'START') {
      if (!currentSession.sessionTime) {
        updateSession(currentSession.id, { sessionTime });
      }
      localStorage.setItem('currentSession', JSON.stringify(currentSession));
      setCountDown(true);
    }
    if (button === 'STOP' || button === 'PAUSE') {
      setCountDown(false);
    }
  };
  return (
    <div>
      <Card className={classes.timerContainer} elevation={10}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h1"
              className={classes.timer}
              style={{
                position: 'relative',
                top: '185px',
              }}
            >
              {msToHMS(sessionTime)}{' '}
            </Typography>
          </Grid>
          {countDown ? (
            <Grid container direction="row" className={classes.buttons}>
              <Grid>
                <Button
                  onClick={toggleTimer}
                  style={{
                    backgroundColor: '#5061a9',
                    color: 'white',
                    marginLeft: '4px',
                    marginBottom: '10px',
                    zIndex: 1,
                    position: 'relative',
                    top: '185px',
                    left: '185px',
                  }}
                >
                  pause
                </Button>
              </Grid>
              <Grid>
                <StopButton toggleTimer={toggleTimer} />
              </Grid>
            </Grid>
          ) : (
            <Button
              onClick={toggleTimer}
              disabled={sessionTime ? false : true}
              style={{
                backgroundColor: '#5061a9',
                color: 'white',
                marginLeft: '4px',
                marginBottom: '10px',
                zIndex: 1,
                position: 'relative',
                top: '185px',
              }}
            >
              Start
            </Button>
          )}
        </Grid>
        <Circle
          percent={(sessionTime / targetTime) * 100}
          strokeWidth="3"
          strokeColor={{
            '0%': info.main,
            '100%': '#5061a9',
          }}
          trailColor={primary.contrastText}
          style={{
            width: '100%',
            position: 'relative',
            bottom: '160px',
          }}
        />
        <Circle
          percent={msToS(sessionTime)}
          strokeWidth="1"
          strokeColor={{
            '0%': info.main,
            '100%': '#5061a9',
          }}
          trailColor={primary.contrastText}
          style={{
            width: '92%',
            position: 'relative',
            bottom: '644px',
            left: '20px',
          }}
        />
      </Card>
    </div>
  );
};
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateSession: (sessionId, sessionTime) =>
        dispatch(updateSession(sessionId, sessionTime)),
    };
  }
)(Timer);
