import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../constant';
import { capitalize } from '../../utils';
import StyledDivider from '../../components/styled/Divider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(0.5),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  typeInput: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
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
        '& a': {
          textDecoration: 'none',
          color: theme.palette.text.primary,
        },
      },
    },
  },
  queryInput: {
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
        width: 300,
      },
    },
  },
}));

const SearchHeader = (props) => {
  const classes = useStyles();

  const defaultAdvQuery = {
    score: 0,
    type: 0,
    status: 0,
    rating: 0,
    source: 0,
    season: '-',
    year: '',
    order: '-',
  };

  const [state, setState] = React.useState({
    type: props.type,
    query: '',
    advQuery: defaultAdvQuery,
    setting: false,
  });

  const changeType = (e) => {
    const t = e.target.value;
    setState({ ...state, type: t, advQuery: defaultAdvQuery, setting: false });
    props.updateQuery(t, state.query, defaultAdvQuery);
  };

  var timeout = 0
  const changeQuery = (e) => {
    const query = e.target.value
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setState({ ...state, query: query });
      props.updateQuery(state.type, query, state.advQuery);
    }, 1000);
  };

  const toggleSetting = () => {
    setState({ ...state, setting: !state.setting });
  };

  const changeScore = (e) => {
    const score = e.target.value;
    setState({ ...state, advQuery: { ...state.advQuery, score: score } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, score: score });
  };

  const changeFormat = (e) => {
    const format = e.target.value;
    setState({ ...state, advQuery: { ...state.advQuery, type: format } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, type: format });
  };

  const changeStatus = (e) => {
    const status = e.target.value;
    setState({ ...state, advQuery: { ...state.advQuery, status: status } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, status: status });
  };

  const changeRating = (e) => {
    const rating = e.target.value;
    setState({ ...state, advQuery: { ...state.advQuery, rating: rating } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, rating: rating });
  };

  const changeSource = (e) => {
    const source = e.target.value;
    setState({ ...state, advQuery: { ...state.advQuery, source: source } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, source: source });
  };

  const changeSeason = (e) => {
    const season = e.target.value;
    var year = state.advQuery.year;
    if (year.length < 4) {
      year = new Date().getFullYear();
    }

    setState({ ...state, advQuery: { ...state.advQuery, season: season, year: year } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, season: season, year: year });
  };

  const changeYear = (e) => {
    const year = e.target.value;
    setState({ ...state, advQuery: { ...state.advQuery, year: year } });
    if (year === '' || year.length === 4) {
      props.updateQuery(state.type, state.query, { ...state.advQuery, year: year });
    }
  };

  const changeOrder = (e) => {
    const order = e.target.value;
    setState({ ...state, advQuery: { ...state.advQuery, order: order } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, order: order });
  };

  var orderList = {
    [cons.ANIME_TYPE]: {
      'member': 'Member asc',
      '-': 'Member desc',
      'title': "Title asc",
      '-title': "Title desc",
      'score': "Score asc",
      '-score': "Score desc",
    },
    [cons.MANGA_TYPE]: {
      'member': 'Member asc',
      '-': 'Member desc',
      'title': "Title asc",
      '-title': "Title desc",
      'score': "Score asc",
      '-score': "Score desc",
    },
    [cons.CHAR_TYPE]: {
      'favorite': 'Favorite asc',
      '-': 'Favorite desc',
      'name': "Name asc",
      '-name': "Name desc",
    },
    [cons.PEOPLE_TYPE]: {
      'favorite': 'Favorite asc',
      '-': 'Favorite desc',
      'name': "Name asc",
      '-name': "Name desc",
    },
  }

  return (
    <>
      <Grid container alignItems='center' spacing={1} className={classes.root}>
        <Grid item xs>
          <Typography variant='h6'>
            <b>Search</b>
            <TextField
              select
              variant='outlined'
              value={state.type}
              onChange={changeType}
              size='small'
              className={classes.typeInput}
            >
              {cons.MAIN_TYPES.map((s) => (
                <MenuItem key={s} value={s}>
                  <b><Link to={`/search/${s}`} className={classes.link}>{capitalize(s)}</Link></b>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              placeholder='Search...'
              variant='outlined'
              defaultValue={state.query}
              onChange={changeQuery}
              size='small'
              className={classes.queryInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }} />
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label='Sort'
            value={state.advQuery.order}
            onChange={changeOrder}
            className={classes.sortInput}
          >
            {Object.keys(orderList[state.type]).map((key) => (
              <MenuItem key={key} value={key}>
                {orderList[state.type][key]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {state.type !== cons.ANIME_TYPE && state.type !== cons.MANGA_TYPE ? null :
          <Grid item>
            <Tooltip title='Advanced Query' placement='left'>
              <IconButton onClick={toggleSetting}>
                <TuneIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        }
      </Grid>
      <StyledDivider />
      {
        !state.setting ? null :
          <>
            <Grid container spacing={1}>
              <Grid lg={2} md={3} sm={4} xs={6} item>
                <TextField
                  select
                  label='Score'
                  value={state.advQuery.score}
                  onChange={changeScore}
                  fullWidth
                >
                  {[-0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                    <MenuItem key={s} value={s}>
                      {s === 0 ? 'any' : s}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid lg={2} md={3} sm={4} xs={6} item>
                <TextField
                  select
                  label='Type'
                  value={state.advQuery.type}
                  onChange={changeFormat}
                  fullWidth
                >
                  {state.type === cons.ANIME_TYPE ?
                    cons.ANIME_TYPES.map((v, k) => (
                      <MenuItem key={k} value={k}>
                        {k === 0 ? 'any' : v}
                      </MenuItem>
                    )) :
                    cons.MANGA_TYPES.map((v, k) => (
                      <MenuItem key={k} value={k}>
                        {k === 0 ? 'any' : v}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>

              <Grid lg={2} md={3} sm={4} xs={6} item>
                <TextField
                  select
                  label='Status'
                  value={state.advQuery.status}
                  onChange={changeStatus}
                  fullWidth
                >
                  {state.type === cons.ANIME_TYPE ?
                    cons.ANIME_STATUS.map((v, k) => (
                      <MenuItem key={k} value={k}>
                        {k === 0 ? 'any' : v}
                      </MenuItem>
                    )) :
                    cons.MANGA_STATUS.map((v, k) => (
                      <MenuItem key={k} value={k}>
                        {k === 0 ? 'any' : v}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </Grid>
              {state.type !== cons.ANIME_TYPE ? null :
                <>
                  <Grid lg={2} md={3} sm={4} xs={6} item>
                    <TextField
                      select
                      label='Rating'
                      value={state.advQuery.rating}
                      onChange={changeRating}
                      fullWidth
                    >
                      {cons.ANIME_RATINGS.map((v, k) => (
                        <MenuItem key={k} value={k}>
                          {k === 0 ? 'any' : v}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid lg={2} md={3} sm={4} xs={6} item>
                    <TextField
                      select
                      label='Source'
                      value={state.advQuery.source}
                      onChange={changeSource}
                      fullWidth
                    >
                      {cons.ANIME_SOURCES.map((v, k) => (
                        <MenuItem key={k} value={k}>
                          {k === 0 ? 'any' : v}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid lg={2} md={3} sm={4} xs={6} item>
                    <TextField
                      select
                      label='Season'
                      value={state.advQuery.season}
                      onChange={changeSeason}
                      fullWidth
                    >
                      <MenuItem value='-'>any</MenuItem>
                      {cons.SEASONS.map((v, k) => (
                        <MenuItem key={v} value={v}>
                          {capitalize(v)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              }

              <Grid lg={2} md={3} sm={4} xs={6} item>
                <TextField
                  label='Year'
                  value={state.advQuery.year}
                  placeholder='any'
                  onChange={changeYear}
                  fullWidth />
              </Grid>
            </Grid>
            <StyledDivider />
          </>
      }
    </>
  )
};

SearchHeader.propTypes = {
  updateQuery: PropTypes.func.isRequired,
};

export default SearchHeader;