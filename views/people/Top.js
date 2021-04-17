import React from 'react'
import Grid from '@material-ui/core/Grid'
import { reparse } from '../../lib/api'
import * as cons from '../../lib/constant'
import Img from '../../components/image/Img'
import Ellipsis from '../../components/text/Ellipsis'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import { malToDate, parseTime } from '../../lib/utils'
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
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.link,
    },
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

  const refresh = async () => {
    const result = await reparse(cons.PEOPLE_TYPE, data.id)
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
            <a href={`${cons.MAL_URL}/${cons.PEOPLE_TYPE}/${data.id}`} target='_blank' rel='noopener noreferrer'>
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
            {data.givenName === '' ? null :
              <Typography >
                <span>Given Name:</span> {data.givenName}
              </Typography>
            }
            {data.familyName === '' ? null :
              <Typography >
                <span>Family Name:</span> {data.familyName}
              </Typography>
            }
            {data.alternativeNames.length === 0 ? null :
              <Typography >
                <span>Alternative names:</span> {data.alternativeNames.join(", ")}
              </Typography>
            }
            {malToDate(data.birthday) === '?' ? null :
              <Typography >
                <span>Birthday:</span> {malToDate(data.birthday)}
              </Typography>
            }
            {data.website === '' ? null :
              <Typography >
                <span>Website:</span> <a href={data.website} className={classes.link} target='_blank' rel='noopener noreferrer'>{data.website}</a>
              </Typography>
            }
            <Typography className={classes.synopsis}>
              <Ellipsis text={data.more} limit={1000} />
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
