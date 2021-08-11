import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const CurrentPlayback = (props) => {
  const { content, currPlayback } = props;
  return (
    <CardContent className={content}>
      <Typography component="h5" variant="h5">
        {currPlayback.item
          ? currPlayback.item.name
          : 'Nothing is playing right now'}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {currPlayback.item ? currPlayback.item.artists[0].name : undefined}
      </Typography>
    </CardContent>
  );
};

export default CurrentPlayback;
