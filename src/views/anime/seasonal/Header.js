import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import EcoIcon from '@material-ui/icons/Eco';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getCurrentSeason, capitalize } from '../../../utils';
import StyledDivider from '../../../components/styled/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(0.5),
    background: theme.palette.background.default,
    position: 'sticky',
    top: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2),
      top: 64,
    },
    zIndex: 2,
  },
  top: {
    marginBottom: theme.spacing(0.5),
  },
  seasonInput: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
    '& .MuiInputBase-root': {
      fontFamily: theme.typography.h6.fontFamily,
      fontWeight: theme.typography.h6.fontWeight,
      fontSize: theme.typography.h6.fontSize,
      lineHeight: theme.typography.h6.lineHeight,
      letterSpacing: theme.typography.h6.letterSpacing,
      '& .MuiSelect-root': {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingRight: 14,
      },
      '& svg': {
        display: 'none',
      },
    },
  },
  yearInput: {
    verticalAlign: 'middle',
    '& .MuiInputBase-root': {
      fontFamily: theme.typography.h6.fontFamily,
      fontWeight: theme.typography.h6.fontWeight + 1,
      fontSize: theme.typography.h6.fontSize,
      lineHeight: theme.typography.h6.lineHeight,
      letterSpacing: theme.typography.h6.letterSpacing,
      '& .MuiInputBase-input': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: 50,
      },
    },
  },
}));

const SeasonalHeader = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    hentai: false,
    season: getCurrentSeason(),
    year: new Date().getFullYear(),
  });

  const changeYear = (e) => {
    var year = e.target.value
    if (year.length === 4 && parseInt(year) !== state.year) {
      setState({ ...state, year: year });
      props.updateSeasonYear(state.season, year);
    }
  };

  const setHentai = (e) => {
    setState({ ...state, hentai: e.target.checked });
    props.setHentai(e.target.checked);
  };

  const changeSeason = (e) => {
    setState({ ...state, season: e.target.value });
    props.updateSeasonYear(e.target.value, state.year);
  };

  var iconMap = {
    [cons.SEASON_WINTER]: <AcUnitIcon />,
    [cons.SEASON_SPRING]: <LocalFloristIcon />,
    [cons.SEASON_SUMMER]: <BeachAccessIcon />,
    [cons.SEASON_FALL]: <EcoIcon />,
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.top}>
        <Grid item xs={12} sm='auto'>
          <Typography variant='h6'>
            {iconMap[state.season]}
            <b> Anime</b>
          </Typography>
        </Grid>
        <Grid item xs sm>
          <Typography variant='h6'>
            <TextField
              select
              variant='outlined'
              value={state.season}
              onChange={changeSeason}
              size='small'
              className={classes.seasonInput}
            >
              {cons.SEASONS.map((s) => (
                <MenuItem key={s} value={s}>
                  <b>{capitalize(s)}</b>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant='outlined'
              defaultValue={state.year}
              onChange={changeYear}
              size='small'
              className={classes.yearInput} />
          </Typography>
        </Grid>
        <Grid item xs='auto'>
          <FormControlLabel
            control={<Checkbox checked={state.hentai}
              onChange={setHentai}
              name='hentai'
              color='primary' />}
            label='R18+'
          />
        </Grid>
      </Grid>
      <StyledDivider />
    </div>
  );
};

SeasonalHeader.propTypes = {
  updateSeasonYear: PropTypes.func.isRequired,
  setHentai: PropTypes.func.isRequired,
};

export default SeasonalHeader;