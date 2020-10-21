import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getUserGenre } from '../../../api';
import StyledTitle from '../../../components/styled/Title';
import ErrorArea from '../../../components/error/Error';
import StyledDivider from '../../../components/styled/Divider';
import SortTable from '../../../components/table/SortTable';

const StatsGenre = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getUserGenre(props.username);
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
    !state ? null : state.loading ? <StatsGenreLoading /> :
      state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
        <>
          <StyledTitle icon={<LocalOfferIcon />} title='Genre Summary' />
          <SortTable
            header={[
              { id: 'genre', align: 'left', label: 'Genre' },
              { id: 'count', align: 'right', label: 'Count' },
              { id: 'score', align: 'right', label: 'Score' },
            ]}
            data={state.data.map(d => {
              return {
                genre: { value: d.genre, align: 'left', link: `/search/${props.type}?genre=${d.id}` },
                count: { value: d.count, align: 'right', formatted: d.count.toLocaleString() },
                score: { value: d.score, align: 'right', formatted: Number(d.score).toFixed(2) },
              }
            })}
          />
        </>
  )
};

export default StatsGenre;

StatsGenre.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
};

const StatsGenreLoading = () => {
  return (
    <>
      <Skeleton height={40} width={150} />
      <StyledDivider />
      <Skeleton variant='rect' height={200} />
    </>
  )
};