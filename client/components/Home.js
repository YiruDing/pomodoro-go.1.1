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
  const {
    palette: { text },
  } = theme;
  return (
    <div id="main">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={6} lg={4}>
          <CreateSession />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            marginLeft: '10rem',
          }}
        >
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
