import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';

const TotalDonut = (props) => {
  const { sessions } = props;
  const theme = useTheme();
  const { background, primary, secondary } = theme.palette;

  let totalExpectedSessionLength;
  if (sessions.length) {
    totalExpectedSessionLength = sessions.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }

  let total;
  if (sessions.length) {
    total = sessions.length;
  }

  let totalSuccessful = [];
  let totalFailed = [];

  if (sessions.length) {
    totalSuccessful = sessions.filter((session) => {
      return session.successful === true;
    });
    totalFailed = sessions.filter((session) => {
      return session.successful === false;
    });
  }

  const chart = {
    options: {
      dataLabels: { enabled: false },
      colors: [primary.main, secondary.main],
      labels: ['Successful', 'Failed'],
      legend: { show: false, position: 'bottom' },
      stroke: {
        show: true,
        colors: [background.paper],
      },
      chart: {
        toolbar: {
          show: false,
        },
        offsetX: -70,
        offsetY: -40,
      },
    },

    series: [totalSuccessful.length, totalFailed.length],
  };

  return (
    <div className="donut">
      <Chart
        options={chart.options}
        series={chart.series}
        type="donut"
        width="290"
      />
    </div>
  );
};

export default TotalDonut;
