import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const PublicNav = (props) => {
  const { anchorEl, setAnchorEl } = props;
  return (
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
  );
};

export default PublicNav;
