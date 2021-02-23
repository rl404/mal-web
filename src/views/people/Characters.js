import React from 'react';
import PropTypes from 'prop-types';
import { getEntryVA } from '../../api';
import * as cons from '../../constant';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Entry from '../../components/card/Entry';
import Error from '../../components/error/Error';
import InfiniteScroll from '../../components/scroll/InfiniteScroll';
import CircularProgress from '@material-ui/core/CircularProgress';

const Characters = (props) => {
  const topState = props.state;

  const [state, setState] = React.useState({
    page: 1,
    data: [],
    error: null,
  });

  const getData = async () => {
    const result = await getEntryVA(cons.PEOPLE_TYPE, topState.data.id, state.page);
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
                No related character/anime.
              </Typography>
            </Grid> :
            state.data.map((c, i) => {
              return (
                <Grid item md={4} sm={6} xs={12} key={i}>
                  <Entry
                    id={c.character.id}
                    type={cons.CHAR_TYPE}
                    title={c.character.name}
                    image={c.character.image}
                    title2={c.anime.name}
                    image2={c.anime.image}
                    onClick={props.showEntryDrawer}
                    detail={c.character.role}
                    detail2={c.anime.role}
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