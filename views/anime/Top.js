import React from 'react'
import Grid from '@material-ui/core/Grid'
import { reparse } from '../../lib/api'
import * as cons from '../../lib/constant'
import Img from '../../components/image/Img'
import Ellipsis from '../../components/text/Ellipsis'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import { capitalize, parseTime } from '../../lib/utils'
import Link from 'next/link'
import Chip from '@material-ui/core/Chip'
import Stats from '../../components/card/Stats'
import PersonIcon from '@material-ui/icons/Person'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import GradeIcon from '@material-ui/icons/Grade'
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
  user: {
    height: 15,
    width: 15,
    borderRadius: '50%',
    display: 'block',
    position: 'relative',
    top: 7.5,
    marginLeft: theme.spacing(1),
  },
  message: {
    marginTop: theme.spacing(0.6),
  },
  synopsis: {
    whiteSpace: 'pre-wrap',
  },
  genre: {
    margin: theme.spacing(0.5),
  },
}))

const Top = (props) => {
  const data = props.data
  const theme = useTheme()
  var classes = useStyles(data)

  const statusColor = {
    1: theme.palette.success.main,
    2: theme.palette.info.main,
    3: theme.palette.warning.main,
    4: theme.palette.error.main,
    6: theme.palette.text.primary,
  }

  const [altState, setAltState] = React.useState(false)
  const toggleAlt = () => {
    setAltState(!altState)
  }

  const refresh = async () => {
    const result = await reparse(cons.ANIME_TYPE, data.id)
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
        <Img src={data.image} alt={data.title} height={300} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={1} className={classes.content}>
          <Grid item xs>
            <Typography variant='h6'>
              <b>{data.title}</b>
              {data.alternativeTitles.english === '' && data.alternativeTitles.japanese === '' && data.alternativeTitles.synonym === '' ? null :
                <Tooltip title='Alternative titles' placement='right'>
                  <IconButton size='small' onClick={toggleAlt}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </Tooltip>
              }
            </Typography>
          </Grid>
          {props.animelist && props.animelist[data.id] ?
            <Grid item>
              <Tooltip placement='bottom' title={cons.ANIME_USER_STATUS[props.animelist[data.id].status]}>
                <span className={classes.user} style={{ backgroundColor: statusColor[props.animelist[data.id].status] }} />
              </Tooltip>
            </Grid>
            : null}
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
            <a href={`${cons.MAL_URL}/${cons.ANIME_TYPE}/${data.id}`} target='_blank' rel='noopener noreferrer'>
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
          {!altState ? null :
            <Grid item xs={12} className={classes.altTitle}>
              {Object.keys(data.alternativeTitles).map(key => {
                if (data.alternativeTitles[key] === '' || !altState) {
                  return null
                } else {
                  return (
                    <Typography key={key}>
                      <span>{capitalize(key)}:</span> {data.alternativeTitles[key]}
                    </Typography>
                  )
                }
              })}
            </Grid>
          }
          <Grid item xs={12}>
            <Typography className={classes.synopsis}>
              <Ellipsis text={data.synopsis} limit={1000} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {data.genres.map(genre => {
              return (
                <Link href={`/search/anime?genre=${genre.id}`} key={genre.id}>
                  <a>
                    <Chip size='small' label={genre.name} color='primary' className={classes.genre} clickable />
                  </a>
                </Link>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Stats
              icon={<EqualizerIcon />}
              data={'#' + data.rank.toLocaleString()}
              name='Rank'
              onClick={() => props.showHistoryModal(cons.ANIME_TYPE, data.id)}
            />
          </Grid>
          <Grid item xs>
            <Stats
              icon={<GradeIcon />}
              data={
                <Tooltip title={data.voter.toLocaleString() + ' voters'} placement='top'>
                  <b>{Number(data.score).toFixed(2)}</b>
                </Tooltip>}
              name='Score'
              onClick={() => props.showHistoryModal(cons.ANIME_TYPE, data.id)}
            />
          </Grid>
          <Grid item xs>
            <Stats
              icon={<ThumbUpIcon />}
              data={'#' + data.popularity.toLocaleString()}
              name='Popularity'
              onClick={() => props.showHistoryModal(cons.ANIME_TYPE, data.id)}
            />
          </Grid>
          <Grid item xs>
            <Stats
              icon={<PersonIcon />}
              data={data.member.toLocaleString()}
              name='Members'
              onClick={() => props.showHistoryModal(cons.ANIME_TYPE, data.id)}
            />
          </Grid>
          <Grid item xs>
            <Stats
              icon={<FavoriteIcon />}
              data={data.favorite.toLocaleString()}
              name='Favorites'
              onClick={() => props.showHistoryModal(cons.ANIME_TYPE, data.id)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Top.propTypes = {
  data: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  showHistoryModal: PropTypes.func.isRequired,
  animelist: PropTypes.object,
}

export default Top
