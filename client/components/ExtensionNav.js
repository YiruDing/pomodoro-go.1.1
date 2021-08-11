import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
const ExtensionNav = (props) => {
  return (
    <AppBar
      position="static"
      className={props.style}
      style={{ backgroundColor: '#5061a9' }}
    >
      <Toolbar
        children={[
          <Typography id="pomo-go" align="center" variant="h4">
            Pomodoro,go!
          </Typography>,
        ]}
      ></Toolbar>
    </AppBar>
  );
};

export default ExtensionNav;
