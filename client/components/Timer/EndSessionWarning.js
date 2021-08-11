import React from 'react';
import { Fade, Grid, Typography, Button } from '@material-ui/core';
const EndSessionWarning = (props) => {
  return (
    <Fade in={props.open}>
      <div className={props.paperStyle}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              color="textPrimary"
              variant="h5"
              id="transition-modal-title"
            >
              Warning!!!!
            </Typography>
            <Typography color="textPrimary" variant="p">
              If you stop the focus session, this session will be considered
              unsuccessful! Do you want to end the session?
            </Typography>
          </Grid>
          <Grid item className={props.buttonGridStyle}>
            <Button
              onClick={props.handleClose}
              style={{
                backgroundColor: '#5061a9',
                color: 'white',
                marginLeft: '4px',
              }}
            >
              Go back
            </Button>
            <Button
              onClick={props.handleStop}
              style={{
                backgroundColor: '#9a6781',
                color: 'white',
                marginLeft: '8px',
              }}
            >
              End Session
            </Button>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default EndSessionWarning;
