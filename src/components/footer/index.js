import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.gradient.main,
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0,
  },
}));

const Footer = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return <div className={classes.root} />
});

export default Footer;