import React, { useState } from 'react';
import { makeStyles, List } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import Task from './Task';
const useStyles = makeStyles(() => ({
  paper: {
    border: 'solid 1px black',
    height: '50%',
  },
}));

const TaskList = (props) => {
  const classes = useStyles();
  const tasks = useSelector(({ currentSession }) => currentSession.tasks) || [];
  return (
    <List className={classes.paper}>
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </List>
  );
};

export default connect(({ currentSession }) => {
  const { tasks } = currentSession || [];
  return { tasks };
})(TaskList);
