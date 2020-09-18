import React from 'react';
import Header from '../header';
import Sidebar from '../sidebar';
import Content from './Content';
import Footer from '../footer';
import getTheme from '../theme';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import SummaryDrawer from '../drawer/Summary';

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
}))

const Layout = () => {
  const classes = useStyles();

  const [mobileState, setMobileState] = React.useState(false);
  const mobileToggle = () => {
    setMobileState(!mobileState);
  };

  const [darkState, setDarkState] = React.useState(false);
  const darkToggle = () => {
    setDarkState(!darkState);
  };

  const headerRef = React.useRef(null);
  const setTitle = (title) => {
    headerRef.current.setTitle(title);
  };

  const summaryRef = React.useRef(null);
  const showEntryDrawer = (type, id) => {
    summaryRef.current.showDrawer(type, id);
  };

  return (
    <ThemeProvider theme={darkState ? getTheme('dark') : getTheme('light')}>
      <CssBaseline />
      <div className={classes.root}>
        <Header mobileToggle={mobileToggle} darkToggle={darkToggle} darkState={darkState} ref={headerRef} />
        <Sidebar mobileState={mobileState} mobileToggle={mobileToggle} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            <Content setTitle={setTitle} showEntryDrawer={showEntryDrawer} />
          </Container>
          <Footer />
        </main>
        <SummaryDrawer ref={summaryRef} />
      </div>
    </ThemeProvider>
  );
}

export default Layout;