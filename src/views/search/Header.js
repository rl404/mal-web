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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../constant';
import { capitalize } from '../../utils';
import StyledDivider from '../../components/styled/Divider';
import { Link } from 'react-router-dom';
import { getGenres, getProducers } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    background: theme.palette.background.default,
    position: 'sticky',
    top: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
    zIndex: 2,
  },
  top: {
    marginBottom: theme.spacing(1),
  },
  adv: {
    paddingBottom: theme.spacing(2),
  },
  advIcon: {
    textAlign: 'right',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.h6.fontWeight + 1,
    width: '100%',
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
        maxWidth: 300,
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
    producer: props.producer,
    genre: props.genre,
    genre2: [],
    order: '-',
  };

  const [state, setState] = React.useState({
    type: props.type,
    query: '',
    advQuery: defaultAdvQuery,
    setting: false,
  });

  const [producerAuto, setProducerAuto] = React.useState({
    options: [],
    optionMap: [],
    loading: true,
  });

  const [genreAuto, setGenreAuto] = React.useState({
    options: [],
    optionMap: [],
    loading: true,
  });

  const [genre2Auto, setGenre2Auto] = React.useState({
    options: [],
    optionMap: [],
    loading: true,
  });

  const changeType = (e) => {
    const t = e.target.value;
    setState({ ...state, type: t, advQuery: { ...defaultAdvQuery, producer: 0, genre: [], genre2: [] }, setting: false });
    setProducerAuto({ options: [], optionMap: [], loading: true });
    setGenreAuto({ options: [], optionMap: [], loading: true });
    props.updateQuery(t, state.query, { ...defaultAdvQuery, producer: 0, genre: [], genre2: [] });
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

    if (producerAuto.options.length === 0) {
      const getOptions = async () => {
        const result = await getProducers(state.type);
        if (result.status === cons.CODE_OK) {
          var m = [];
          result.data.forEach(k => { m[k.id] = k.name })

          setProducerAuto({
            ...producerAuto,
            loading: false,
            options: result.data.map(o => {
              const letter = o.name[0].toUpperCase();
              return {
                letter: /[^a-zA-Z]/.test(letter) ? '0-9' : letter,
                ...o,
              }
            }),
            optionMap: m,
          });
        }
      };
      getOptions();
    }

    if (genreAuto.options.length === 0) {
      const getOptions = async () => {
        const result = await getGenres();
        if (result.status === cons.CODE_OK) {
          var m = [];
          result.data[state.type].forEach(k => { m[k.id] = k.name })

          setGenreAuto({
            ...genreAuto,
            loading: false,
            options: result.data[state.type],
            optionMap: m,
          });

          setGenre2Auto({
            ...genre2Auto,
            loading: false,
            options: result.data[state.type].map(o => ({
              ...o,
              id: o.id * -1,
            })),
            optionMap: m,
          });
        }
      };
      getOptions();
    }
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

  const changeProducer = (v) => {
    var producer = 0;
    if (v && v.id) {
      producer = v.id;
    }

    setState({ ...state, advQuery: { ...state.advQuery, producer: producer } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, producer: producer });
  };

  const changeGenre = (v) => {
    var genre = [];
    if (v && v.length > 0) {
      genre = v.map(g => g.id);
    }

    setState({ ...state, advQuery: { ...state.advQuery, genre: genre } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, genre: genre });
  }

  const changeGenre2 = (v) => {
    setState({ ...state, advQuery: { ...state.advQuery, genre2: v.map(g => g.id) } });
    props.updateQuery(state.type, state.query, { ...state.advQuery, genre2: v.map(g => g.id) });
  }

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
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='space-between' spacing={1} className={classes.top}>
        <Grid item xs={12} sm='auto' md='auto'>
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
                  <Link to={`/search/${s}`} className={classes.link}>{capitalize(s)}</Link>
                </MenuItem>
              ))}
            </TextField>
          </Typography>
        </Grid>
        <Grid item xs={12} sm='auto' md>
          <Typography variant='h6'>
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
        <Grid item xs={6} sm={6} md='auto' >
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
          <Grid item xs={6} sm={6} md='auto' className={classes.advIcon}>
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
            <Grid container spacing={2} className={classes.adv}>
              <Grid lg={2} md={3} sm={4} xs={6} item>
                <Autocomplete
                  loading={producerAuto.loading}
                  options={producerAuto.options.sort((a, b) => -b.letter.localeCompare(a.letter))}
                  getOptionLabel={(option) => !option.name ? '' : option.name}
                  groupBy={(option) => option.letter}
                  onChange={(e, v) => changeProducer(v)}
                  getOptionSelected={(o, v) => o.id === v.id}
                  value={!state.advQuery.producer || state.advQuery.producer === 0 ? null : { id: state.advQuery.producer, name: producerAuto.optionMap[state.advQuery.producer] }}

                  renderInput={params =>
                    <TextField
                      label={state.type === cons.ANIME_TYPE ? 'Producer/Studio/Licensor' : 'Magazine/Serialization'}
                      fullWidth
                      {...params}
                      value={state.advQuery.producer}
                      InputProps={params.InputProps}
                    />
                  }
                />
              </Grid>

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

              <Grid lg={2} md={3} sm={4} xs={6} item>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  loading={genreAuto.loading}
                  options={genreAuto.options}
                  getOptionLabel={(option) => !option.name ? '' : option.name}
                  onChange={(e, v) => changeGenre(v)}
                  getOptionSelected={(o, v) => o.id === v.id}
                  value={!state.advQuery.genre || state.advQuery.genre.length === 0 ? [] : state.advQuery.genre.map(g => ({ id: g, name: genreAuto.optionMap[g] }))}

                  renderOption={(option, { selected }) => (
                    <>
                      <Checkbox
                        color='primary'
                        icon={<CheckBoxOutlineBlankIcon color='primary' fontSize="small" />}
                        checkedIcon={<CheckBoxIcon color='primary' fontSize="small" />}
                        checked={selected} />
                      {option.name}
                    </>
                  )}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Included Genre'
                      placeholder='any'
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid lg={2} md={3} sm={4} xs={6} item>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  loading={genre2Auto.loading}
                  options={genre2Auto.options}
                  getOptionLabel={(option) => !option.name ? '' : option.name}
                  onChange={(e, v) => changeGenre2(v)}
                  getOptionSelected={(o, v) => o.id === v.id}

                  renderOption={(option, { selected }) => (
                    <>
                      <Checkbox
                        color='primary'
                        icon={<CheckBoxOutlineBlankIcon color='primary' fontSize="small" />}
                        checkedIcon={<CheckBoxIcon color='primary' fontSize="small" />}
                        checked={selected} />
                      {option.name}
                    </>
                  )}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Excluded Genre'
                      placeholder='any'
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <StyledDivider />
          </>
      }
    </div>
  )
};

SearchHeader.propTypes = {
  type: PropTypes.oneOf(cons.MAIN_TYPES).isRequired,
  producer: PropTypes.number.isRequired,
  genre: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateQuery: PropTypes.func.isRequired,
};

export default SearchHeader;