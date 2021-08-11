import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/getAllUsers';
import { addFriend } from '../../store/addFriend';
import { existingRequest } from '../../../utils/helper';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Card,
  CardActions,
  CardContent,
  Button,
  InputAdornment,
  Avatar,
  Snackbar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FaceIcon from '@material-ui/icons/Face';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    margin: 10,
    padding: 10,
    border: '1px solid #ccb8b8',
    background: 'linear-gradient(110deg, #F7F5F6 60%, #d39d98 60%)',
    boxShadow: '0 3px 5px 2px #E3BCBC',
  },
  tabDisplay: {
    display: 'none',
  },
  requestStatus: {
    color: '#9da2b6',
    margin: 0,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  searchBar: {
    width: '80%',
  },
  avatar: {
    backgroundColor: 'black',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const AddFriends = (props) => {
  const classes = useStyles();
  const [searchValues, setSearchValues] = useState({
    searchWord: '',
  });
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    props.getAllUsers();
  }, [props.newFriendRequest]);

  const dynamicSearch = () => {
    if (searchValues.searchWord !== '') {
      return props.allUsers.filter((each) =>
        each.username
          .toLowerCase()
          .includes(searchValues.searchWord.toLowerCase())
      );
    } else {
      return [];
    }
  };

  const sendFriendRequest = (requesterId, requesteeId) => {
    props.addFriend(requesterId, requesteeId);
    setSuccessOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  return (
    <div id="add-friend" className={props.className}>
      <h3>Friend search</h3>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          Friend request sent!
        </Alert>
      </Snackbar>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="friend-search"
          label="Enter username"
          variant="outlined"
          type="search"
          name="search"
          placeholder="Type out the user you are looking for!"
          className={classes.searchBar}
          onChange={(ev) => setSearchValues({ searchWord: ev.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <div>
        <div id="dynamicSearch">
          {dynamicSearch()
            .slice(0, 10)
            .map((each, idx) => {
              return (
                <Card className={classes.card} key={idx}>
                  <CardContent>
                    <Avatar className={classes.avatar}>
                      <FaceIcon />
                    </Avatar>
                    <b>Username</b> | {each.username}
                    <br />
                    <b>Email</b> | {each.email}
                  </CardContent>
                  <CardActions>
                    {existingRequest(props.auth.username, each) === false ? (
                      <Button
                        size="small"
                        onClick={() =>
                          sendFriendRequest(props.auth.id, each.id)
                        }
                      >
                        <PersonAddIcon />
                        &nbsp;Add
                      </Button>
                    ) : (
                      <h5 className={classes.requestStatus}>
                        {existingRequest(props.auth.username, each)}
                      </h5>
                    )}
                  </CardActions>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
    newFriendRequest: state.newFriendRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
    addFriend: (requesterId, requesteeId) => {
      dispatch(addFriend(requesterId, requesteeId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
