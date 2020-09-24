import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getEntryAnime, getEntryManga } from '../../../api';
import ErrorArea from '../../../components/error/Error';
import EntryCard from '../../../components/card/Entry';
import StyledDivider from '../../../components/styled/Divider';

const useStyles = makeStyles((theme) => ({
  more: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  moreButton: {
    margin: theme.spacing(1),
  },
}));

const Ography = (props) => {
  const idRef = React.useRef(0);
  const data = props.data;
  const classes = useStyles();

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
    show: 20,
  });

  React.useEffect(() => {
    if ((state.data === null && state.error === null) || idRef.current !== data.id) {
      idRef.current = data.id;

      const getData = async () => {
        var result
        if (props.type === cons.ANIME_TYPE) {
          result = await getEntryAnime(cons.CHAR_TYPE, data.id)
        } else if (props.type === cons.MANGA_TYPE) {
          result = await getEntryManga(cons.CHAR_TYPE, data.id)
        }
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  var count = 0;
  const showMore = () => {
    setState({ ...state, show: state.show + 20 });
  };

  const showAll = () => {
    setState({ ...state, show: state.data.length });
  };

  return (
    <>
      {!state ? null : state.loading ? <OgraphyLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <>
            <Grid container spacing={1}>
              {!state.data || state.data.length === 0 ?
                <Typography>
                  No related {props.type} found.
              </Typography> :
                state.data.map(anime => {
                  count++
                  if (count > state.show) {
                    return null;
                  } else {
                    return (
                      <Grid item lg={4} md={6} xs={12} key={anime.id}>
                        <EntryCard
                          id={anime.id}
                          type={props.type}
                          title={anime.name}
                          image={anime.image}
                          detail={[anime.role]}
                          onClick={props.onClick}
                        />
                      </Grid>
                    )
                  }
                })}
            </Grid>
            {state.data.length <= state.show ? null :
              <div className={classes.more}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.moreButton}
                  onClick={showMore}>
                  Show more
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.moreButton}
                  onClick={showAll}>
                  Show all ({state.data.length})
                </Button>
              </div>
            }
          </>
      }
    </>
  );
};

Ography.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ography;

const OgraphyLoading = () => {
  return (
    <Grid container spacing={1}>
      <Skeleton height={40} width={150} />
      <StyledDivider />
      <Grid container spacing={1}>
        {[0, 1, 2, 3].map(i => {
          return (
            <Grid item lg={3} md={4} xs={6} key={i}>
              <Skeleton variant='rect' height={130} />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  );
};