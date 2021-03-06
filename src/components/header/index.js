import React from 'react';
import HideOnScroll from './HideOnScroll';
import ThemeChanger from './ThemeChanger';
import QuickSearch from './QuickSearch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import GitHubIcon from '@material-ui/icons/GitHub';
import PaletteIcon from '@material-ui/icons/Palette';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.appBar.background,
    color: theme.palette.appBar.color,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.drawer.width}px)`,
      marginLeft: theme.drawer.width,
    },
  },
  menuButton: {
    color: theme.palette.appBar.color,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    color: theme.palette.appBar.color,
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  iconButton: {
    color: theme.palette.appBar.color,
  },
}));

const ThemeTooltop = withStyles((theme) => ({
  tooltip: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}))(Tooltip);

const Header = (props) => {
  const classes = useStyles();

  const [themeOpen, setThemeOpen] = React.useState(false);
  const toggleThemeOpen = () => {
    setThemeOpen(!themeOpen);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            onClick={props.mobileToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap />
          <QuickSearch />
          <ThemeTooltop
            title={<ThemeChanger changeTheme={props.changeTheme} />}
            open={themeOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            interactive
          >
            <IconButton onClick={toggleThemeOpen} className={classes.iconButton}>
              <PaletteIcon />
            </IconButton>
          </ThemeTooltop>
          <a href='https://github.com/rl404/mal-web' target='_blank' rel='noopener noreferrer'>
            <IconButton edge='end' className={classes.iconButton}>
              <GitHubIcon />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

Header.propTypes = {
};

export default React.memo(Header);