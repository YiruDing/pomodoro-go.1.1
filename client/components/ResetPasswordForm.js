/* eslint jsx-quotes: "off" */
/* eslint no-console: "off" */

import React from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

// code source/inspiration:
// https://github.com/paigen11/mysql-registration-passport
// https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7

class ResetPasswordForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
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
    await this.updatePassword();
    this.setState({
      email: '',
      password: '',
    });
  }

  async updatePassword() {
    try {
      const response = await axios.put('/auth/updatePassword', {
        email: this.state.email,
        password: this.state.password,
      });
      console.log(response);
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
    const { password, error, isLoading, updated } = this.state;

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
    return (
      <div>
        {updated && 'Success! Please try logging in again.'}

        <form onSubmit={onSubmit} autoComplete="off">
          <TextField
            id="password"
            required={true}
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{ marginTop: '1rem' }}
            value="Submit"
          >
            Update Password
          </Button>
        </form>
      </div>
    );
  }
}

export default ResetPasswordForm;
