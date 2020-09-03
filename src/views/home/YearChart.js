import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';

import { getYearlyScore } from '../../api';
import * as cons from '../../constant';
import ErrorArea from '../../components/error/Error';
import StyledTitle from '../../components/styled/Title';
import StyledTitleLoading from '../../components/styled/loading/Title';

const YearChart = () => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getYearlyScore();
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    <>
      {!state ? null : state.loading ? <YearChartLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<BarChartIcon />} title='Anime Count' />
              <BarChart
                data={Object.keys(state.data).map(k => {
                  return {
                    key: k,
                    value: state.data[k].anime.count,
                  }
                }).slice(-10)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<BarChartIcon />} title='Manga Count' />
              <BarChart
                data={Object.keys(state.data).map(k => {
                  return {
                    key: k,
                    value: state.data[k].manga.count,
                  }
                }).slice(-10)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<TimelineIcon />} title='Anime Score' />
              <LineChart
                data={Object.keys(state.data).map(k => {
                  return {
                    key: k,
                    value: state.data[k].anime.avgScore,
                  }
                }).slice(-10)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<TimelineIcon />} title='Manga Score' />
              <LineChart
                data={Object.keys(state.data).map(k => {
                  return {
                    key: k,
                    value: state.data[k].manga.avgScore,
                  }
                }).slice(-10)}
              />
            </Grid>
          </Grid>
      }
    </>
  );
};

export default YearChart;

const YearChartLoading = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3].map(key => {
        return (
          <Grid item md={6} xs={12} key={key}>
            <StyledTitleLoading />
            <Skeleton variant="rect" height={200} />
          </Grid>
        )
      })}
    </Grid>
  );
};