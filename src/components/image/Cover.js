import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    width: 160,
    height: 220,
    objectFit: 'cover'
  },
}))

const Cover = (props) => {
  const classes = useStyles()

  return (
    <img src={props.src} alt={props.alt} className={classes.image} />
  )
}

export default Cover