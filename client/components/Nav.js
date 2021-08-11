import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticateGoogle, logout } from '../store';
// https://react-icons.github.io/react-icons/search?q=googl
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import ExtensionNav from './ExtensionNav';
import WebsiteNav from './WebsiteNav';
import Header from './Header';
// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
const styles = () => ({
  header: { color: 'white' },
  icons: { color: '#9671a2' },
  login: { color: '#9671a2' },
});

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogOut = () => {
    clearInterval(window.timer);
    window.timer = null;
    setAnchorEl(null);
    props.handleClick();
  };

  const { classes } = props;

  return (
    <div>
      <nav id="navBar">
        {chrome.storage ? (
          // change to headerStyle maybe use context instead
          <ExtensionNav headerStyle={classes.header} />
        ) : (
          <Header
            handleLogOut={handleLogOut}
            isLoggedIn={props.isLoggedIn}
            getMe={props.getMe}
            handleLogOut={handleLogOut}
            icons={classes.icons}
          />
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
