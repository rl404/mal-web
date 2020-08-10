import React from 'react'
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

import { makeStyles, useTheme } from '@material-ui/core/styles';
import navigation from './_nav'

const Sidebar = (props) => {
  const drawerWidth = props.dWidth;
  const useStyles = makeStyles((theme) => ({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    logoArea: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%"
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState([]);

  const toggleOpen = (key) => {
    setState({ ...state, [key]: !state[key] });
  };

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <Grid className={classes.logoArea} container justify="center" alignItems="center" >
          <Link to="/">
            <img src="/images/logo.png" alt="MyAnimeList" />
          </Link>
        </Grid>
      </div>
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {navigation.map((list) => {
          return (
            <div key={list.id}>
              <ListItem button onClick={() => toggleOpen(list.name)}>
                <ListItemIcon>
                  {list.icon}
                </ListItemIcon>
                <ListItemText primary={list.name} />
                {state[list.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={state[list.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {list.subItems.map((item) => {
                    return (
                      <ListItem button className={classes.nested} component={Link} to={item.link} key={item.id}>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    )
                  })}
                </List>
              </Collapse>
            </div>
          )
        })}
      </List>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mOpen}
          onClose={props.mToggle}
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
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default React.memo(Sidebar)