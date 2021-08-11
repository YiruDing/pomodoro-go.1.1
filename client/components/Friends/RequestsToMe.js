import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getRequestsToMe } from '../../store/getFriends';
import { approveFriend } from '../../store/addFriend';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Avatar,
  Snackbar,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  tabDisplay: {
    display: 'none',
  },
  card: {
    width: 400,
    margin: 10,
    padding: 10,
    border: '1px solid #ccb8b8',
    background: 'linear-gradient(110deg, #d5d7ef 60%, #9298ce 60%)',
    boxShadow: '0 3px 5px 2px #e4ddee',
  },
  avatar: {
    backgroundColor: 'black',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const RequestsToMe = (props) => {
  console.log(props);
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    props.getRequestsToMe(props.auth.id);
  }, [props.newFriendRequest]);

  const approveRequest = (requesteeId, requesterId) => {
    props.approveFriend(requesteeId, requesterId);
    setSuccessOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  const requestsToMe = props.requestsToMe?.filter(
    (each) => each.friendship.requestStatus === 'pending'
  );

  return (
    <div id="requests-to-me" className={props.className}>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          They are now added as your friend and will appear in your friend list.
        </Alert>
      </Snackbar>
      {requestsToMe.length > 0 ? (
        requestsToMe.map((each, idx) => {
          return (
            <Card className={classes.card} key={idx}>
              <CardContent>
                <Avatar className={classes.avatar}>
                  <FaceIcon />
                </Avatar>
                <b>Username</b> | {each.username}
                <br />
                <b>Approval status</b> | {each.friendship?.requestStatus}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => approveRequest(props.auth.id, each.id)}
                >
                  <DoneOutlineIcon />
                  &nbsp;Approve friend request
                </Button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <>
          <h3>No requests found</h3>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // auth: state.auth,
    requestsToMe: state.requestsToMe,
    newFriendRequest: state.newFriendRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestsToMe: (userId) => {
      dispatch(getRequestsToMe(userId));
    },
    approveFriend: (requesteeId, requesterId) => {
      dispatch(approveFriend(requesteeId, requesterId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsToMe);
