import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import Player from './Player';
import CreateSession from './Timer/CreateSession';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div id="main">
      <h3>Welcome, {username}</h3>
      <div id="container" display="inline">
        <CreateSession />
        <Player />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
