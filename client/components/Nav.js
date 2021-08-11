import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticateGoogle, logout, me } from '../store';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// https://react-icons.github.io/react-icons/search?q=googl

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
  createMuiTheme,
  Avatar,
} from '@material-ui/core';
import { AccountBox, HomeOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
const styles = () => ({
  header: { color: 'white' },
  icons: { color: '#9671a2' },
  login: { color: '#9671a2' },
});

const responseGoogle = (response) => {
  console.log(response);
};
const Navbar = (props) => {
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [authInstance, setAuthInstance] = useState({});
  const handleSuccess = (response) => {
    console.log(response);
    props.getMe(response);
  };
  const handleFail = (response) => {
    console.log('sign in failure', response);
  };
  const handleLogOut = () => {
    clearInterval(window.timer);
    setAnchorEl(null);
    window.localStorage.clear();
    props.handleClick();
  };

  const { isLoggedIn, classes } = props;

  return (
    <div>
      <nav id="navBar">
        {chrome.storage ? (
          <AppBar
            position="static"
            className={classes.header}
            style={{ backgroundColor: '#5061a9' }}
          >
            <Toolbar>
              <Typography id="pomo-go" align="center" variant="h4">
                Pomodoro,go!
              </Typography>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar
            position="static"
            className={classes.header}
            style={{ backgroundColor: '#5061a9' }}
          >
            <Toolbar>
              <div id='logo'>
                <Avatar
                  src={
                    'https://e7.pngegg.com/pngimages/499/436/png-clipart-logo-tomato-app-store-fruit-scribbles-tomato-logo.png'
                  }
                />
                <Typography
                  id="pomo-go"
                  variant="h4"
                  style={{ fontFamily: 'Righteous' }}
                >
                Pomodoro,go!
                </Typography>
              </div>

              {isLoggedIn ? (
                <>
                  <Menu
                    id="menu"
                    aria-label="menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    aria-haspopup="true"
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    {/* <MenuItem onClick={this.handleLogOut}>Dashboard</MenuItem>
                  <MenuItem onClick={this.handleLogOut}>Block Sites</MenuItem>
                  <MenuItem onClick={this.handleLogOut}>Friends</MenuItem> */}
                  </Menu>
                  <IconButton
                    className={classes.icons}
                    id="home"
                    aria-label="home"
                    edge="start"
                    size="medium"
                    component={Link}
                    to="/home"
                    style={{
                      color: 'white',
                      fontSize: 15,
                      flexDirection: 'column',
                    }}
                  >
                    <HomeOutlined style={{ color: '#e0e2e4', fontSize: 30 }} />
                      Home
                  </IconButton>
                  <IconButton
                    id="dashboard"
                    // aria-label="menu"
                    // aria-haspopup="true"
                    edge="start"
                    size="medium"
                    component={Link}
                    to="/dashboard"
                    style={{
                      color: 'white',
                      fontSize: 15,
                      flexDirection: 'column',
                    }}
                  >
                    <AssessmentIcon
                      style={{ color: '#e0e2e4', fontSize: 30 }}
                    />
                    Dashboard
                  </IconButton>
                  <IconButton
                    id="blocksites"
                    // aria-label="menu"
                    edge="start"
                    size="medium"
                    component={Link}
                    to="/blocksites"
                    style={{
                      color: 'white',
                      fontSize: 15,
                      flexDirection: 'column',
                    }}
                  >
                    <DomainDisabledIcon
                      style={{ color: '#e0e2e4', fontSize: 30 }}
                    />
                    Block Sites
                  </IconButton>
                  <IconButton
                    id="friends"
                    // aria-label="menu"
                    edge="start"
                    size="medium"
                    component={Link}
                    to="/friends"
                    style={{
                      color: 'white',
                      fontSize: 15,
                      flexDirection: 'column',
                    }}
                  >
                    <PeopleAltIcon style={{ color: '#e0e2e4', fontSize: 30 }} />
                    Friends
                  </IconButton>
                </>
              ) : (
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  aria-haspopup="true"
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    key="Login"
                    component={Link}
                    onClick={() => setAnchorEl(null)}
                    to="/login"
                  >
                    Log In
                  </MenuItem>
                  <MenuItem
                    key="SignUp"
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </MenuItem>
                </Menu>
              )}
              <div id="extension-login">
                <IconButton
                  className={classes.icons}
                  id="account"
                  aria-label="menu"
                  aria-haspopup="true"
                  edge="start"
                  size="medium"
                  onClick={(ev) => setAnchorEl(ev.currentTarget)}
                // ref={anchorRef}
                >
                  <AccountBox style={{ color: '#e0e2e4', fontSize: 30 }} />
                </IconButton>

                {props.isLoggedIn ? (
                  <GoogleLogout
                    clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={handleLogOut}
                    isSignedIn={props.isLoggedIn}
                    render={renderProps => (
                      <Avatar onClick={renderProps.onClick} style={{
                        height: 30,
                        width: 30,
                        border: 0,
                        borderRadius: '50%',
                        marginTop: '10px'
                      }} src='https://i.pinimg.com/originals/a3/d5/8f/a3d58f0b2820871d486e9851c0fdbb60.jpg'/>
                    )}
                  ></GoogleLogout>
                ) : (
                  <GoogleLogin
                    clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={handleSuccess}
                    onFailure={handleFail}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={props.isLoggedIn}
                    redirectUri={`${process.env.API_URL}/home`}
                    render={renderProps => (
                      <Avatar onClick={renderProps.onClick} style={{
                        height: 30,
                        width: 30,
                        border: 0,
                        borderRadius: '50%',
                        marginTop: '10px'
                      }} src='https://img-authors.flaticon.com/google.jpg'/>
                    )}
                  />
                )}
              </div>
            </Toolbar>
          </AppBar>
        )}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getMe(data) {
      dispatch(authenticateGoogle(data));
    },
  };
};
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar));
