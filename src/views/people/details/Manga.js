import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import * as cons from '../../../constant'
import EntryCard from '../../../components/card/Entry';

const Manga = (props) => {
  const data = props.data

  return (
    <Grid container spacing={1}>
      {!data.publishedManga ?
        <Typography>
          No published manga found.
        </Typography> :
        data.publishedManga.map(manga => {
          return (
            <Grid item lg={3} md={4} xs={6} key={manga.id}>
              <EntryCard
                id={manga.id}
                type={cons.MANGA_TYPE}
                title={manga.name}
                image={manga.image}
                onClick={props.onClick}
                detail={[manga.role]}
              />
            </Grid>
          )
        })}
    </Grid>
  );
};

Manga.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Manga;