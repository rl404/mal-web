import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import EntryCard from '../../../components/card/Entry';

const Staff = (props) => {
  const data = props.data;

  return (
    <Grid container spacing={1}>
      {!data.staff ?
        <Typography>
          No anime staff position found.
        </Typography> :
        data.staff.map(anime => {
          return (
            <Grid item lg={3} md={4} xs={6} key={anime.id}>
              <EntryCard
                id={anime.id}
                type={cons.ANIME_TYPE}
                title={anime.name}
                image={anime.image}
                onClick={props.onClick}
                detail={[anime.role]}
              />
            </Grid>
          )
        })}
    </Grid>
  );
};

Staff.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Staff;