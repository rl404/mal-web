import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import DualCard from '../../../components/card/Dual';

const VoiceActors = (props) => {
  const data = props.data;

  return (
    <Grid container spacing={1}>
      {!data.voiceActors ?
        <Typography>
          No voice acting role found.
        </Typography> :
        data.voiceActors.map((va, i) => {
          return (
            <Grid item lg={4} md={6} xs={12} key={i}>
              <DualCard
                onClick={props.onClick}
                left={{
                  id: va.anime.id,
                  type: cons.ANIME_TYPE,
                  name: va.anime.title,
                  image: va.anime.cover,
                  detail: va.character.role,
                }}
                right={{
                  id: va.character.id,
                  type: cons.CHAR_TYPE,
                  name:  va.character.name,
                  image: va.character.image,
                  detail: va.character.language,
                }}
              />
            </Grid>
          )
        })}
    </Grid>
  );
};

VoiceActors.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default VoiceActors;