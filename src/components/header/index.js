import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.gradient.main,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.drawer.width}px)`,
      marginLeft: theme.drawer.width,
    },
  },
  menuButton: {
    color: 'white',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    color: 'white',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    color: 'white',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    color: 'white',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  themeIcon: {
    color: theme.palette.common.white,
  },
}));

const Header = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const [titleState, setTitleState] = React.useState(process.env.REACT_APP_APP_NAME);
  const setTitle = (title) => {
    setTitleState(title);
  };

  React.useImperativeHandle(ref, () => {
    return { setTitle: setTitle };
  });

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={props.mobileToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography className={classes.title} variant='h6' noWrap>
          {titleState}
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>

        <IconButton onClick={props.darkToggle} className={classes.themeIcon}>
          {!props.darkState ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

      </Toolbar>
    </AppBar>
  )
})

Header.propTypes = {
  mobileToggle: PropTypes.func.isRequired,
  darkToggle: PropTypes.func.isRequired,
  darkState: PropTypes.bool.isRequired,
};

export default React.memo(Header);