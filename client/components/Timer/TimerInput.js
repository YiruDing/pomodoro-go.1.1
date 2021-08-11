import React, { useContext, useEffect, useState } from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
import { SessionContext } from '../../app';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px',
  },
}));

const TimerInput = (props) => {
  const classes = useStyles();
  const { goal, sessionTime, setSessionTime } = useContext(SessionContext);
  const currentSession = useSelector((state) => state.currentSession);
  const [inputError, setInputError] = useState(false);
  const { label } = props;

  const handleChange = (ev) => {
    setInputError(false);
    const value = parseInt(ev.target.value);
    if (!value) {
      props.setTime(0);
      return;
    }
    if (isNaN(value) || value > 59) {
      setInputError(true);
      return;
    }
    props.setTime(parseInt(value));
  };

  return (
    // <Grid item xs={4}>
    <TextField
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
      className={classes.input}
      variant="outlined"
      placeholder="00"
      error={inputError ? true : false}
      helperText={inputError ? 'input error' : null}
      onChange={handleChange}
      disabled={goal && currentSession.id ? false : true}
      multiline
      type="number"
      inputProps={{ maxLength: 2 }}
    ></TextField>
    // </Grid>
  );
};

export default TimerInput;
