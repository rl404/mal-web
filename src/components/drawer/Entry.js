import React from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';
import * as cons from '../../constant';
import EllipsisText from '../text/EllipsisText';
import EntryDrawerLoading from './loading/Entry';
import ErrorArea from '../error/Error';
import Img from '../image/Img';
import StyledDivider from '../styled/Divider';

const useStyles = makeStyles((theme) => ({
  genre: {
    margin: 2,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  title: {
    paddingTop: theme.spacing(2),
    lineHeight: theme.typography.body1.lineHeight,
  },
  center: {
    textAlign: 'center',
  },
  categoryName: {
    color: theme.palette.primary.main,
  },
  synopsis: {
    whiteSpace: 'pre-line',
  },
  cover: {
    maxHeight: 220,
    maxWidth: '100%',
  },
}));

const EntryDrawer = (props) => {
  const classes = useStyles();
  const state = props.state;

  return (
    <>
      {!state ? null : state.loading ? <EntryDrawerLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <>
            <Link to={`/${state.entryType}/${state.entryId}/${slugify(state.data.title)}`} className={classes.link}>
              <Typography variant='subtitle1' gutterBottom align='center' className={classes.title}>
                <b>{state.data.title}</b>
              </Typography>
            </Link>
            <StyledDivider />
            <Grid container spacing={1}>
              <Grid item xs={12} className={classes.center}>
              <Img src={state.data.cover} alt={state.data.title} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' align='center' className={classes.categoryName}>
                  Rank
              </Typography>
                <Typography variant='h6' align='center'>
                  <b>#{state.data.rank.toLocaleString()}</b>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' align='center' className={classes.categoryName}>
                  Score
              </Typography>
                <Typography variant='h6' align='center'>
                  <b>{Number(state.data.score).toFixed(2)}</b>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' align='center' className={classes.categoryName}>
                  Popularity
              </Typography>
                <Typography variant='h6' align='center'>
                  <b>#{state.data.popularity.toLocaleString()}</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2' className={classes.categoryName}>
                  Synopsis
              </Typography>
                <Typography variant='body2' className={classes.synopsis}>
                  <EllipsisText text={state.data.synopsis} limit={500} />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledDivider />
                {state.data.genres.map(genre => {
                  return (
                    <Chip size='small' label={genre.name} color='primary' key={genre.id} className={classes.genre} />
                  )
                })}
              </Grid>
            </Grid>
          </>
      }
    </>
  );
};

EntryDrawer.propTypes = {
  state: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      cover: PropTypes.string,
      rank: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      popularity: PropTypes.number.isRequired,
      synopsis: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      )
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string,
    }),
    entryType: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]).isRequired,
    entryId: PropTypes.number.isRequired,
  }),
};

export default EntryDrawer;
