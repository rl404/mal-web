import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as cons from '../../constant';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  sort: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 100,
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();

  const [queryState, setQueryState] = React.useState(props.query.query);
  const changeQuery = (e) => {
    setQueryState(e.target.value);
  };

  const [errorState, setErrorState] = React.useState('');
  const setError = (str) => {
    setErrorState(str);
  };

  const [orderState, setOrderState] = React.useState(props.query.order);
  const changeOrder = (e) => {
    const order = e.target.value;
    setOrderState(order)
    props.setQuery({ order: order });
  };

  const [helpState, setHelpState] = React.useState(false);
  const closeHelp = () => { setHelpState(false) }
  const openHelp = () => { setHelpState(true) }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (queryState.length === 0 || queryState.length > 2) {
        props.setQuery({ query: queryState });
        setError('');
      } else {
        setError('at least 3 letters');
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [queryState]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='h6'>
          Adaptation Score Comparison
          <ClickAwayListener onClickAway={closeHelp}>
            <Tooltip
              placement='right'
              onClose={closeHelp}
              open={helpState}
              interactive
              title='Comparing score between novel/light novel, anime, and manga adaptation.
              Only contains adaptations that are adapted from novel/light novel.'
            >
              <IconButton onMouseEnter={openHelp} onClick={openHelp}>
                <HelpOutlineIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Typography>
      </Grid>
      <Grid item xs>
        <TextField
          label='Novel/Light Novel Title'
          placeholder='search...'
          variant='outlined'
          size='small'
          margin="dense"
          onChange={changeQuery}
          value={queryState}
          helperText={errorState}
          error={errorState !== ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          select
          variant='outlined'
          label='Sort'
          size='small'
          margin="dense"
          value={orderState}
          onChange={changeOrder}
          className={classes.sort}
        >
          {Object.keys(cons.ORDERS['comparison']).map(k => (
            <MenuItem key={k} value={k}>
              {cons.ORDERS['comparison'][k]}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.shape({
    query: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
};

export default Header;