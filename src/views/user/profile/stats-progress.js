import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getUserProgress } from '../../../api';
import StyledTitle from '../../../components/styled/Title';
import ErrorArea from '../../../components/error/Error';
import StyledDivider from '../../../components/styled/Divider';
import BarChart from '../../../components/chart/BarChart';

const StatsProgress = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getUserProgress(props.username);
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
    !state ? null : state.loading ? <StatsProgressLoading /> :
      state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
        <>
          <StyledTitle icon={props.type === cons.ANIME_TYPE ? <TheatersIcon /> : <MenuBookIcon />} title='Progress Summary' />
          <BarChart
            data={Object.keys(state.data).map(k => {
              return {
                key: k,
                value: state.data[k].count,
              }
            })}
          />
        </>
  )
};

export default StatsProgress;

StatsProgress.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
};

const StatsProgressLoading = () => {
  return (
    <>
      <Skeleton height={40} width={150} />
      <StyledDivider />
      <Skeleton variant='rect' height={200} />
    </>
  )
};