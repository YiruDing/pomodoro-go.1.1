import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
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
  const theme = useTheme();
  const {palette: { text }} = theme;
  return (
    <div id="main">
      {/* <h3 style={{color: text.primary}}>Welcome, {username}!</h3> */}

      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={6}>
          <CreateSession />
        </Grid>
        <Grid item xs={6} >
          <Player />
        </Grid>
      </Grid>

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
