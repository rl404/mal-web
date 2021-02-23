import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },
  icon: {
    color: theme.palette.icon,
  },
  viewMore: {
    textAlign: 'right',
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  subtitle: {
    color: theme.palette.grey[500],
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

const MoreButton = withStyles((theme) => ({
  root: {
    color: theme.palette.icon,
  },
}))(Button);

const StyledTitle = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState(false);
  const hover = () => { setState(true) }
  const unhover = () => { setState(false) }

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={1} className={classes.root}>
        <Grid item className={classes.icon}>
          {props.icon}
        </Grid>
        <Grid item onMouseEnter={hover} onMouseLeave={unhover}>
          <Typography variant="h6" className={classes.title}>
            <b>{props.title}</b>
            {!props.subtitle || props.subtitle === '' ? null :
              !state ? null :
                <span className={classes.subtitle}> - {props.subtitle}</span>
            }
          </Typography>
        </Grid>
        {!props.more ? null :
          <Grid item xs className={classes.viewMore}>
            <Link to={props.more.link} className={classes.link}>
              <MoreButton size="small" color="primary">{props.more.text}</MoreButton>
            </Link>
          </Grid>
        }
      </Grid>
      <Divider className={classes.divider} />
    </>
  );
};

StyledTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  more: PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default StyledTitle;