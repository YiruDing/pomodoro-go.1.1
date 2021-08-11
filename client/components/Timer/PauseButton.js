import React from 'react';
import { Grid, Button } from '@material-ui/core';

const PauseButton = (props) => {
  const { setShowStart, setSessionActive } = props;
  return (
    <Grid>
      <Button
        onClick={(ev) => {
          setShowStart(true);
          chrome.runtime.sendMessage('kaghhmclljbnigfffgjhfbbbcpgenjoi', {
            message: 'stop-timer',
            pause: true,
          });
          clearInterval(window.timer);
          window.timer = null;
          localStorage.setItem('sessionActive', false);
          setSessionActive(false);
        }}
        style={{
          backgroundColor: '#5061a9',
          color: 'white',
          marginLeft: '4px',
          marginBottom: '10px',
          zIndex: 1,
          position: 'relative',
          top: '185px',
          left: '185px',
        }}
      >
        pause
      </Button>
    </Grid>
  );
};

export default PauseButton;
