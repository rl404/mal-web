import React from 'react';
import { getSummaryYear } from '../../api';
import * as cons from '../../constant';
import Skeleton from '@material-ui/lab/Skeleton';
import Error from '../../components/error/Error';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import StyledTitle from '../../components/styled/Title';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';

const YearChart = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getSummaryYear();
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
      {state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<BarChartIcon />} title='Anime Count' />
              <BarChart
                data={state.data.slice(matches ? -5 : -10).map(d => {
                  return {
                    key: d.anime.year.toString(),
                    value: d.anime.count,
                  };
                })}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<BarChartIcon />} title='Manga Count' />
              <BarChart
                data={state.data.slice(matches ? -5 : -10).map(d => {
                  return {
                    key: d.manga.year.toString(),
                    value: d.manga.count,
                  };
                })}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<TimelineIcon />} title='Anime Score' />
              <LineChart
                data={state.data.slice(matches ? -5 : -10).map(d => {
                  return {
                    key: d.anime.year.toString(),
                    value: d.anime.avgScore,
                  };
                })}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledTitle icon={<TimelineIcon />} title='Manga Score' />
              <LineChart
                data={state.data.slice(matches ? -5 : -10).map(d => {
                  return {
                    key: d.manga.year.toString(),
                    value: d.manga.avgScore,
                  };
                })}
              />
            </Grid>
          </Grid>
      }
    </>
  );
};

export default YearChart;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3].map(k => {
        return (
          <Grid item md={6} xs={12} key={k}>
            <Skeleton height={40} />
            <Skeleton variant='rect' height={200} />
          </Grid>
        )
      })}
    </Grid>
  );
};