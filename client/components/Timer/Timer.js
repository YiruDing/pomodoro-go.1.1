import React, { useContext, useEffect, useState } from 'react';
import { Button, Typography, makeStyles, Card, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { endSession, updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from '../../app';
import { Circle } from 'rc-progress';
import TimeDisplay from './TimeDisplay';
import PauseButton from './PauseButton';
const useStyles = makeStyles(() => ({
  timerContainer: {
    borderRadius: '15px',
    height: '500px',
    width: '500px',
    margin: '35px',
    padding: '10px',
  },
}));

const Timer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { info, primary } = theme.palette;
  const currentSession = useSelector((state) => state.currentSession);
  const { expectedEndTime, startTime } = currentSession;
  const end = Date.parse(expectedEndTime);
  const start = Date.parse(startTime);
  const { sessionTime, setSessionTime } = useContext(SessionContext);
  const targetTime = end - start;
  const { updateSession, endSession } = props;
  const sessionActiveFromStorage = JSON.parse(
    localStorage.getItem('sessionActive')
  );
  const [sessionActive, setSessionActive] = useState(false);
  let seconds;
  const [showStart, setShowStart] = useState(true);

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
      // starts session
      setShowStart(false);
      setSessionActive(true);
      chrome.runtime.sendMessage('kaghhmclljbnigfffgjhfbbbcpgenjoi', {
        message: 'timer',
        time: sessionTime,
        action: 'create-timer',
      });
      // creates timer in extension context
      window.timer = setInterval(() => {
        setSessionTime((sessionTime) => {
          const newSessionTime = sessionTime - 1000;
          localStorage.setItem('sessionTime', newSessionTime);
          return newSessionTime;
        });
      }, 1000);
      localStorage.setItem('sessionActive', true);
      chrome.runtime.sendMessage('kaghhmclljbnigfffgjhfbbbcpgenjoi', {
        message: 'create-timer',
        time: sessionTime,
      });
      if (!currentSession.sessionTime) {
        // only runs once when session starts
        updateSession(currentSession.id, { sessionTime });
      }

      localStorage.setItem('currentSession', JSON.stringify(currentSession));
    }
  };

  useEffect(() => {
    const timeFromStorage = JSON.parse(localStorage.getItem('sessionTime'));
    if (!sessionTime && !timeFromStorage) {
      clearInterval(window.timer);
      window.timer = null;
      localStorage.setItem('sessionActive', false);
      setSessionActive(false);
      setShowStart(true);
    }
    if (window.timer && !currentSession?.id) {
      clearInterval(window.timer);
      window.timer = null;
      setShowStart(true);
    }
    if (window.timer && currentSession?.status === 'Ongoing') {
      setShowStart(false);
    }
  });

  useEffect(() => {
    chrome.runtime.sendMessage(
      'kaghhmclljbnigfffgjhfbbbcpgenjoi',
      {
        message: 'get-time',
      },
      (response) => {
        if (currentSession) {
          localStorage.setItem('sessionTime', response.sessionTime);
          setSessionTime(response.sessionTime);
          if (!window.timer) {
            setShowStart(false);
            window.timer = setInterval(() => {
              if (JSON.parse(localStorage.getItem('sessionTime'))) {
                setSessionTime((sessionTime) => {
                  localStorage.setItem('sessionTime', sessionTime);
                  return sessionTime - 1000;
                });
              }
            }, 1000);
          }
        } else {
          localStorage.setItem('sessionTime', 0);
          setShowStart(true);
        }
      }
    );

    const dateInPast = function (firstDate, secondDate) {
      if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
        return true;
      }

      return false;
    };

    if (currentSession && !sessionTime) {
      const now = new Date();
      const expectedEndTime = new Date(currentSession.expectedEndTime);
      if (dateInPast(expectedEndTime, now)) {
        props.endSession(currentSession.id, true);
      }
    }
  }, [dispatch]);

  return (
    <Card className={classes.timerContainer} elevation={10}>
      <Grid container direction="column" alignItems="center">
        <TimeDisplay />
        {!showStart ? (
          <Grid container direction="row" className={classes.buttons}>
            <PauseButton
              toggleTimer={toggleTimer}
              setShowStart={setShowStart}
              setSessionActive={setSessionActive}
            />
            <StopButton toggleTimer={toggleTimer} />
          </Grid>
        ) : (
          <Button
            onClick={toggleTimer}
            disabled={
              JSON.parse(localStorage.getItem('currentSession')) ? false : true
            }
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
  );
};
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateSession: (sessionId, sessionTime) =>
        dispatch(updateSession(sessionId, sessionTime)),

      endSession: (sessionId, successful) =>
        dispatch(endSession(sessionId, successful)),
    };
  }
)(Timer);
