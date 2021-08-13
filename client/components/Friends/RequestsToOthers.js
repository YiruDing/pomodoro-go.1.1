import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getMyRequestToOthers } from '../../store/getFriends';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

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

const RequestsToOthers = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getMyRequestToOthers(props.auth.id);
  }, [props.newFriendRequest]);

  const myRequests = props.myRequests?.filter(
    (each) => each.friendship.requestStatus === 'pending'
  );

  return (
    <div id="my-request" className={props.className}>
      <ul>
        {myRequests.length > 0 ? (
          myRequests.map((each, idx) => {
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
                <CardActions></CardActions>
              </Card>
            );
          })
        ) : (
          <h3>No requests found</h3>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // auth: state.auth,
    myRequests: state.myRequests,
    newFriendRequest: state.newFriendRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyRequestToOthers: (userId) => {
      dispatch(getMyRequestToOthers(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsToOthers);
