import React, { useContext, useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import { addTask } from '../../store/sessions';
import { SessionContext } from './CreateSession';
const useStyles = makeStyles(() => ({
  input: {
    width: '80%',
  },
  button: {
    width: '20%',
  },
  container: {
    height: 'max-content',
  },
}));
const CreateTask = (props) => {
  const classes = useStyles();
  const currentSession = useSelector((state) => state.currentSession);
  const { goal } = useContext(SessionContext);
  const [task, setTask] = useState('');

  const handleChange = (ev) => {
    setTask(ev.target.value);
  };
  const handleClick = () => {
    if (task.length) {
      props.addTask(task, currentSession.id);
      setTask('');
    }
  };
  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        placeholder="Create a task"
        variant="outlined"
        disabled={goal || !currentSession.startTime ? false : true}
        onChange={handleChange}
        value={task}
      />
      <Button
        className={classes.button}
        disabled={goal || !currentSession.startTime ? false : true}
        onClick={handleClick}
      >
        Add Task
      </Button>
    </div>
  );
};

export default connect(null, (dispatch) => {
  return {
    addTask: (task, sessionId) => dispatch(addTask(task, sessionId)),
  };
})(CreateTask);
