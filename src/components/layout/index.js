import React from 'react';
import Header from '../header';
import Sidebar from '../sidebar';
import Content from './Content';
import customTheme from '../theme';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import SummaryDrawer from '../drawer/Summary';
import Footer from '../footer/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}))

const Layout = () => {
  const classes = useStyles();

  const [mobileState, setMobileState] = React.useState(false);
  const mobileToggle = () => {
    setMobileState(!mobileState);
  };

  const headerRef = React.useRef(null);
  const setTitle = (title) => {
    document.title = title
    headerRef.current.setTitle(title);
  };

  const summaryRef = React.useRef(null);
  const showEntryDrawer = (type, id) => {
    summaryRef.current.showDrawer(type, id);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <Header mobileToggle={mobileToggle} ref={headerRef} />
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