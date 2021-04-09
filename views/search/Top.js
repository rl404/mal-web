import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import * as cons from '../../lib/constant'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TuneIcon from '@material-ui/icons/Tune'
import Tooltip from '@material-ui/core/Tooltip'
import { capitalize } from '../../lib/utils'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  sort: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 100,
    },
  },
}))

const Top = (props) => {
  const classes = useStyles()

  const [errorState, setErrorState] = React.useState('')
  const setError = (str) => {
    setErrorState(str)
  }

  const [queryState, setQueryState] = React.useState(props.query.query)
  const changeQuery = (e) => {
    setQueryState(e.target.value)
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (queryState.length === 0 || queryState.length > 2) {
        setError('')
        if (props.ready) {
          props.setQuery({ query: queryState })
        }
      } else {
        setError('at least 3 letters')
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [queryState])

  const [orderState, setOrderState] = React.useState(props.query.order)
  const changeOrder = (e) => {
    const order = e.target.value
    setOrderState(order)
    if (props.ready) {
      props.setQuery({ order: order })
    }
  }

  React.useEffect(() => {
    if (props.readyTop) return
    setQueryState(props.query.query)
    setOrderState(props.query.order)
    props.setReadyTop(true)
  }, [props.query])

  return (
    <Grid container spacing={1}>
      <Grid item className={classes.title}>
        <Typography variant='h6'>
          Search {capitalize(props.sType)}
        </Typography>
      </Grid>
      <Grid item xs>
        <TextField
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
          {cons.ORDERS[props.sType] ? Object.keys(cons.ORDERS[props.sType]).map(k => (
            <MenuItem key={k} value={k}>
              {cons.ORDERS[props.sType][k]}
            </MenuItem>
          )) : null}
        </TextField>
      </Grid>
      {props.sType === cons.CHAR_TYPE || props.sType === cons.PEOPLE_TYPE ? null :
        <Grid item xs={1} sm='auto'>
          <Tooltip title='Advanced Query' placement='left'>
            <IconButton onClick={props.toggleAdv}>
              <TuneIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      }
    </Grid>
  )
}

Top.propTypes = {
  sType: PropTypes.oneOf(cons.MAIN_TYPES).isRequired,
  toggleAdv: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.shape({
    query: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
}

export default Top