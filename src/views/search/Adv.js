import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import * as cons from '../../constant';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { capitalize } from '../../utils';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getProducers, getGenres } from '../../api';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const Adv = (props) => {
  const [producerState, setProducerState] = React.useState({
    options: [],
    optionMap: [],
  });

  const getProducerData = async () => {
    const result = await getProducers(props.sType);
    if (result.status === cons.CODE_OK) {
      var m = [];
      result.data.forEach(k => { m[k.id] = k.name })
      setProducerState({
        ...producerState,
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

  const [genreState, setGenreState] = React.useState({
    options: [],
    optionMap: [],
  });
  const [genre2State, setGenre2State] = React.useState({
    options: [],
    optionMap: [],
  });

  const getGenreData = async () => {
    const result = await getGenres(props.sType);
    if (result.status === cons.CODE_OK) {
      var m1 = [];
      result.data.forEach(k => { m1[k.id] = k.name })
      var m2 = [];
      result.data.forEach(k => { m2[k.id * -1] = k.name })
      setGenreState({
        ...genreState,
        options: result.data,
        optionMap: m1,
      });
      setGenre2State({
        ...genre2State,
        options: result.data.map(o => ({
          ...o,
          id: o.id * -1,
        })),
        optionMap: m2,
      });
    }
  };

  const [scoreState, setScoreState] = React.useState(0)
  const changeScore = (e) => {
    const score = e.target.value;
    setScoreState(score);
    props.setQuery({ score: score });
  };

  const [typeState, setTypeState] = React.useState(0)
  const changeType = (e) => {
    const type = e.target.value;
    setTypeState(type);
    props.setQuery({ type: type });
  };

  const [statusState, setStatusState] = React.useState(props.query.status)
  const changeStatus = (e) => {
    const status = e.target.value;
    setStatusState(status);
    props.setQuery({ status: status });
  };

  const [ratingState, setRatingState] = React.useState(0)
  const changeRating = (e) => {
    const rating = e.target.value;
    setRatingState(rating);
    props.setQuery({ rating: rating });
  };

  const [sourceState, setSourceState] = React.useState(0)
  const changeSource = (e) => {
    const source = e.target.value;
    setSourceState(source);
    props.setQuery({ source: source });
  };

  const [seasonState, setSeasonState] = React.useState('-')
  const [yearState, setYearState] = React.useState('')
  const changeSeason = (e) => {
    const season = e.target.value;
    var year = yearState;
    if (year.length < 4) {
      year = new Date().getFullYear();
    }
    setSeasonState(season);
    setYearState(year);
    props.setQuery({ season: season, year: year });
  };
  const changeYear = (e) => {
    const rex = /^[0-9\b]+$/;
    const year = e.target.value;
    if (year === '' || rex.test(year)) {
      setYearState(year);
      if (year === '' || year.length === 4) {
        props.setQuery({ year: year });
        if (year === '' && seasonState != '-') {
          setYearState(new Date().getFullYear());
        }
      }
    }
  };

  const [producerIdState, setProducerIdState] = React.useState(null);
  const changeProducer = (v) => {
    var pid = 0;
    if (v && v.id) pid = v.id;
    setProducerIdState({
      id: pid,
      name: producerState.optionMap[pid],
    });
    props.setQuery({
      producer: props.sType === cons.ANIME_TYPE ? pid : null,
      magazine: props.sType === cons.MANGA_TYPE ? pid : null,
    })
  }

  const [genreIdState, setGenreIdState] = React.useState([]);
  const changeGenre = (v) => {
    var gid = [];
    if (v && v.length > 0) {
      gid = v.map(g => g.id);
    }
    setGenreIdState(gid);
    props.setQuery({ genre: gid });
  }

  const [genreId2State, setGenreId2State] = React.useState([]);
  const changeGenre2 = (v) => {
    var gid = [];
    if (v && v.length > 0) {
      gid = v.map(g => g.id);
    }
    setGenreId2State(gid);
    props.setQuery({ genre2: gid });
  }

  React.useEffect(() => {
    getProducerData();
    getGenreData();
    setScoreState(0);
    setTypeState(props.query.type);
    setStatusState(props.query.status);
    setRatingState(0);
    setSourceState(0);
    setSeasonState(props.query.season);
    setYearState('');
    setGenreIdState(!props.query.genre ? [] : props.query.genre);
    setGenreId2State([]);
  }, [props.sType]);

  React.useEffect(() => {
    setProducerIdState(!props.query.producer ? null : {
      id: props.query.producer,
      name: producerState.optionMap[props.query.producer],
    });
  }, [producerState]);

  return (
    <Grid container spacing={1}>
      <Grid item lg={2} md={3} sm={4} xs={6}>
        <Autocomplete
          options={producerState.options.sort((a, b) => -b.letter.localeCompare(a.letter))}
          getOptionLabel={(option) => !option.name ? '' : option.name}
          groupBy={(option) => option.letter}
          onChange={(e, v) => changeProducer(v)}
          getOptionSelected={(o, v) => o.id === v.id}
          value={producerIdState}
          renderInput={params =>
            <TextField
              {...params}
              InputProps={params.InputProps}
              label={props.sType === cons.ANIME_TYPE ? 'Producer/Studio/Licensor' : 'Magazine/Serialization'}
              fullWidth
              value={producerState}
            />
          }
        />
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={6}>
        <TextField
          select
          label='Score'
          value={scoreState}
          onChange={changeScore}
          fullWidth
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
            <MenuItem key={s} value={s}>
              {s === 0 ? 'any' : s}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={6}>
        <TextField
          select
          label='Type'
          value={typeState}
          onChange={changeType}
          fullWidth
        >
          {props.sType === cons.ANIME_TYPE ?
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
      <Grid item lg={2} md={3} sm={4} xs={6}>
        <TextField
          select
          label='Status'
          value={statusState}
          onChange={changeStatus}
          fullWidth
        >
          {props.sType === cons.ANIME_TYPE ?
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
      {props.sType !== cons.ANIME_TYPE ? null :
        <>
          <Grid item lg={2} md={3} sm={4} xs={6}>
            <TextField
              select
              label='Rating'
              value={ratingState}
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
          <Grid item lg={2} md={3} sm={4} xs={6}>
            <TextField
              select
              label='Source'
              value={sourceState}
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
          <Grid item lg={2} md={3} sm={4} xs={6}>
            <TextField
              select
              label='Season'
              value={seasonState}
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
      <Grid item lg={2} md={3} sm={4} xs={6}>
        <TextField
          label='Year'
          placeholder='any'
          value={yearState}
          onChange={changeYear}
          fullWidth />
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={6}>
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={genreState.options}
          getOptionLabel={(option) => !option.name ? '' : option.name}
          onChange={(e, v) => changeGenre(v)}
          getOptionSelected={(o, v) => o.id === v.id}
          value={genreIdState.map(g => ({ id: g, name: genreState.optionMap[g] }))}
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
      <Grid item lg={2} md={3} sm={4} xs={6}>
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={genre2State.options}
          getOptionLabel={(option) => !option.name ? '' : option.name}
          onChange={(e, v) => changeGenre2(v)}
          getOptionSelected={(o, v) => o.id === v.id}
          value={genreId2State.map(g => ({ id: g, name: genre2State.optionMap[g] }))}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                color='primary'
                icon={<CheckBoxOutlineBlankIcon color='secondary' fontSize="small" />}
                checkedIcon={<CheckBoxIcon color='secondary' fontSize="small" />}
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
  );
};

Adv.propTypes = {
  sType: PropTypes.oneOf(cons.MAIN_TYPES),
};

export default Adv;