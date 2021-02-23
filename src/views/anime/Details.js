import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Info from './Info';
import Stats from './Stats';
import Related from './Related';
import Character from './Character';
import Song from './Song';
import Staff from './Staff';

const Details = (props) => {
  const state = props.state;
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Info state={state} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stats state={state} />
          </Grid>
          <Grid item xs={12}>
            <Related state={state} showEntryDrawer={props.showEntryDrawer} />
          </Grid>
          <Grid item xs={12}>
            <Character state={state} showEntryDrawer={props.showEntryDrawer} />
          </Grid>
          <Grid item xs={12}>
            <Staff state={state} showEntryDrawer={props.showEntryDrawer} />
          </Grid>
          <Grid item xs={12}>
            <Song state={state} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  state: PropTypes.object.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Details;
