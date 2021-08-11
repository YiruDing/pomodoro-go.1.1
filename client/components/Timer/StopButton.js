import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { SessionContext } from '../../app';
import { endSession, updateSession } from '../../store/sessions';

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
  const { updateSession, toggleTimer } = props;
  const { setCountDown } = useContext(SessionContext);
  const currentSession = useSelector((state) => state.currentSession);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleStop = (ev) => {
    handleClose();
    props.endSession(currentSession.id);
    clearInterval(window.timer);
    setCountDown(false);
    toggleTimer(ev);
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{
        backgroundColor: '#9a6781',
        color: 'white',
        marginTop:'4px',
        marginLeft:'4px',
        marginBottom: '10px',
        zIndex: 1,
        position: 'relative',
        top: '181px',
        left: '185px'
      }}>stop</Button>
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
        <Fade in={open}>
          <div className={classes.paper}>
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
              <Grid item className={classes.buttonGrid}>
                <Button onClick={handleClose} style={{
                  backgroundColor: '#5061a9',
                  color: 'white',
                  marginLeft:'4px',

                }}>Go back</Button>
                <Button onClick={handleStop} style={{
                  backgroundColor: '#9a6781',
                  color: 'white',
                  marginLeft:'8px'
                }}>End Session</Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
