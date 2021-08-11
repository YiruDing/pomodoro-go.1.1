import {
  Button,
  ListItem,
  Checkbox,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteTask, updateTask } from '../../store/sessions';

const useStyles = makeStyles(() => ({
  task: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
}));
const Task = (props) => {
  const { task, currentSession } = props;
  const [checked, setChecked] = useState(false);
  const { name, id } = task;
  const classes = useStyles();
  const handleChange = (ev) => {
    setChecked(ev.target.checked);
    props.updateTask(task.id, currentSession.id);
  };
  const handleClick = () => {
    props.deleteTask(id, props.currentSession.id);
  };
  return (
    <ListItem key={id} className={classes.task}>
      <Button
        onClick={handleClick}
        style={{ visibility: checked ? 'hidden' : 'visible' }}
      >
        X
      </Button>
      <Typography
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {name}
      </Typography>{' '}
      <Checkbox checked={checked} onChange={handleChange}>
        Completed
      </Checkbox>
    </ListItem>
  );
};

export default connect(
  ({ currentSession }) => ({ currentSession }),
  (dispatch) => {
    return {
      deleteTask: (taskId, sessionId) =>
        dispatch(deleteTask(taskId, sessionId)),
      updateTask: (taskId, sessionId) =>
        dispatch(updateTask(taskId, sessionId)),
    };
  }
)(Task);
