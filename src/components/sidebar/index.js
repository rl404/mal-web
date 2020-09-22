import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import PropTypes from 'prop-types';
import navigation from './_nav';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: theme.drawer.width,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: theme.drawer.width,
  },
  logoArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  logo: {
    width: '100%',
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [listState, setState] = React.useState([]);
  const toggleList = (key) => {
    setState({ ...listState, [key]: !listState[key] });
  };

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <Grid className={classes.logoArea} container justify='center' alignItems='center'>
          <Link to='/'>
            <img src={theme.logo.image} alt={process.env.REACT_APP_APP_NAME} className={classes.logo} />
          </Link>
        </Grid>
      </div>
      <Divider />
      <List component='nav'>
        {navigation.map((list) => {
          return (
            <div key={list.id}>
              <ListItem button onClick={() => toggleList(list.name)}>
                <ListItemIcon>
                  {list.icon}
                </ListItemIcon>
                <ListItemText primary={list.name} />
                {listState[list.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={listState[list.name]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {list.subItems.map((item) => {
                    return (
                      <ListItem button className={classes.nested} component={Link} to={item.link} key={item.id}>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          )
        })}
      </List>
    </>
  );

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden lgUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor='left'
          open={props.mobileState}
          onClose={props.mobileToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

Sidebar.propTypes = {
  mobileState: PropTypes.bool.isRequired,
  mobileToggle: PropTypes.func.isRequired,
};

export default React.memo(Sidebar);