import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import { createSession, updateSession } from '../../store/sessions';
import { SessionContext } from '../../app';

const useStyles = makeStyles(() => ({
  select: {
    width: '100%',
  },
  form: {
    width: '100%',
  },
}));
const GoalSelector = (props) => {
  const auth = useSelector((state) => state.auth);
  const currentSession = useSelector((state) => state.currentSession);
  const { goal, setGoal } = useContext(SessionContext);
  const { createSession, updateSession } = props;
  const classes = useStyles();

  const handleChange = (ev) => {
    const { value } = ev.target;
    // once a goal is selected a new session is created
    if (!currentSession.id) {
      createSession(auth.id, value);
    }
    // updates currentSession's goal
    if (currentSession.goal) {
      updateSession(currentSession.id, { goal: value });
    }

    setGoal(value);
  };

  return (
    <Grid container item>
      <FormControl className={classes.form}>
        <InputLabel id="goal-label">Select Goal</InputLabel>
        <Select
          labelId="goal-label"
          className={classes.select}
          value={currentSession.id ? goal : ''}
          onChange={handleChange}
        >
          <MenuItem value="Study">Study</MenuItem>
          <MenuItem value="Meditate">Meditate</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Read">Read</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default connect(null, (dispatch) => {
  return {
    createSession: (userId, goal) => dispatch(createSession(userId, goal)),
    updateSession: (sessionId, sessionInfo) =>
      dispatch(updateSession(sessionId, sessionInfo)),
  };
})(GoalSelector);
