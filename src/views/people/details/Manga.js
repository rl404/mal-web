import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../../constant'
import EntryCard from '../../../components/card/Entry';
import { getEntryManga } from '../../../api';
import ErrorArea from '../../../components/error/Error';

const useStyles = makeStyles((theme) => ({
  more: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  moreButton: {
    margin: theme.spacing(1),
  },
}));

const Manga = (props) => {
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
        const result = await getEntryManga(cons.PEOPLE_TYPE, data.id)
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
      {!state ? null : state.loading ? <MangaLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <>
            <Grid container spacing={1}>
              {!state.data || state.data.length === 0 ?
                <Typography>
                  No published manga found.
              </Typography> :
                state.data.map(manga => {
                  count++
                  if (count > state.show) {
                    return null;
                  } else {
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

Manga.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Manga;

const MangaLoading = () => {
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