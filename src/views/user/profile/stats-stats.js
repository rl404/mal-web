import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import BarChartIcon from '@material-ui/icons/BarChart';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getUserStats } from '../../../api';
import { statsToString } from '../../../utils';
import StyledTitle from '../../../components/styled/Title';
import BarChart from '../../../components/chart/BarChart';
import ErrorArea from '../../../components/error/Error';
import StyledStats from '../../../components/styled/Stats';
import StyledDivider from '../../../components/styled/Divider';

const StatsStats = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getUserStats(props.username);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data[props.type], loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    !state ? null : state.loading ? <StatsStatsLoading /> :
      state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
        <>
          <StyledTitle icon={<BarChartIcon />} title='Stats Summary' />
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <StyledStats data={state.data} type={props.type} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChart
                data={Object.keys(state.data).reduce((result, k) => {
                  if (k !== 'total' && k !== 'progress' && k !== 'score') {
                    result.push({
                      key: statsToString(k, props.type),
                      value: state.data[k],
                    })
                  }
                  return result;
                }, [])}
              />
            </Grid>
          </Grid>
        </>
  )
};

export default StatsStats;

StatsStats.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
};

const StatsStatsLoading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton height={40} width={150} />
        <StyledDivider />
      </Grid>
      <Grid item xs={12} md={6} container spacing={2}>
        <Grid item xs={12} sm={6}>
          {[0, 1, 2, 3, 4].map(i => {
            return <Skeleton height={30} key={i} />
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {[0, 1, 2].map(i => {
            return <Skeleton height={30} key={i} />
          })}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant='rect' height={200} />
      </Grid>
    </Grid>
  )
};