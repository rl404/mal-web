import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getUserStudioAuthor } from '../../../api';
import StyledTitle from '../../../components/styled/Title';
import ErrorArea from '../../../components/error/Error';
import StyledDivider from '../../../components/styled/Divider';
import SortTable from '../../../components/table/SortTable';

const StatsStudioAuthor = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getUserStudioAuthor(props.username, props.type);
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
    !state ? null : state.loading ? <StatsStudioAuthorLoading /> :
      state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
        <>
          <StyledTitle icon={props.type === cons.ANIME_TYPE ? <BusinessIcon /> : <PersonIcon />} title={props.type === cons.ANIME_TYPE ? 'Studio Summary' : 'Author Summary'} />
          <SortTable
            header={[
              { id: 'name', align: 'left', label: 'Name' },
              { id: 'count', align: 'right', label: 'Count' },
              { id: 'score', align: 'right', label: 'Score' },
            ]}
            data={state.data.map(d => {
              return {
                name: {
                  value: d.name,
                  align: 'left',
                  onClick: props.type === cons.MANGA_TYPE ? (() => props.onClick(cons.PEOPLE_TYPE, d.id)) : null,
                  link: props.type === cons.ANIME_TYPE ? `/search/anime?producer=${d.id}` : null,
                },
                count: { value: d.count, align: 'right', formatted: d.count.toLocaleString() },
                score: { value: d.score, align: 'right', formatted: Number(d.score).toFixed(2) },
              }
            })}
          />
        </>
  )
};

export default StatsStudioAuthor;

StatsStudioAuthor.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
  onClick: PropTypes.func.isRequired,
};

const StatsStudioAuthorLoading = () => {
  return (
    <>
      <Skeleton height={40} width={150} />
      <StyledDivider />
      <Skeleton variant='rect' height={200} />
    </>
  )
};