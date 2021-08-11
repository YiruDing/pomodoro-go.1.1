import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { AccountBox, HomeOutlined } from '@material-ui/icons';
const LoggedInNav = (props) => {
  const { anchorEl, setAnchorEl, handleLogOut, icons } = props;
  return (
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
      </Menu>
      <IconButton
        className={icons}
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
        <AssessmentIcon style={{ color: '#e0e2e4', fontSize: 30 }} />
        Dashboard
      </IconButton>
      <IconButton
        id="blocksites"
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
        <DomainDisabledIcon style={{ color: '#e0e2e4', fontSize: 30 }} />
        Block Sites
      </IconButton>
      <IconButton
        id="friends"
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
  );
};

export default LoggedInNav;
