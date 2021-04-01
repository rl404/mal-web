import React from 'react'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as cons from '../../lib/constant'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.appBar.background,
    color: theme.palette.appBar.color,
    boxShadow: theme.shadows[3],
  },
}))

const Format = (props) => {
  const classes = useStyles()
  return <Chip
    size="small"
    label={props.type === cons.ANIME_TYPE ?
      cons.ANIME_TYPES[props.format] :
      cons.MANGA_TYPES[props.format]}
    className={classes.root} />
}

Format.propTypes = {
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]).isRequired,
  format: PropTypes.number.isRequired,
}

export default Format