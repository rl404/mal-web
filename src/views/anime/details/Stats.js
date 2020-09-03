import React from 'react'
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import * as cons from '../../../constant'
import { getEntryStats } from '../../../api';
import BarChart from '../../../components/chart/BarChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import StyledDivider from '../../../components/styled/Divider';
import ErrorArea from '../../../components/error/Error';
import StyledTitle from '../../../components/styled/Title';

const Statistics = (props) => {
  const data = props.data;

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getEntryStats(cons.ANIME_TYPE, data.id);
        if (result.status === cons.CODE_OK) {
          var d = result.data;
          d.orderedSummary = {
            'Watching': d.summary.watching,
            'Completed': d.summary.completed,
            'On-hold': d.summary.["on-hold"],
            'Dropped': d.summary.dropped,
            'Plan to watch': d.summary.plan_to_watch,
          };
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
      {!state ? null : state.loading ? <StatisticsLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<BarChartIcon />} title='Summary' />
              <BarChart
                data={Object.keys(state.data.orderedSummary).map(k => {
                  return {
                    key: k,
                    value: state.data.orderedSummary[k],
                  }
                })}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<BarChartIcon />} title='Score' />
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

export default Statistics;

const StatisticsLoading = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1].map(i => {
        return (
          <Grid item md={6} xs={12} key={i}>
            <Skeleton height={40} />
            <StyledDivider />
            <Skeleton variant='rect' height={200} />
          </Grid>
        );
      })}
    </Grid>
  );
};