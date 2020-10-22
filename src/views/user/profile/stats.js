import React from 'react';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import StatsStats from './stats-stats';
import StatsType from './stats-type';
import StatsScore from './stats-score';
import StatsGenre from './stats-genre';
import StatsStudioAuthor from './stats-studio-author';
import StatsProgress from './stats-progress';
import StatsYear from './stats-year';

const Stats = (props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <StatsStats username={props.username} type={props.type} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatsType username={props.username} type={props.type} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatsScore username={props.username} type={props.type} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatsProgress username={props.username} type={props.type} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatsYear username={props.username} type={props.type} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatsGenre username={props.username} type={props.type} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatsStudioAuthor username={props.username} type={props.type} onClick={props.onClick} />
      </Grid>
    </Grid>
  )
};

export default Stats;

Stats.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
  onClick: PropTypes.func.isRequired,
};
