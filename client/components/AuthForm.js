import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { authenticate, resetPassword } from '../store';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login: {
    padding: 10,
    // minWidth: 100,
    flexGrow: 1,
    // width: '25%',
    width: '25rem',
    marginTop: '10rem',
  },
  item: {
    // width: '80%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const classes = useStyles();
  const { name, displayName, error, value } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChange = (ev) => {
    if (ev.target.name === 'username') {
      setUsername(ev.target.value);
    } else if (ev.target.name === 'email') {
      setEmail(ev.target.value);
    } else if (ev.target.name === 'password') {
      setPassword(ev.target.value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let formName = 'signup';
    if (!username) {
      formName = 'login';
    }
    dispatch(authenticate(username, email, password, formName));
  };
  const handleReset = (ev) => {
    ev.preventDefault();
    dispatch(resetPassword(email));
  };
  if (name === 'signup') {
    return (
      <div className={classes.container}>
        {/* script for google OAuth */}
        <form id="login" name={name} value={value}>
          <Paper className={classes.login}>
            <Grid container direction="column" alignItems="center">
              <Typography
                style={{
                  marginBottom: '20px',
                }}
              >
                {'Sign Up for an Account'}
              </Typography>
              <TextField
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={onChange}
                variant="outlined"
                className={classes.item}
                size="small"
              />
              <Grid item>
                <TextField
                  id="email"
                  label="E-mail"
                  name="email"
                  value={email}
                  onChange={onChange}
                  variant="outlined"
                  className={classes.item}
                  size="small"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  // type='password'
                  value={password}
                  onChange={onChange}
                  variant="outlined"
                  className={classes.item}
                  size="small"
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={handleSubmit}
                  id="submit"
                  variant="contained"
                  type="submit"
                  value={value}
                  color="primary"
                  style={{
                    backgroundColor: '#5061a9',
                    color: 'white',
                    marginTop: '10px',
                  }}
                  className={classes.item}
                >
                  {displayName}
                </Button>
              </Grid>
              <Grid item>
                <Grid item>
                  <Typography variant="caption">
                    Already have an account?
                    {`
            `}
                  </Typography>
                  <Link variant="caption" href={`${process.env.API_URL}/login`}>
                    Log in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  } else if (name === 'login') {
    return (
      <div className={classes.container}>
        {/* script for google OAuth */}
        <form id="login" name={name} value={value}>
          <Paper className={classes.login}>
            <Grid container direction="column" alignItems="center">
              <Typography
                style={{
                  paddingBottom: '15px',
                }}
              >
                Log In to Your Account
              </Typography>
              <Grid item>
                <TextField
                  id="email"
                  label="E-mail"
                  name="email"
                  value={email}
                  onChange={onChange}
                  variant="outlined"
                  className={classes.item}
                  size="small"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  variant="outlined"
                  className={classes.item}
                  size="small"
                />
              </Grid>
              <Grid item>
                <Button
                  id="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  type="submit"
                  value={value}
                  color="primary"
                  style={{
                    backgroundColor: '#5061a9',
                    color: 'white',
                    marginTop: '10px',
                  }}
                  className={classes.item}
                >
                  {displayName}
                </Button>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  alignItems="center"
                  direction="column"
                  style={{
                    paddingTop: 10,
                  }}
                >
                  <Typography variant="caption">
                    Need an account?{' '}
                    <Link
                      variant="caption"
                      href={`${process.env.API_URL}/signup`}
                    >
                      Sign up
                    </Link>
                  </Typography>
                  <Typography variant="caption">
                    Forgot Password?{' '}
                    <Link
                      variant="caption"
                      href={`${process.env.API_URL}/sendPasswordReset`}
                    >
                      Reset Password
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  } else
    return (
      <div className={classes.container}>
        {/* script for google OAuth */}
        <form
          id="reset-passowrd"
          onSubmit={handleReset}
          name={name}
          value={value}
        >
          <Paper className={classes.login}>
            <Grid container direction="column" alignItems="center">
              <Typography>Enter e-mail to reset password</Typography>
              <Grid item>
                <TextField
                  id="email"
                  label="E-mail"
                  name="email"
                  value={email}
                  onChange={onChange}
                  variant="outlined"
                  className={classes.item}
                  size="small"
                />
              </Grid>
              <Grid item>
                <Button
                  id="submit"
                  variant="contained"
                  type="submit"
                  value={value}
                  color="primary"
                  style={{
                    backgroundColor: '#5061a9',
                    color: 'white',
                    marginTop: '10px',
                  }}
                  className={classes.item}
                >
                  {displayName}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Log In',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapResetPassword = (state) => {
  return {
    name: 'resetPassword',
    displayName: 'Reset Password',
    error: state.auth.error,
  };
};
export const Login = connect(mapLogin)(AuthForm);
export const Signup = connect(mapSignup)(AuthForm);

export const ResetPassword = connect(mapResetPassword)(AuthForm);
