import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { getEntryStatsHistory } from '../../api';
import * as cons from '../../constant';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import StyledTitle from '../styled/Title';
import Error from '../../components/error/Error';
import LineChart from '../chart/LineChart';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GradeIcon from '@material-ui/icons/Grade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',
    maxHeight: '90%',
    overflow: 'scroll',
  },
}));

const History = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const defaultState = {
    data: null,
    loading: true,
    error: null,
    show: false,
    entryType: '',
    entryId: 0,
  };

  const [state, setState] = React.useState(defaultState);

  const getData = async () => {
    const result = await getEntryStatsHistory(state.entryType, state.entryId);
    if (result.status === cons.CODE_OK) {
      setState({ ...state, data: result.data, loading: false });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  };

  React.useEffect(() => {
    if (state.entryId > 0) getData();
  }, [state.entryId]);

  const showModal = (type, id) => {
    setState({ ...defaultState, show: true, entryType: type, entryId: id });
  };

  const hideModal = () => {
    setState(defaultState);
  };

  React.useImperativeHandle(ref, () => {
    return { showModal: showModal };
  });

  return (
    <Modal
      className={classes.modal}
      open={state.show}
      onClose={hideModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={state.show}>
        <Paper className={classes.paper}>
          {state.loading ? <Loading /> :
            state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4}>
                  <StyledTitle icon={<EqualizerIcon />} title={'Rank'} />
                  <LineChart
                    prefix='#'
                    inverted
                    data={state.data.map(d => {
                      return {
                        key: d.month + '-' + d.year,
                        value: d.rank,
                      };
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <StyledTitle icon={<GradeIcon />} title={'Score'} />
                  <LineChart
                    float
                    data={state.data.map(d => {
                      return {
                        key: d.month + '-' + d.year,
                        value: d.score,
                      };
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <StyledTitle icon={<ThumbUpIcon />} title={'Popularity'} />
                  <LineChart
                    prefix='#'
                    inverted
                    data={state.data.map(d => {
                      return {
                        key: d.month + '-' + d.year,
                        value: d.popularity,
                      };
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <StyledTitle icon={<PersonIcon />} title={'Voter'} />
                  <LineChart
                    data={state.data.map(d => {
                      return {
                        key: d.month + '-' + d.year,
                        value: d.voter,
                      };
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <StyledTitle icon={<PersonIcon />} title={'Member'} />
                  <LineChart
                    data={state.data.map(d => {
                      return {
                        key: d.month + '-' + d.year,
                        value: d.member,
                      };
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <StyledTitle icon={<FavoriteIcon />} title={'Favorite'} />
                  <LineChart
                    data={state.data.map(d => {
                      return {
                        key: d.month + '-' + d.year,
                        value: d.favorite,
                      };
                    })}
                  />
                </Grid>
              </Grid>
          }
        </Paper>
      </Fade>
    </Modal>
  );
});

export default History;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3, 4, 5].map(k => {
        return (
          <Grid item md={6} xs={12} lg={4} key={k}>
            <Skeleton height={40} />
            <Skeleton variant='rect' height={200} />
          </Grid>
        )
      })}
    </Grid>
  )
}