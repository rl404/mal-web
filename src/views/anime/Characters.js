import React from 'react';
import PropTypes from 'prop-types';
import { getEntryCharacters } from '../../api';
import * as cons from '../../constant';
import Grid from '@material-ui/core/Grid';
import Entry from '../../components/card/Entry';
import Error from '../../components/error/Error';
import InfiniteScroll from '../../components/scroll/InfiniteScroll';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Characters = (props) => {
  const topState = props.state;

  const [state, setState] = React.useState({
    page: 1,
    data: [],
    error: null,
  });

  const getData = async () => {
    const result = await getEntryCharacters(cons.ANIME_TYPE, topState.data.id, state.page);
    if (result.status === cons.CODE_OK) {
      if (result.data.length > 0) {
        setState({ ...state, page: state.page + 1, data: !state.data ? result.data : state.data.concat(result.data) });
      }
    } else {
      setState({ ...state, error: { code: result.status, message: result.message } });
    }
    setIsLoading(false)
  };

  const [isLoading, setIsLoading] = InfiniteScroll(getData);

  React.useEffect(() => {
    if (!topState.data) return;
    getData();
  }, [topState.data]);

  return (
    <>
      {state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
        <Grid container spacing={1} >
          {state.data.length === 0 ?
            <Grid item xs={12}>
              <Typography>
                No related character.
              </Typography>
            </Grid> :
            state.data.map(c => {
              return (
                <Grid item md={4} sm={6} xs={12} key={c.id}>
                  <Entry
                    id={c.id}
                    type={cons.CHAR_TYPE}
                    title={c.name}
                    title2={c.voiceActors[0] ? c.voiceActors[0].name : null}
                    image={c.image}
                    image2={c.voiceActors[0] ? c.voiceActors[0].image : null}
                    onClick={props.showEntryDrawer}
                    detail={c.role}
                    detail2={c.voiceActors[0] ? c.voiceActors[0].role : null}
                  />
                </Grid>
              )
            })}
          {isLoading &&
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress size={30} />
            </Grid>
          }
        </Grid>
      }
    </>
  );
};

Characters.propTypes = {
  state: PropTypes.object.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Characters;
