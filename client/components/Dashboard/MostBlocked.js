import React from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import BlocksDonut from './BlocksDonut';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    minHeight: 272,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
});

const MostBlocked = (props) => {
  const classes = useStyles();
  const { blackList } = props;

  function compareBlocks(a, b) {
    return b.blocks - a.blocks;
  }
  const sorted = blackList.sort(compareBlocks);

  const blocks = sorted.map((entry, idx) => entry.blocks);

  const maxBlocks = Math.max(...blocks) * 1;
  const mostBlocked = blackList.find((entry) => {
    return entry.blocks === maxBlocks;
  });

  const topThree = sorted.filter((entry, idx) => {
    return idx < 3;
  });
  return (
    <Paper className={classes.contain} elevation={10}>
      <Typography className={classes.lsItem} variant="h5" color="textPrimary">
        Most Blocked
      </Typography>
      <Grid container>
        <Grid container item direction="column" xs={6}>
          {topThree.map((entry, idx) => {
            return (
              <Grid item key={idx} className={classes.lsItem} xs={4}>
                <Typography variant="caption" color="textSecondary">
                  {entry.site.name}
                </Typography>
                <Typography variant="h5">{entry.blocks}</Typography>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={6}>
          <BlocksDonut sortedBlackList={sorted} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MostBlocked;
