import React from 'react'
import Grid from '@material-ui/core/Grid'
import { reparse } from '../../lib/api'
import * as cons from '../../lib/constant'
import Img from '../../components/image/Img'
import Ellipsis from '../../components/text/Ellipsis'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import { parseTime } from '../../lib/utils'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: props => `url(${theme.overlay}), url(${props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    overflow: 'hidden',
  },
  content: {
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  altTitle: {
    color: theme.palette.grey[500],
    '& span': {
      fontWeight: 'bold',
    },
  },
  message: {
    marginTop: theme.spacing(0.6),
  },
  synopsis: {
    whiteSpace: 'pre-wrap',
  },
}))

const Top = (props) => {
  const data = props.data

  var classes = useStyles(data)

  const [altState, setAltState] = React.useState(false)
  const toggleAlt = () => {
    setAltState(!altState)
  }

  const refresh = async () => {
    const result = await reparse(cons.CHAR_TYPE, data.id)
    setRefreshState({ loading: false, message: !result.data || result.data === '' ? result.message : result.data })
  }

  const [refreshState, setRefreshState] = React.useState({
    loading: false,
    message: '',
  })
  var timeout = 0
  const onClickRefresh = () => {
    setRefreshState({ ...refreshState, loading: true })
    refresh()
    clearTimeout(timeout)
    timeout = setTimeout(() => { setRefreshState({ ...refreshState, message: '' }) }, 5000)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3} className={classes.image}>
        <Img src={data.image} alt={data.name} height={300} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={1} className={classes.content}>
          <Grid item xs>
            <Typography variant='h6'>
              <b>{data.name}</b>
              {data.nicknames.length === 0 && data.japaneseName === '' ? null :
                <Tooltip title='Alternative titles' placement='right'>
                  <IconButton size='small' onClick={toggleAlt}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </Tooltip>
              }
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" className={classes.message}>
              Favorites: {data.favorite.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2' className={classes.message}>
              {refreshState.message}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip placement='bottom-end' title={parseTime(props.meta.parsedAt, 'YYYY-MM-DD HH:mm:ss')}>
              {refreshState.loading ?
                <CircularProgress color='inherit' size={15} className={classes.message} /> :
                <IconButton size='small' onClick={onClickRefresh}>
                  <RefreshIcon />
                </IconButton>
              }
            </Tooltip>
          </Grid>
          <Grid item>
            <a href={`${cons.MAL_URL}/${cons.CHAR_TYPE}/${data.id}`} target='_blank' rel='noopener noreferrer'>
              <Tooltip placement='bottom-end' title='MyAnimeList Page'>
                <IconButton size='small'>
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
            </a>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={1} className={classes.content}>
          <Grid item xs={12}>
            {data.nicknames.length === 0 || !altState ? null :
              <Typography className={classes.altTitle}>
                <span>Nicknames:</span> {data.nicknames.join(", ")}
              </Typography>
            }
            {data.japaneseName === '' || !altState ? null :
              <Typography className={classes.altTitle}>
                <span>Japanese Name:</span> {data.japaneseName}
              </Typography>
            }
            <Typography className={classes.synopsis}>
              <Ellipsis text={data.about} limit={1000} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Top.propTypes = {
  data: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export default Top
