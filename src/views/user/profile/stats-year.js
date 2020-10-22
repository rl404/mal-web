import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import EventNoteIcon from '@material-ui/icons/EventNote';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getUserYear } from '../../../api';
import StyledTitle from '../../../components/styled/Title';
import ErrorArea from '../../../components/error/Error';
import StyledDivider from '../../../components/styled/Divider';
import BarChart from '../../../components/chart/BarChart';

const StatsYear = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getUserYear(props.username);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data[props.type].slice(-10), loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    !state ? null : state.loading ? <StatsYearLoading /> :
      state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
        <>
          <StyledTitle icon={<EventNoteIcon />} title='Year Summary' />
          <BarChart
            data={state.data.map(k => {
              return {
                key: k.year.toString(),
                value: k.count,
              }
            })}
          />
        </>
  )
};

export default StatsYear;

StatsYear.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
};

const StatsYearLoading = () => {
  return (
    <>
      <Skeleton height={40} width={150} />
      <StyledDivider />
      <Skeleton variant='rect' height={200} />
    </>
  )
};