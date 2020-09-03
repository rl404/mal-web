import React from 'react';
import Grid from '@material-ui/core/Grid';

import * as cons from '../../constant';
import PropTypes from 'prop-types';
import { getTopList } from "../../api";
import CoverCardLoading from '../../components/card/loading/Cover';
import ErrorArea from '../../components/error/Error';
import StyledTitle from '../../components/styled/Title';
import CoverCard from '../../components/card/Cover';
import StyledTitleLoading from '../../components/styled/loading/Title';

const TopList = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getTopList(cons.ANIME_TYPE, props.type, 1)
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data.slice(0, 5), loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    <>
      {!state ? null : state.loading ? <TopListLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <>
            <StyledTitle
              icon={props.icon}
              title={props.title}
              more={{
                text: 'view more',
                link: '',
              }}
            />
            <Grid container spacing={1}>
              {state.data.map(anime => {
                return (
                  <Grid item key={anime.id} xs>
                    <CoverCard
                      id={anime.id}
                      type={cons.ANIME_TYPE}
                      title={anime.title}
                      image={anime.cover}
                      score={anime.score}
                      format={anime.type}
                      onClick={props.onClick}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </>
      }
    </>
  );
};

TopList.propTypes = {
  type: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default TopList;

const TopListLoading = () => {
  return (
    <>
      <StyledTitleLoading />
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4].map(i => {
          return (
            <Grid item key={i} xs>
              <CoverCardLoading />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};