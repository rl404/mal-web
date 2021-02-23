import React from 'react';
import { getEntryStats } from '../../api';
import * as cons from '../../constant';
import Error from '../../components/error/Error';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import StyledTitle from '../../components/styled/Title';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import BarChartIcon from '@material-ui/icons/BarChart';
import BarChart from '../../components/chart/BarChart';

const Stats = (props) => {
  const topState = props.state;

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getEntryStats(cons.ANIME_TYPE, topState.data.id);
    if (result.status === cons.CODE_OK) {
      var d = result.data;
      d.orderedSummary = {
        'Watching': d.summary.current,
        'Completed': d.summary.completed,
        'On-hold': d.summary.onHold,
        'Dropped': d.summary.dropped,
        'Plan to watch': d.summary.planned,
      };
      d.summary.total = d.summary.current + d.summary.completed + d.summary.onHold + d.summary.dropped + d.summary.planned;
      setState({ ...state, data: d, loading: false });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  }

  React.useEffect(() => {
    if (!topState.data) return;
    getData();
  }, [topState.data]);

  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <StyledTitle icon={<BarChartIcon />} title='Summary' subtitle={state.data.summary.total.toLocaleString()} />
              <BarChart
                data={Object.keys(state.data.orderedSummary).map(k => {
                  return {
                    key: k,
                    value: state.data.orderedSummary[k],
                  }
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTitle icon={<BarChartIcon />} title='Score' subtitle={Number(topState.data.score).toFixed(2)} />
              <BarChart
                data={Object.keys(state.data.score).map(k => {
                  return {
                    key: k,
                    value: state.data.score[k].vote,
                  }
                })}
              />
            </Grid>
          </Grid>
      }
    </>
  );
};

Stats.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Stats;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Skeleton height={40} />
        <Divider />
        <Skeleton variant='rect' height={200} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton height={40} />
        <Divider />
        <Skeleton variant='rect' height={200} />
      </Grid>
    </Grid>
  )
}