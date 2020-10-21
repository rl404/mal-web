import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CheckIcon from '@material-ui/icons/Check';
import PauseIcon from '@material-ui/icons/Pause';
import ClearIcon from '@material-ui/icons/Clear';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import StarIcon from '@material-ui/icons/Star';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import PropTypes from 'prop-types';
import * as cons from '../../constant';
import { statsToString } from '../../utils';

const StyledStats = (props) => {
  const statsIcon = {
    'current': <PlayArrowIcon color='primary' fontSize='small' />,
    'completed': <CheckIcon color='primary' fontSize='small' />,
    'onHold': <PauseIcon color='primary' fontSize='small' />,
    'dropped': <ClearIcon color='primary' fontSize='small' />,
    'planned': <EventNoteIcon color='primary' fontSize='small' />,
    'total': <FormatListBulletedIcon color='primary' fontSize='small' />,
    'progress': props.type === cons.ANIME_TYPE ? <TheatersIcon color='primary' fontSize='small' /> : <MenuBookIcon color='primary' fontSize='small' />,
    'score': <StarIcon color='primary' fontSize='small' />,
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={1}>
          {Object.keys(props.data).map(k => {
            if (k === 'total' || k === 'progress' || k === 'score') { return null }
            return <React.Fragment key={k}>
              <Grid item xs={8} container spacing={1}>
                <Grid item>{statsIcon[k]}</Grid>
                <Grid item><Typography> {statsToString(k, props.type)}</Typography></Grid>
              </Grid>
              <Grid item xs={4} align='right'>
                <Typography>{props.data[k].toLocaleString()}</Typography>
              </Grid>
            </React.Fragment>
          })}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={1}>
          {Object.keys(props.data).map(k => {
            if (k !== 'total' && k !== 'progress' && k !== 'score') { return null }
            return <React.Fragment key={k}>
              <Grid item xs={8} container spacing={1}>
                <Grid item>{statsIcon[k]}</Grid>
                <Grid item><Typography> {statsToString(k, props.type)}</Typography></Grid>
              </Grid>
              <Grid item xs={4} align='right'>
                <Typography>{k === 'score' ? Number(props.data[k]).toFixed(2) : props.data[k].toLocaleString()}</Typography>
              </Grid>
            </React.Fragment>
          })}
        </Grid>
      </Grid>
    </Grid>
  )
};

export default StyledStats;

StyledStats.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
};