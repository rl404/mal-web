import React from 'react';
import Header from '../header';
import Content from './Content';
import Sidebar from '../sidebar';
import ScrollTop from '../header/ScrollTop';
import { getTheme } from '../theme';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Summary from '../drawer/Summary';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  const [mobileState, setMobileState] = React.useState(false);
  const mobileToggle = () => {
    setMobileState(!mobileState);
  };

  const defaultThemeState = localStorage.getItem('themeState') ? localStorage.getItem('themeState') : 'defaultTheme';
  const [themeState, setThemeState] = React.useState(defaultThemeState);
  const changeTheme = (name) => {
    setThemeState(name);
  };

  const summaryRef = React.useRef(null);
  const showEntryDrawer = (type, id) => {
    summaryRef.current.showDrawer(type, id);
  };

  return (
    <ThemeProvider theme={getTheme(themeState)}>
      <CssBaseline />
      <div className={classes.root}>
        <Header changeTheme={changeTheme} mobileToggle={mobileToggle} />
        <Sidebar mobileState={mobileState} mobileToggle={mobileToggle} />
        <main className={classes.content}>
          <div className={classes.toolbar} id='top-anchor' />
          <Container>
            <Content showEntryDrawer={showEntryDrawer} />
          </Container>
        </main>
        <ScrollTop {...props} />
      </div>
      <Summary ref={summaryRef} />
    </ThemeProvider>
  );
}

export default Layout;