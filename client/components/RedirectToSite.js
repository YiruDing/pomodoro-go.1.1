import { Link, makeStyles, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    color: '#4d2a4e',
  },
}));

const RedirectToSite = () => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <a href="https://pomodoro-go-2101.herokuapp.com">
        <Button className={classes.text}>
          Click to navigate to site pomodoro-go-2101.herokuapp.com
        </Button>
      </a>
    </div>
  );
};

export default RedirectToSite;
