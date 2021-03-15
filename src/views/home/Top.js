import React from 'react';
import Grid from '@material-ui/core/Grid';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { getSearch } from '../../api';
import * as cons from '../../constant';
import Error from '../../components/error/Error';
import StyledTitle from '../../components/styled/Title';
import Cover from '../../components/card/Cover';
import { useTheme, useMediaQuery } from '@material-ui/core';

const Top = (props) => {
  const theme = useTheme();

  var coverLimit = 7;
  if (useMediaQuery(theme.breakpoints.down('md'))) { coverLimit = 6 }
  if (useMediaQuery(theme.breakpoints.down('sm'))) { coverLimit = 5 }
  if (useMediaQuery(theme.breakpoints.down('xs'))) { coverLimit = 3 }

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getSearch(cons.ANIME_TYPE, '', 1, 10, props.advQuery);
    if (result.status === cons.CODE_OK) {
      setState({ ...state, data: result.data, loading: false });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!state ? null : state.loading ? <Loading limit={coverLimit} /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <>
            <StyledTitle
              icon={<EventAvailableIcon />}
              title={props.title}
              more={{
                text: 'view more',
                link: props.link,
              }}
            />
            <Grid container spacing={1}>
              {state.data.slice(0, coverLimit).map(anime => {
                return (
                  <Grid item key={anime.id} xs>
                    <Cover
                      id={anime.id}
                      type={cons.ANIME_TYPE}
                      title={anime.title}
                      image={anime.image}
                      score={anime.score}
                      format={anime.type}
                      onClick={props.showEntryDrawer}
                      user={props.animelist ? props.animelist[anime.id] : null}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </>
      }
    </>
  );
};

Top.propTypes = {
  advQuery: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
};

export default Top;

const Loading = (props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton height={40} />
      </Grid>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, props.limit).map(k => {
        return (
          <Grid item xs key={k}>
            <Skeleton variant='rect' height={200} />
          </Grid>
        )
      })}
    </Grid>
  );
};