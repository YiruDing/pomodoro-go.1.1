import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
});

//This component displays either the Session History or Session Frequency charts
// depending on what is selected from the dropdown menu
const BlocksLine = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { blocks } = props;
  console.log('blocks:',blocks)
  const primaryColor = theme.palette.primary.main;
  const errorColor = theme.palette.error.main;

  //Session History Chart
  let seriesBlocks = {

  };
  // sessions.forEach((session) => {
  //   const { startTime, successful } = session;
  //   const month = dayjs(startTime).format('MMM');
  //   if (successful === true) {
  //     seriesMonths[month].successful++;
  //   } else {
  //     seriesMonths[month].failed++;
  //   }
  // });

  // let monthsArr = [];
  // for (const [key, val] of Object.entries(seriesMonths)) {
  //   monthsArr.push(key);
  // }
  // let monthValsArr = [];
  // for (const [key, val] of Object.entries(seriesMonths)) {
  //   monthValsArr.push(val);
  // }

  // const monthData = {
  //   series: [
  //     {
  //       name: 'Successful',
  //       data: monthValsArr.map((val) => {
  //         return val.successful;
  //       }),
  //     },
  //     {
  //       name: 'Failed',
  //       data: monthValsArr.map((val) => {
  //         return val.failed;
  //       }),
  //     },
  //   ],
  //   categories: monthsArr,
  // };

  // const options = {
  //   colors: [primaryColor, errorColor],
  //   chart: {
  //     id: 'basic-line',
  //   },
  //   stroke: {
  //     curve: 'smooth',
  //     width: 1.5,
  //   },

  //   xaxis: {
  //     categories: [
  //       'Jan',
  //       'Feb',
  //       'Mar',
  //       'Apr',
  //       'May',
  //       'Jun',
  //       'Jul',
  //       'Aug',
  //       'Sep',
  //       'Oct',
  //       'Nov',
  //       'Dec',
  //     ],
  //     labels: {
  //       style: {
  //         colors: theme.palette.text.secondary,
  //       },
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       style: {
  //         colors: theme.palette.text.secondary,
  //       },
  //       formatter: function (val, index) {
  //         return val.toFixed(0);
  //       },
  //     },
  //   },
  // };
  // const series = monthData.series;

  return (
    <Card className={classes.contain} {...props}>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography
            className={classes.lsItem}
            variant="h5"
            color="textPrimary"
          >
            {rightChart === 'Frequency' ? 'Session Frequency' : ''}
            {rightChart === 'History' ? 'Session History' : ''}
          </Typography>
          <Typography
            className={classes.lsItem}
            variant="caption"
            color="textSecondary"
          >
            {rightChart === 'Frequency' ? 'Time of Week' : ''}
            {rightChart === 'History' ? 'Monthly' : ''}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="misc-label">Display</InputLabel>
            <Select
              labelId="misc-label"
              value={rightChart}
              onChange={handleRightChartChange}
            >
              <MenuItem value={'Frequency'}>Frequency</MenuItem>
              <MenuItem value={'History'}>History</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Box
          sx={{
            height: 336,
            minWidth: 500,
            px: 2,
          }}
        >
          {rightChart === 'Frequency' ? (
            <Chart width="800" height="450" type="heatmap" {...chart} />
          ) : (
            ''
          )}
          {rightChart === 'History' ? (
            <Chart
              options={options}
              series={series}
              type="line"
              width="800"
              height="450"
            />
          ) : (
            ''
          )}
        </Box>
      </Grid>
    </Card>
  );
};

export default ChartRight;
