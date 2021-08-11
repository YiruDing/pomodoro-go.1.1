import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import RequestsToMe from './RequestsToMe';
import RequestsToOthers from './RequestsToOthers';
import AddFriends from './AddFriends';
import FriendsSession from './FriendsSession';
import { socket } from '../../store/auth';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '75%',
    margin: '20px auto 20px auto',
    padding: 20,
    minHeight: 450,
  },
  tabs: {
    borderRadius: 15,
    boxShadow: '0 3px 5px 2px #ccb8b8',
    width: '80%',
    margin: '20px auto 20px auto',
  },
  card: {
    width: 400,
    margin: 10,
    padding: 10,
    background: 'linear-gradient(45deg, #f7f5f6 30%, #ccb8b8 90%)',
  },
  tabDisplay: {
    display: 'none',
  },
  tabFlex: {
    display: 'flex',
    width: '90%',
  },
  verticalTabs: {
    borderRight: '1px solid #ccb8b8',
    paddingRight: '15px',
    width: '25%',
  },
  tabDetail: {
    padding: 15,
    width: '75%',
  },
}));

const Friends = (props) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('my-friends');
  const [currentFriend, setCurrentFriend] = useState('Add friend');
  const [pendingCategory, setPendingCategory] = useState('From others to me');
  const [loggedInUsers, setLoggedInUsers] = useState({});

  const approvedFriends = (all) => {
    let result = all.filter((each) => {
      return each.friendship.requestStatus === 'approved';
    });
    return result;
  };

  const allApprovedFriends = [
    ...approvedFriends(props.myRequests),
    ...approvedFriends(props.requestsToMe),
  ];

  const isOnline = (user) => {
    for (let key in loggedInUsers) {
      if (loggedInUsers[key] === user.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    socket.emit('get all loggedin users');
  }, []);

  socket.on('other login', (data) => {
    console.log('someome else', data);
  });

  socket.on('send all logged in users', (data) => {
    // console.log('all logged in users', data);
    setLoggedInUsers({ ...data });
  });

  console.log(loggedInUsers);

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={currentTab}
          centered
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
        >
          <Tab
            label="Friends"
            value="my-friends"
            onClick={() => setCurrentTab('my-friends')}
          />
          <Tab
            label="Pending requests"
            value="pending-requests"
            onClick={() => setCurrentTab('pending-requests')}
          />
        </Tabs>
        <div
          id="friend-list"
          className={
            currentTab === 'my-friends' ? classes.tabFlex : classes.tabDisplay
          }
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currentFriend}
            className={classes.verticalTabs}
          >
            <Tab
              value="Add friend"
              label="✨ Add friend"
              onClick={() => setCurrentFriend('Add friend')}
            />
            {allApprovedFriends.map((each, idx) => {
              return (
                <Tab
                  value={each.username}
                  label={each.username}
                  key={idx}
                  onClick={() => setCurrentFriend(each.username)}
                />
              );
            })}
            ;
          </Tabs>
          <div id="friend-detail" className={classes.tabDetail}>
            <AddFriends
              value="Add friend"
              className={
                currentFriend === 'Add friend' ? undefined : classes.tabDisplay
              }
              auth={props.auth}
            />
            {allApprovedFriends.map((each, idx) => {
              return (
                <div
                  key={idx}
                  value={each.username}
                  className={
                    currentFriend === each.username
                      ? undefined
                      : classes.tabDisplay
                  }
                >
                  {/* <p>{isOnline(each) ? 'online':'offline'}</p> */}
                  <FriendsSession friend={each} onlineStatus={isOnline(each)} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          id="pending-requests"
          className={
            currentTab === 'pending-requests'
              ? classes.tabFlex
              : classes.tabDisplay
          }
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={pendingCategory}
            className={classes.verticalTabs}
          >
            <Tab
              value="From others to me"
              label="From others to me"
              onClick={() => setPendingCategory('From others to me')}
            />
            <Tab
              value="From me to others"
              label="From me to others"
              onClick={() => setPendingCategory('From me to others')}
            />
          </Tabs>
          <div id="request-detail" className={classes.tabDetail}>
            <RequestsToMe
              auth={props.auth}
              className={
                pendingCategory === 'From others to me'
                  ? undefined
                  : classes.tabDisplay
              }
            />
            <RequestsToOthers
              auth={props.auth}
              className={
                pendingCategory === 'From me to others'
                  ? undefined
                  : classes.tabDisplay
              }
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    myRequests: state.myRequests,
    requestsToMe: state.requestsToMe,
    allUsers: state.allUsers,
  };
};

export default connect(mapStateToProps)(Friends);
