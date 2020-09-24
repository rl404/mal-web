import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getEntryCharacters } from '../../../api';
import ErrorArea from '../../../components/error/Error';
import EntryCard from '../../../components/card/Entry';

const useStyles = makeStyles((theme) => ({
  more: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  moreButton: {
    margin: theme.spacing(1),
  },
}));

const Characters = (props) => {
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
        const result = await getEntryCharacters(cons.MANGA_TYPE, data.id)
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data.slice(0, props.limit), loading: false });
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
      {!state ? null : state.loading ? <CharactersLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <>
            <Grid container spacing={1}>
              {!state.data || state.data.length === 0 ?
                <Typography>
                  No related character found.
              </Typography> :
                state.data.map(char => {
                  count++
                  if (count > state.show) {
                    return null;
                  } else {
                    return (
                      <Grid item lg={4} md={6} xs={12} key={char.id}>
                        <EntryCard
                          id={char.id}
                          type={cons.CHAR_TYPE}
                          title={char.name}
                          image={char.image}
                          onClick={props.onClick}
                          detail={[char.role]}
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
            <Skeleton variant='rect' height={130} />
          </Grid>
        )
      })}
    </Grid>
  );
};