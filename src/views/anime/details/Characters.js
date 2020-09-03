import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getEntryCharacters } from '../../../api';
import ErrorArea from '../../../components/error/Error';
import DualCard from '../../../components/card/Dual';

const Characters = (props) => {
  const data = props.data;

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getEntryCharacters(cons.ANIME_TYPE, data.id)
        if (result.status === cons.CODE_OK) {
          var d = result.data;
          if (d !== null) {
            d = d.slice(0, props.limit);
          }
          setState({ ...state, data: d, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    <>
      {!state ? null : state.loading ? <CharactersLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            {!state.data ?
              <Typography>
                No related character found.
              </Typography> :
              state.data.map(char => {
                return (
                  <Grid item lg={4} md={6} xs={12} key={char.id}>
                    <DualCard
                      onClick={props.onClick}
                      left={{
                        id: char.id,
                        type: cons.CHAR_TYPE,
                        name: char.name,
                        image: char.image,
                        detail: char.role,
                      }}
                      right={!char.voiceActors ? null : {
                          id: char.voiceActors[0].id,
                          type: cons.PEOPLE_TYPE,
                          name: char.voiceActors[0].name,
                          image: char.voiceActors[0].image,
                          detail: char.voiceActors[0].role,
                        }
                      }
                    />
                  </Grid>
                )
              })}
          </Grid>
      }
    </>
  );
};

Characters.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  limit: PropTypes.number,
};

export default Characters;

const CharactersLoading = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3, 4, 5].map(i => {
        return (
          <Grid item lg={4} md={6} xs={12} key={i}>
            <Skeleton variant='rect' height={100} />
          </Grid>
        )
      })}
    </Grid>
  );
};