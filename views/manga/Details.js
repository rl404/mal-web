import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Info from './Info'
import Stats from './Stats'
import Related from './Related'
import Character from './Character'

const Details = (props) => {
  const data = props.data
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Info data={data} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stats data={data} />
          </Grid>
          <Grid item xs={12}>
            <Related data={data} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} mangalist={props.mangalist} />
          </Grid>
          <Grid item xs={12}>
            <Character data={data} showEntryDrawer={props.showEntryDrawer} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Details.propTypes = {
  data: PropTypes.object.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default Details
