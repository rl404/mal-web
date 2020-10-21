import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getUserScore } from '../../../api';
import StyledTitle from '../../../components/styled/Title';
import BarChart from '../../../components/chart/BarChart';
import ErrorArea from '../../../components/error/Error';
import StyledDivider from '../../../components/styled/Divider';

const StatsScore = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getUserScore(props.username);
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
    !state ? null : state.loading ? <StatsScoreLoading /> :
      state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
        <>
          <StyledTitle icon={<StarIcon />} title='Score Summary' />
          <BarChart
            data={state.data.map(v => {
              return {
                key: v.score.toString(),
                value: v.count,
              }
            })}
          />
        </>
  )
};

export default StatsScore;

StatsScore.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
};

const StatsScoreLoading = () => {
  return (
    <>
      <Skeleton height={40} width={150} />
      <StyledDivider />
      <Skeleton variant='rect' height={200} />
    </>
  )
};