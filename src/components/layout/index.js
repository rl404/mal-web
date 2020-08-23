import React from 'react'
import Header from '../header'
import Sidebar from '../sidebar'
import Content from './Content'

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const drawerWidth = 240;

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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Header dWidth={drawerWidth} mToggle={handleDrawerToggle} />
      <Sidebar dWidth={drawerWidth} mOpen={mobileOpen} mToggle={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <Content />
        </Container>
      </main>
    </div>
  )
}

export default Layout