import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
    textAlign: 'center',
  },
}))

const Error = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {props.code} - {props.message}
    </div>
  )
}

Error.propTypes = {
  code: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
}

export default Error