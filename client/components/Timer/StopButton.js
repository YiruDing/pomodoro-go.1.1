import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { endSession, updateSession } from '../../store/sessions';
import EndSessionWarning from './EndSessionWarning';
import { SessionContext } from '../../app';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
  buttonGrid: {
    marginTop: '15px',
  },
}));

export default connect(null, (dispatch) => {
  return {
    updateSession: (sessionId, sessionTime) =>
      dispatch(updateSession(sessionId, sessionTime)),
    endSession: (sessionId) => dispatch(endSession(sessionId)),
  };
})(function (props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    palette: { primary, secondary },
  } = theme;
  const { toggleTimer } = props;
  const currentSession = useSelector((state) => state.currentSession);
  const [open, setOpen] = React.useState(false);
  const { setSessionTime } = useContext(SessionContext);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleStop = (ev) => {
    handleClose();
    props.endSession(currentSession.id);
    chrome.runtime.sendMessage('kaghhmclljbnigfffgjhfbbbcpgenjoi', {
      message: 'timer',
      action: 'stop-timer',
      pause: false,
    });
    localStorage.setItem('sessionActive', false);
    localStorage.setItem('sessionTime', 0);

    clearInterval(window.timer);
    window.timer = null;
    setSessionTime(0);
    toggleTimer(ev);
  };

  return (
    <Grid>
      <Button
        onClick={handleOpen}
        style={{
          backgroundColor: '#9a6781',
          color: 'white',
          marginTop: '4px',
          marginLeft: '4px',
          marginBottom: '10px',
          zIndex: 1,
          position: 'relative',
          top: '181px',
          left: '185px',
        }}
      >
        stop
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <EndSessionWarning
          open={open}
          buttonGridStyle={classes.buttonGrid}
          paperStyle={classes.paperStyle}
          handleClose={handleClose}
          handleStop={handleStop}
        />
      </Modal>
    </Grid>
  );
});
