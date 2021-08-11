import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { updateBlocking } from '../store/blockSites';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  uhoh: {
    width: '60%',
    margin: '20px auto 20px auto',
    border: '1px solid #a83942',
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 5px 10px 0px #ccb8b8',
    backgroundColor: 'white'
  },
  form: {
    width: '80%',
  },
  goAnyway: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    border: 0,
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 15,
    padding: 6,
    borderRadius: 5,
    width: 200,
    backgroundImage: 'linear-gradient(140deg,#ffffff 25%, #ffffff 50%,#ffffff 90%)',
    transition: 'width 2s, background-image 4s, ease-out',
    '&:hover': {
      backgroundImage: 'linear-gradient(140deg,#faefe8 25%, #d7dae8 50%,#cedaa4 90%)',
      width: 400
    },
  },
  link: {
    color: 'black',
    fontSize: 15,
    borderRadius: 5,
    padding: 6,
    textAlign: 'center',
    '&:hover': {
      backgroundImage: 'linear-gradient(140deg,#faefe8 25%, #d7dae8 50%,#cedaa4 90%)',
    },
  }
}));

const BlockError = (props) => {
  console.log('block error props', props);
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  //states
  const blocks = useSelector((state) => state.blocks);
  const auth = useSelector((state) => state.auth);

  const latestBlockUrl = blocks?.[0]?.site?.siteUrl;
  const latestBlockId = blocks?.[0]?.site?.id;

  console.log('latest blocked url', latestBlockUrl);

  const [answers, setAnswers] = useState({
    question1: 'false',
    question2: 'false',
    question3: 'false',
  });
  const [showLink, setShowLink] = useState(false);

  const goOrNoGo = () => {
    if (answers.question1 === 'true' &&
    answers.question2 === 'true' &&
    answers.question3 === 'true') {
      return true;
    } else {
      return false;
    }
  };

  const goAnyway = () => {
    dispatch(updateBlocking(auth.id, latestBlockId));
    setShowLink(true);
  };

  const handleChange = (ev) => {
    setAnswers({ ...answers, [ev.target.name]: ev.target.value });
  };

  // console.log(answers);

  return (
    <div id='uhoh-blocked' className={classes.uhoh}>
      <Typography variant="h5" gutterBottom>
      💦 Looks like you are getting distracted 💦...
      </Typography>
      <img src="https://pomodoro-go.s3.us-east-2.amazonaws.com/Kapture+2021-05-31+at+15.38.20.gif" />
      <Typography variant="body1">
        🧠 Think about these before you start browsing around:
      </Typography>
      { goOrNoGo() ? undefined : (
        <Alert severity="info" className={classes.form}>
          If any of the answers is No, then you should probably go 👏 back 👏 to 👏 what you were
          doing!
        </Alert>
      )}
      <br />
      <FormControl component="fieldset" className={classes.form}>
        <FormLabel component="legend">Is looking at this site going to give you more satisfaction than finishing up your task at hand?</FormLabel>
        <RadioGroup
          aria-label="question1"
          name="question1"
          value={answers.question1}
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
        <FormLabel component="legend">Is there a specific reason that you need to checkout this site during focus session?</FormLabel>
        <RadioGroup
          aria-label="question2"
          name="question2"
          value={answers.question2}
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
        <FormLabel component="legend">If you still want to go, can you keep your browsing around under 5 minutes?</FormLabel>
        <RadioGroup
          aria-label="question3"
          name="question3"
          value={answers.question3}
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      {goOrNoGo() ? (
        <div id='go-anyway' className={classes.goAnyway}>
          <button onClick={goAnyway} className={classes.button}>Take me there anyway!😅</button>
          {showLink === true && (
            <a href={'https://'+latestBlockUrl} target='_blank' rel="noreferrer" className={classes.link}>Go to {latestBlockUrl} ➡️</a>
          )}
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default BlockError;
