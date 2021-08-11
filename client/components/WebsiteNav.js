import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { IconButton, Avatar } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';

import MainLogo from './MainLogo';
import PublicNav from './PublicNav';
import LoggedInNav from './LoggedInNav';
import GoogleAuth from './GoogleAuth';
const WebsiteNav = (props) => {
  const {
    headerStyle,
    icons,
    anchorEl,
    setAnchorEl,
    handleLogOut,
    getMe,
    isLoggedIn,
  } = props;
  return (
    <AppBar
      position="static"
      className={headerStyle}
      style={{ backgroundColor: '#5061a9' }}
    >
      {isLoggedIn ? (
        <Toolbar
          children={[
            <MainLogo />,
            <LoggedInNav
              setAnchorEl={setAnchorEl}
              anchorEl={anchorEl}
              handleLogOut={handleLogOut}
              icons={icons}
            />,
            <IconButton
              className={icons}
              id="account"
              aria-label="menu"
              aria-haspopup="true"
              edge="start"
              size="medium"
              onClick={(ev) => setAnchorEl(ev.currentTarget)}
            >
              <AccountBox style={{ color: '#e0e2e4', fontSize: 30 }} />
            </IconButton>,
            <GoogleAuth
              setAnchorEl={setAnchorEl}
              handleLogOut={handleLogOut}
              getMe={getMe}
              isLoggedIn={isLoggedIn}
              icons={icons}
            />,
          ]}
        ></Toolbar>
      ) : (
        <Toolbar
          children={[
            <MainLogo />,
            <PublicNav anchorEl={anchorEl} setAnchorEl={setAnchorEl} />,
            <IconButton
              className={icons}
              id="account"
              aria-label="menu"
              aria-haspopup="true"
              edge="start"
              size="medium"
              onClick={(ev) => setAnchorEl(ev.currentTarget)}
            >
              <AccountBox style={{ color: '#e0e2e4', fontSize: 30 }} />
            </IconButton>,
            <GoogleAuth
              setAnchorEl={setAnchorEl}
              handleLogOut={handleLogOut}
              getMe={getMe}
              isLoggedIn={isLoggedIn}
              icons={icons}
            />,
          ]}
        ></Toolbar>
      )}
      {/* <GoogleAuth
        setAnchorEl={setAnchorEl}
        handleLogOut={handleLogOut}
        getMe={getMe}
        isLoggedIn={isLoggedIn}
        icons={icons}
      /> */}
    </AppBar>
  );
};

export default WebsiteNav;
