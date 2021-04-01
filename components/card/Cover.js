import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import * as cons from '../../lib/constant'
import { ellipsis } from '../../lib/utils'
import Score from '../badge/Score'
import Format from '../badge/Format'
import LazyLoad from 'react-lazyload'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '133%',
    position: 'relative',
    backgroundImage: props => `url(${props.props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: theme.spacing(0.5),
    background: theme.palette.transparent.black[70],
    color: theme.palette.common.white,
  },
  score: {
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  format: {
    display: 'block',
    position: 'absolute',
    top: 0,
  },
  user: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopWidth: 30,
    borderTopStyle: 'solid',
    borderTopColor: props => props.borderColor,
    borderLeftWidth: 30,
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
  },
  hover: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
}))

const Cover = (props) => {
  const [hoverState, setHoverState] = React.useState(false)
  const hover = () => { setHoverState(true) }
  const unhover = () => { setHoverState(false) }

  const theme = useTheme()

  const statusColor = {
    1: theme.palette.success.main,
    2: theme.palette.info.main,
    3: theme.palette.warning.main,
    4: theme.palette.error.main,
  }

  const borderColor = props.user ? statusColor[props.user.status] : ''

  const classes = useStyles({ hoverState: hoverState, props: props, borderColor: borderColor })

  return (
    <LazyLoad>
      <Card
        className={classes.root}
        raised={hoverState}
        onClick={() => !props.onClick ? null : props.onClick(props.type, props.id)}>
        <CardActionArea className={classes.content}>
          <CardContent className={classes.title}>
            <Typography variant='caption'>
              {hoverState ? props.title : ellipsis(props.title, 20)}
            </Typography>
          </CardContent>
          <CardContent className={classes.score}>
            {hoverState && props.score ? <Score score={props.score} /> : null}
          </CardContent>
          <CardContent className={classes.format}>
            {hoverState && props.format ? <Format type={props.type} format={props.format} /> : null}
          </CardContent>
          {!props.user ? null : <div className={classes.user} />}
          <CardContent
            onMouseEnter={hover}
            onMouseOut={unhover}
            className={classes.hover} />
        </CardActionArea>
      </Card>
    </LazyLoad>
  )
}

Cover.propTypes = {
  id: PropTypes.number,
  type: PropTypes.oneOf(cons.MAIN_TYPES),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  format: PropTypes.number,
  score: PropTypes.number,
  onClick: PropTypes.func,
  user: PropTypes.shape({
    status: PropTypes.number.isRequired,
  }),
}

export default Cover