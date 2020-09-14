import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { getSearch } from '../../api';
import * as cons from '../../constant';
import ErrorArea from '../../components/error/Error';
import CoverCard from '../../components/card/Cover';
import CoverCardLoading from '../../components/card/loading/Cover';

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2),
  },
}));

const SearchContent = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    type: props.type,
    query: '',
    page: 1,
    advQuery: null,
    error: null,
  });

  React.useEffect(() => {
    if ((state.query.length >= 3 || state.query.length === 0) && ((state.data === null && state.error === null) || state.loading)) {
      const getData = async () => {
        const result = await getSearch(state.type, state.query, state.page, state.advQuery);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  const updateQuery = (type, query, advQuery) => {
    setState({ ...state, type: type, query: query, page: 1, advQuery: advQuery, loading: true });
  };

  const nextPage = () => {
    setState({ ...state, page: state.page + 1, loading: true });
  };

  const prevPage = () => {
    setState({ ...state, page: state.page - 1, loading: true });
  };

  React.useImperativeHandle(ref, () => {
    return {
      updateQuery: updateQuery,
    };
  });

  return (
    <>
      {!state || (state.query.length < 3 && state.query.length > 0) ?
        <Typography variant='h6'>
          Search with more than 3 letters.
        </Typography> :
        state.loading ? <SearchLoading /> :
          state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
            state.data.length === 0 && state.page === 1 ?
              <Typography variant='h6'>
                No {state.type} found.
              </Typography> :
              <>
                <Grid container spacing={1}>
                  {state.data.length === 0 ?
                    <Typography variant='h6'>
                      That's all.
                  </Typography> :
                    state.data.map(d => {
                      return (
                        <Grid item key={d.id} md={2} sm={4} xs={6}>
                          {state.type === cons.ANIME_TYPE || state.type === cons.MANGA_TYPE ?
                            <CoverCard
                              id={d.id}
                              type={state.type}
                              title={d.title}
                              image={d.cover}
                              score={d.score}
                              format={d.type}
                              onClick={props.onClick}
                            />
                            :
                            <CoverCard
                              id={d.id}
                              type={state.type}
                              title={d.name}
                              image={d.image}
                              onClick={props.onClick}
                            />
                          }
                        </Grid>
                      )
                    })}
                </Grid>
                <Grid container justify='flex-end' className={classes.pagination} spacing={2}>
                  {state.page === 1 ? null :
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<NavigateBeforeIcon />}
                        onClick={prevPage}
                      >
                        Prev
                  </Button>
                    </Grid>
                  }
                  {state.page > 1 && state.data.length === 0 ? null :
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        endIcon={<NavigateNextIcon />}
                        onClick={nextPage}
                      >
                        Next
                  </Button>
                    </Grid>
                  }
                </Grid>
              </>
      }
    </>
  )
});

SearchContent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchContent;

const SearchLoading = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
        return (
          <Grid item key={i} md={2} sm={4} xs={6}>
            <CoverCardLoading />
          </Grid>
        )
      })}
    </Grid>
  );
};