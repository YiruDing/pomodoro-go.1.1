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
  const { goal } = useContext(SessionContext);
  const currentSession = useSelector((state) => state.currentSession);
  const [inputError, setInputError] = useState(false);
  const { label } = props;

  const handleChange = (ev) => {
    // checking for error
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
    props.setTime(value);
  };

  return (
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
  );
};

export default TimerInput;
