import React from 'react';
import { TextField, Button, Paper, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import history from '../history';

// code source/inspiration:
// https://github.com/paigen11/mysql-registration-passport
// https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7

class ResetPasswordForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      reenterPassword: '',
      updated: false,
      isLoading: true,
      error: false,
      errorMessage: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async componentDidMount() {
    try {
      const resetToken = this.props.location.pathname.split('/')[2];
      const response = await axios.get(`/auth/reset`, {
        params: {
          resetToken,
        },
      });
      console.log(response);
      if (response.data.message === 'password link accepted') {
        this.setState({
          email: response.data.email,
          updated: false,
          isLoading: false,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          isLoading: false,
          error: true,
        });
      }
    } catch (err) {
      console.log(err.data);
    }
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    if (password.value !== reenterPassword.value) {
      this.setState({ errorMessage: 'Passwords do not match' });
      return;
    }
    await this.updatePassword();
    this.setState({
      email: '',
      password: '',
      reenterPassword: '',
    });
    console.log('submit button clicked');
  }

  async updatePassword() {
    try {
      const response = await axios.put('/auth/updatePassword', {
        email: this.state.email,
        password: this.state.password,
      });
      if (response.data.message === 'Password successfully updated!') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (err) {
      console.log(err.data);
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const {
      password,
      error,
      isLoading,
      updated,
      reenterPassword,
      errorMessage,
    } = this.state;
    console.log(password, reenterPassword);
    if (error) {
      return (
        <div>
          <h6>
            Oh snap! There was a problem resetting your password. Please try
            sending another link.
          </h6>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <h6>Loading...</h6>
        </div>
      );
    }
    if (updated) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            style={{
              padding: 10,
              width: '25rem',
              marginTop: '10rem',
            }}
          >
            {updated && 'Success! Please try logging in again.'}
          </Paper>
        </div>
      );
    }
    return (
      <div>
        <form
          onSubmit={onSubmit}
          autoComplete="off"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            style={{
              padding: 10,
              width: '25rem',
              marginTop: '10rem',
            }}
          >
            {updated && 'Success! Please try logging in again.'}
            <Grid container direction="column" alignItems="center">
              <TextField
                id="password"
                required={true}
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <TextField
                id="reenterPassword"
                required={true}
                label="Re-enter Password"
                type="password"
                name="reenterPassword"
                value={reenterPassword}
                onChange={onChange}
              />
              {errorMessage?.length ? (
                <Typography
                  style={{
                    color: 'tomato',
                  }}
                >
                  {errorMessage}
                </Typography>
              ) : null}
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ marginTop: '1rem' }}
                value="Submit"
              >
                Update Password
              </Button>
            </Grid>
          </Paper>
        </form>
      </div>
    );
  }
}

export default ResetPasswordForm;
