import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  view: {
    display: 'flex',
  },
  tens: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },
  ones: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },
  button: {},
  timeSection: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
}));

const TimeDisplay = (props) => {
  const classes = useStyles();
  const { setTime, time } = props;
  const incrementByTen = () => {
    setTime(time + 10);
    console.log(time);
  };
  const increment = () => {
    setTime(time + 1);
  };
  const decrementByTen = () => {
    setTime(time - 10);
  };
  const decrement = () => {
    setTime(time - 1);
  };
  let stringTime = time + '' || '';
  return (
    <div className={classes.timeSection}>
      <Typography>{props.label}</Typography>
      <div className={classes.view}>
        <div className={classes.tens}>
          <Button
            onClick={incrementByTen}
            size="small"
            className={classes.button}
          >
            +
          </Button>
          <Typography align="center">
            {stringTime.length !== 1 ? stringTime[0] : '0'}
          </Typography>
          <Button
            size="small"
            onClick={decrementByTen}
            className={classes.button}
          >
            -
          </Button>
        </div>

        <div className={classes.ones}>
          <Button size="small" onClick={increment} className={classes.button}>
            +
          </Button>
          <Typography align="center">
            {stringTime.length !== 1 ? stringTime[1] : time}
          </Typography>
          <Button size="small" onClick={decrement} className={classes.button}>
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;
