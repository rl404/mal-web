import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as cons from '../../constant';
import { compareScore } from '../../api';
import Typography from '@material-ui/core/Typography';
import Error from '../../components/error/Error';
import InfiniteScroll from '../../components/scroll/InfiniteScroll';
import CircularProgress from '@material-ui/core/CircularProgress';
import Entry from '../../components/table/Table';
import { useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.link,
      cursor: 'pointer',
    },
  },
  adaptation: {
    color: theme.palette.grey[500],
  },
  good: {
    color: theme.palette.success.main,
  },
  bad: {
    color: theme.palette.error.main,
  },
}));

const Content = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down('md'));
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [state, setState] = React.useState({
    page: 1,
    data: [],
    error: null,
  });

  const getData = async (isNew = false) => {
    const result = await compareScore(props.query.query, props.query.order, isNew ? 1 : state.page, 20);
    if (result.status === cons.CODE_OK) {
      if (result.data.length > 0) {
        setState({ ...state, page: isNew ? 2 : state.page + 1, data: !state.data || isNew ? result.data : state.data.concat(result.data) });
      }
      if (isNew && result.data.length === 0) {
        setState({ ...state, data: result.data });
      }
    } else {
      setState({ ...state, error: { code: result.status, message: result.message } });
    }
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = InfiniteScroll(getData);

  React.useEffect(() => {
    getData(true);
  }, [props.query]);

  return (
    <>
      {state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {state.data.length === 0 ?
              <Typography>
                No result.
              </Typography> :
              <Entry
                size={isMD ? 'small' : 'medium'}
                header={[
                  { value: 'No', align: 'left', hide: isSM || isXS },
                  { value: 'Novel/Light Novel', align: 'left', hide: isXS },
                  { value: 'Anime Adaptation', align: 'left', hide: isSM || isXS },
                  { value: 'Manga Adaptation', align: 'left', hide: isSM || isXS },
                  { value: 'Adaptation', align: 'left', hide: !(isSM || isXS) },
                ]}
                data={state.data.map((d, i) => {
                  return ([
                    { value: i + 1 + '.', hide: isSM || isXS },
                    {
                      hide: isXS,
                      value:
                        <Grid container spacing={1}>
                          <Grid item xs={10}>
                            <a onClick={() => props.showEntryDrawer(cons.MANGA_TYPE, d.novel[0].id)} className={classes.link}>
                              {d.novel[0].title}
                            </a>
                          </Grid>
                          <Grid item xs={2} align='right'>
                            {parseFloat(d.novel[0].score).toFixed(2)}
                          </Grid>
                        </Grid>,
                    },
                    {
                      hide: isSM || isXS,
                      value:
                        <Grid container spacing={1}>
                          {d.anime.map((a, k) => {
                            return (
                              <React.Fragment key={k}>
                                <Grid item xs={8}>
                                  <a onClick={() => props.showEntryDrawer(cons.ANIME_TYPE, a.id)} className={classes.link}>
                                    {a.title}
                                  </a>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {parseFloat(a.score).toFixed(2)}
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {a.score - d.novel[0].score < 0 ?
                                    <span className={classes.bad}>{parseFloat(a.score - d.novel[0].score).toFixed(2)}</span> :
                                    <span className={classes.good}>{'+' + parseFloat(a.score - d.novel[0].score).toFixed(2)}</span>
                                  }
                                </Grid>
                              </React.Fragment>
                            )
                          })}
                        </Grid>
                    },
                    {
                      hide: isSM || isXS,
                      value:
                        <Grid container spacing={1}>
                          {d.manga.map((m, k) => {
                            return (
                              <React.Fragment key={k}>
                                <Grid item xs={8}>
                                  <a onClick={() => props.showEntryDrawer(cons.MANGA_TYPE, m.id)} className={classes.link}>
                                    {m.title}
                                  </a>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {parseFloat(m.score).toFixed(2)}
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {m.score - d.novel[0].score < 0 ?
                                    <span className={classes.bad}>{parseFloat(m.score - d.novel[0].score).toFixed(2)}</span> :
                                    <span className={classes.good}>{'+' + parseFloat(m.score - d.novel[0].score).toFixed(2)}</span>
                                  }
                                </Grid>
                              </React.Fragment>
                            )
                          })}
                        </Grid>
                    },
                    {
                      hide: isXS || !isSM,
                      value:
                        <Grid container spacing={1}>
                          {d.anime.length === 0 ? null :
                            <Grid item xs={12} className={classes.adaptation}>
                              Anime
                            </Grid>
                          }
                          {d.anime.map((a, k) => {
                            return (
                              <React.Fragment key={k}>
                                <Grid item xs={8}>
                                  <a onClick={() => props.showEntryDrawer(cons.ANIME_TYPE, a.id)} className={classes.link}>
                                    {a.title}
                                  </a>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {parseFloat(a.score).toFixed(2)}
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {a.score - d.novel[0].score < 0 ?
                                    <span className={classes.bad}>{parseFloat(a.score - d.novel[0].score).toFixed(2)}</span> :
                                    <span className={classes.good}>{'+' + parseFloat(a.score - d.novel[0].score).toFixed(2)}</span>
                                  }
                                </Grid>
                              </React.Fragment>
                            )
                          })}
                          {d.manga.length === 0 ? null :
                            <Grid item xs={12} className={classes.adaptation}>
                              Manga
                            </Grid>
                          }
                          {d.manga.map((m, k) => {
                            return (
                              <React.Fragment key={k}>
                                <Grid item xs={8}>
                                  <a onClick={() => props.showEntryDrawer(cons.MANGA_TYPE, m.id)} className={classes.link}>
                                    {m.title}
                                  </a>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {parseFloat(m.score).toFixed(2)}
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {m.score - d.novel[0].score < 0 ?
                                    <span className={classes.bad}>{parseFloat(m.score - d.novel[0].score).toFixed(2)}</span> :
                                    <span className={classes.good}>{'+' + parseFloat(m.score - d.novel[0].score).toFixed(2)}</span>
                                  }
                                </Grid>
                              </React.Fragment>
                            )
                          })}
                        </Grid>
                    },
                    {
                      hide: !isXS,
                      value:
                        <Grid container spacing={1}>
                          <Grid item xs={12} className={classes.adaptation}>
                            Novel/Light Novel
                          </Grid>
                          <Grid item xs={8}>
                            <a onClick={() => props.showEntryDrawer(cons.MANGA_TYPE, d.novel[0].id)} className={classes.link}>
                              {d.novel[0].title}
                            </a>
                          </Grid>
                          <Grid item xs={4} align='right'>
                            {parseFloat(d.novel[0].score).toFixed(2)}
                          </Grid>
                          {d.anime.length === 0 ? null :
                            <Grid item xs={12} className={classes.adaptation}>
                              Anime
                            </Grid>
                          }
                          {d.anime.map((a, k) => {
                            return (
                              <React.Fragment key={k}>
                                <Grid item xs={8}>
                                  <a onClick={() => props.showEntryDrawer(cons.ANIME_TYPE, a.id)} className={classes.link}>
                                    {a.title}
                                  </a>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {parseFloat(a.score).toFixed(2)}
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {a.score - d.novel[0].score < 0 ?
                                    <span className={classes.bad}>{parseFloat(a.score - d.novel[0].score).toFixed(2)}</span> :
                                    <span className={classes.good}>{'+' + parseFloat(a.score - d.novel[0].score).toFixed(2)}</span>
                                  }
                                </Grid>
                              </React.Fragment>
                            )
                          })}
                          {d.manga.length === 0 ? null :
                            <Grid item xs={12} className={classes.adaptation}>
                              Manga
                            </Grid>
                          }
                          {d.manga.map((m, k) => {
                            return (
                              <React.Fragment key={k}>
                                <Grid item xs={8}>
                                  <a onClick={() => props.showEntryDrawer(cons.MANGA_TYPE, m.id)} className={classes.link}>
                                    {m.title}
                                  </a>
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {parseFloat(m.score).toFixed(2)}
                                </Grid>
                                <Grid item xs={2} align='right'>
                                  {m.score - d.novel[0].score < 0 ?
                                    <span className={classes.bad}>{parseFloat(m.score - d.novel[0].score).toFixed(2)}</span> :
                                    <span className={classes.good}>{'+' + parseFloat(m.score - d.novel[0].score).toFixed(2)}</span>
                                  }
                                </Grid>
                              </React.Fragment>
                            )
                          })}
                        </Grid>
                    },
                  ]
                  )
                })}
              />
            }
          </Grid>
          {isLoading &&
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress size={30} />
            </Grid>
          }
        </Grid>
      }
    </>
  );
};

Content.propTypes = {
  query: PropTypes.shape({
    query: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Content;