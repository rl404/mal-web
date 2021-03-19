import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Content from './Content';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
}));

const Comparison = (props) => {
  const classes = useStyles();

  const [queryState, setQueryState] = React.useState({
    query: '',
    order: 'title',
  });
  const setQuery = (query) => {
    setQueryState({
      ...queryState,
      ...query,
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header
          setQuery={setQuery}
          query={queryState} />
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <Content
          query={queryState}
          showEntryDrawer={props.showEntryDrawer}
          animelist={props.animelist}
          mangalist={props.mangalist} />
      </Grid>
    </Grid>
  );
};

Comparison.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
};

export default Comparison;