import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as cons from '../../lib/constant'
import { ellipsis } from '../../lib/utils'
import CardContent from '@material-ui/core/CardContent'
import LazyLoad from 'react-lazyload'
import { useTheme } from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '35%',
    position: 'relative',
    backgroundImage: props => `url(${theme.overlay}), url(${props.props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    overflow: 'hidden',
    '&:hover': {
      marginTop: -theme.spacing(0.3),
    },
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    background: theme.palette.primary.main,
    backgroundImage: props => `url(${props.props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  actionArea: {
    height: '100%',
  },
  content: {
    position: 'absolute',
    top: 0,
  },
  detail: {
    color: theme.palette.grey[500],
  },
  user: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopWidth: 20,
    borderTopStyle: 'solid',
    borderTopColor: props => props.borderColor,
    borderLeftWidth: 20,
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
  },
  more: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  moreButton: {
    transform: props => props.state ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}))

const Entry = (props) => {
  const [state, setState] = React.useState(false)
  const toggleState = () => {
    setState(!state)
  }

  const theme = useTheme()

  const statusColor = {
    1: theme.palette.success.main,
    2: theme.palette.info.main,
    3: theme.palette.warning.main,
    4: theme.palette.error.main,
  }

  const borderColor = props.user ? statusColor[props.user.status] : ''

  const classes = useStyles({ props: props, state: state, borderColor: borderColor })

  return (
    <LazyLoad>
      <Card className={classes.root}>
        <Grid container className={classes.grid}>
          <Grid item xs={4} className={classes.image} />
          <Grid item xs={8}>
            <CardActionArea className={classes.actionArea} onClick={() => !props.onClick ? null : props.onClick(props.type, props.id)}>
              <CardContent className={classes.content}>
                <Typography variant="subtitle2">
                  <b>{ellipsis(props.title, 25)}</b>
                </Typography>
                {!props.detail ? null :
                  <Typography variant="caption" className={classes.detail}>
                    {props.detail ? props.detail : ''}
                  </Typography>
                }
              </CardContent>
            </CardActionArea>
            {!props.more || props.more.length === 0 ? null :
              <Tooltip title={props.tooltip ? props.tooltip : ''} placement='left'>
                <CardActions className={classes.more}>
                  <IconButton onClick={toggleState} className={classes.moreButton}>
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </Tooltip>
            }
            {!props.user ? null : <div className={classes.user} />}
          </Grid>
        </Grid>
      </Card>
      {!props.more || props.more.length === 0 ? null :
        <Collapse in={state} timeout="auto" unmountOnExit>
          {props.more.map((m, i) => {
            return (
              <Card className={classes.root} style={{ marginTop: theme.spacing(1), backgroundImage: `url(${theme.overlay}), url(${m.image})` }} key={i}>
                <Grid container className={classes.grid}>
                  <Grid item xs={4} className={classes.image} style={{ backgroundImage: `url(${m.image})` }} />
                  <Grid item xs={8}>
                    <CardActionArea className={classes.actionArea} onClick={() => !m.onClick ? null : m.onClick(m.type, m.id)}>
                      <CardContent className={classes.content}>
                        <Typography variant="subtitle2">
                          <b>{ellipsis(m.title, 25)}</b>
                        </Typography>
                        {!m.detail ? null :
                          <Typography variant="caption" className={classes.detail}>
                            {m.detail ? m.detail : ''}
                          </Typography>
                        }
                      </CardContent>
                      {!m.user ? null : <div className={classes.user} style={{
                        borderTopColor: statusColor[m.user.status],
                      }} />}
                    </CardActionArea>
                  </Grid>
                </Grid>
              </Card>
            )
          })}
        </Collapse>
      }
    </LazyLoad >
  )
}

Entry.propTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(cons.MAIN_TYPES),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  detail: PropTypes.string,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  more: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(cons.MAIN_TYPES),
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string,
    onClick: PropTypes.func,
    user: PropTypes.shape({
      status: PropTypes.number.isRequired,
    }),
  })),
  user: PropTypes.shape({
    status: PropTypes.number.isRequired,
  }),
}

export default Entry