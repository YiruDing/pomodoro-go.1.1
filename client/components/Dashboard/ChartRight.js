import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    // flexGrow: 1,
    height: 525,
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
});

//This component displays either the Session History or Session Frequency charts
// depending on what is selected from the dropdown menu
const ChartRight = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { sessions } = props;
  const { blocks } = props;
  const { sites } = props;

  const [rightChart, setRightChart] = useState('Frequency');
  //set colors so that the charts are connected to the Mui theme
  const primaryColor = theme.palette.primary.main;
  const errorColor = theme.palette.error.main;
  const backgroundPaper = theme.palette.background.paper;

  const handleRightChartChange = (event) => {
    setRightChart(event.target.value);
  };

  //Session Frequency chart
  let totalExpectedSessionLength;
  if (sessions.length) {
    totalExpectedSessionLength = sessions.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }

  const distHours = [
    {
      name: '0',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '1',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '2',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '3',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '4',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '5',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '6',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '7',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '8',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '9',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '10',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '11',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '12',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '13',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '14',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '15',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '16',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '17',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '18',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '19',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '20',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '21',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '22',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '23',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
  ];

  if (sessions.length) {
    for (let i = 0; i < sessions.length; i++) {
      const dayOfWeek = dayjs(sessions[i].startTime).format('ddd');
      const time = dayjs(sessions[i].startTime).format('H');
      const timeSlot = distHours[time];
      const slotData = timeSlot.data;
      for (let j = 0; j < slotData.length; j++) {
        if (slotData[j].x === dayOfWeek) slotData[j].y++;
      }
    }
  }

  const chart = {
    options: {
      legend: {
        show: false,
      },
      chart: {
        background: 'transparent',
        toolbar: {
          show: true,
        },
      },
      colors: [primaryColor],
      dataLabels: {
        enabled: false,
      },

      grid: {
        // borderColor: backgroundPaper,
        position: 'front',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          show: true,
          lines: {
            show: true,
          },
        },
      },
      // theme: {
      //   palette: theme.pallete
      // },
      plotOptions: {
        heatmap: {
          // radius: 2,
          enableShades: true,
          shadeIntensity: 1,
          // reverseNegativeShade: true,
          // distributed: false,
          // useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: backgroundPaper,
                // foreColor: undefined,
                // name: undefined,
              },
            ],
            // inverse: false,
            // min: undefined,
            // max: undefined
          },
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: [backgroundPaper],
        width: 0.5,
        dashArray: 0,
      },
      tooltip: {
        enabled: true,

        y: {
          title: {
            formatter: function (val, index) {
              if (val) {
                return `${val}:00`;
              }
            },
          },
          formatter: function (val, index) {
            if (val) {
              if (val === 0) {
                return ' 0 sessions';
              }
              if (val === 1) {
                return ' 1 session';
              } else {
                return ` ${val} sessions`;
              }
            }
          },
        },
        z: {
          formatter: undefined,
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
          formatter: function (val, index) {
            if (val) {
              return `${val}:00`;
            }
          },
        },
      },
    },
    series: distHours,
  };

  //Session History Chart
  let seriesMonths = {
    Jan: { successful: 0, failed: 0 },
    Feb: { successful: 0, failed: 0 },
    Mar: { successful: 0, failed: 0 },
    Apr: { successful: 0, failed: 0 },
    May: { successful: 0, failed: 0 },
    Jun: { successful: 0, failed: 0 },
    Jul: { successful: 0, failed: 0 },
    Aug: { successful: 0, failed: 0 },
    Sep: { successful: 0, failed: 0 },
    Oct: { successful: 0, failed: 0 },
    Nov: { successful: 0, failed: 0 },
    Dec: { successful: 0, failed: 0 },
  };
  sessions.forEach((session) => {
    const { startTime, successful } = session;
    const month = dayjs(startTime).format('MMM');
    if (successful === true) {
      seriesMonths[month].successful++;
    } else {
      seriesMonths[month].failed++;
    }
  });

  let monthsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthsArr.push(key);
  }
  let monthValsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthValsArr.push(val);
  }

  const monthData = {
    series: [
      {
        name: 'Successful',
        data: monthValsArr.map((val) => {
          return val.successful;
        }),
      },
      {
        name: 'Failed',
        data: monthValsArr.map((val) => {
          return val.failed;
        }),
      },
    ],
    categories: monthsArr,
  };

  const options = {
    colors: [primaryColor, errorColor],
    chart: {
      id: 'basic-line',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter: function (val, index) {
          return val.toFixed(0);
        },
      },
    },
  };
  const series = monthData.series;

  //Blocks History Line Graph
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let seriesMonthsBlocks = {};
  months.forEach((month) => {
    seriesMonthsBlocks[month] = {};
    sites.forEach((site) => {
      seriesMonthsBlocks[month][site.name] = 0;
    });
  });

  blocks.forEach((block) => {
    const {
      site: { name },
      date,
    } = block;
    const month = dayjs(date).format('MMM');
    seriesMonthsBlocks[month][name]++;
  });

  let blockMonthValsArr = [];
  for (const [key, val] of Object.entries(seriesMonthsBlocks)) {
    blockMonthValsArr.push(val);
  }
  // console.log('bMVA:', blockMonthValsArr);

  const monthDataBlocks = {
    series: [
      {
        name: 'Twitter',
        data: blockMonthValsArr.map((val) => {
          return val.Twitter;
        }),
      },
      {
        name: 'Facebook',
        data: blockMonthValsArr.map((val) => {
          return val.Facebook;
        }),
      },
      {
        name: 'Instagram',
        data: blockMonthValsArr.map((val) => {
          return val.Instagram;
        }),
      },
      {
        name: 'Hulu',
        data: blockMonthValsArr.map((val) => {
          return val.Hulu;
        }),
      },
      {
        name: 'Netflix',
        data: blockMonthValsArr.map((val) => {
          return val.Netflix;
        }),
      },
    ],
    categories: monthsArr,
  };

  const optionsBlocks = {
    colors: [primaryColor, errorColor],
    chart: {
      id: 'basic-line',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter: function (val, index) {
          return val.toFixed(0);
        },
      },
    },
  };
  const seriesBlocks = monthDataBlocks.series;
  return (
    <Paper className={classes.contain} {...props} elevation={10}>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography
            className={classes.lsItem}
            variant="h5"
            color="textPrimary"
          >
            {rightChart === 'Frequency' ? 'Session Frequency' : ''}
            {rightChart === 'Session History' ? 'Session History' : ''}
            {rightChart === 'Block History' ? 'Block History' : ''}
          </Typography>
          <Typography
            className={classes.lsItem}
            variant="caption"
            color="textSecondary"
          >
            {rightChart === 'Frequency' ? 'Time of Week' : ''}
            {rightChart === 'Session History' ? 'Monthly' : ''}
            {rightChart === 'Block History' ? 'Monthly' : ''}
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
              <MenuItem value={'Session History'}>Session History</MenuItem>
              <MenuItem value={'Block History'}>Block History</MenuItem>
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
          {rightChart === 'Session History' ? (
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
          {rightChart === 'Block History' ? (
            <Chart
              options={optionsBlocks}
              series={seriesBlocks}
              type="line"
              width="800"
              height="450"
            />
          ) : (
            ''
          )}
        </Box>
      </Grid>
    </Paper>
  );
};

export default ChartRight;
