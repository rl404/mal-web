import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import DualCard from '../../../components/card/Dual';
import { getEntryVA } from '../../../api';
import ErrorArea from '../../../components/error/Error';

const VoiceActors = (props) => {
  const data = props.data;

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getEntryVA(cons.PEOPLE_TYPE, data.id);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    <>
      {!state ? null : state.loading ? <VoiceActorLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            {!state.data || state.data.length === 0 ?
              <Typography>
                No voice acting role found.
              </Typography> :
              state.data.map((va, i) => {
                return (
                  <Grid item lg={4} md={6} xs={12} key={i}>
                    <DualCard
                      onClick={props.onClick}
                      left={{
                        id: va.anime.id,
                        type: cons.ANIME_TYPE,
                        name: va.anime.name,
                        image: va.anime.image,
                        detail: va.anime.role,
                      }}
                      right={{
                        id: va.character.id,
                        type: cons.CHAR_TYPE,
                        name: va.character.name,
                        image: va.character.image,
                        detail: va.character.role,
                      }}
                    />
                  </Grid>
                )
              })}
          </Grid>
      }
    </>
  );
};

VoiceActors.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default VoiceActors;

const VoiceActorLoading = () => {
  return (
    <Grid container spacing={1}>
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4, 5].map(i => {
          return (
            <Grid item lg={4} md={6} xs={12} key={i}>
              <Skeleton variant='rect' height={130} />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  );
};