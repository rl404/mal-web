import React from 'react';
import Error from '../error/Error';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as cons from '../../constant';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { slugify } from '../../utils';
import Img from '../image/Img';
import Ellipsis from '../text/Ellipsis';
import Chip from '@material-ui/core/Chip';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.link,
    },
  },
  user: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopWidth: 30,
    borderTopStyle: 'solid',
    borderTopColor: props => props.borderColor,
    borderRightWidth: 30,
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',
  },
  title: {
    lineHeight: theme.typography.body2.lineHeight,
  },
  center: {
    textAlign: 'center',
  },
  categoryName: {
    color: theme.palette.icon,
  },
  synopsis: {
    whiteSpace: 'pre-line',
  },
  divider: {
    marginBottom: theme.spacing(0.5),
  },
  genre: {
    margin: theme.spacing(0.5),
  },
}));

const Entry = (props) => {
  const state = props.state;

  const theme = useTheme();

  const statusColor = {
    1: theme.palette.success.main,
    2: theme.palette.info.main,
    3: theme.palette.warning.main,
    4: theme.palette.error.main,
  };

  const borderColor = props.user ? statusColor[props.user.status] : '';

  const classes = useStyles({ borderColor: borderColor });

  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            {!props.user ? null :
              <Tooltip placement='left' title={state.entryType === cons.ANIME_TYPE ? cons.ANIME_USER_STATUS[props.user.status] : cons.MANGA_USER_STATUS[props.user.status]}>
                <div className={classes.user} />
              </Tooltip>}
            <Grid item xs={12}>
              <Link to={`/${state.entryType}/${state.entryId}/${slugify(state.data.title)}`} className={classes.link} onClick={props.hideDrawer}>
                <Typography variant='h6' align='center' className={classes.title}>
                  <b>{state.data.title}</b>
                </Typography>
              </Link>
              <Divider />
            </Grid>
            <Grid item xs={12} className={classes.center}>
              <Img src={state.data.image} alt={state.data.title} width='100%' />
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
              <Typography className={classes.synopsis}>
                <Ellipsis text={state.data.synopsis} limit={500} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
              {state.data.genres.map(genre => {
                return <Chip size='small' label={genre.name} color='primary' key={genre.id} className={classes.genre} />;
              })}
            </Grid>
          </Grid>
      }
    </>
  );
};

Entry.propTypes = {
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
  hideDrawer: PropTypes.func.isRequired,
  user: PropTypes.shape({
    status: PropTypes.number.isRequired,
  }),
};

export default Entry;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton height={40} />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant='rect' height={200} width={160} style={{ margin: 'auto' }} />
      </Grid>
      <Grid item xs={4}>
        <Skeleton height={30} />
        <Skeleton height={40} />
      </Grid>
      <Grid item xs={4}>
        <Skeleton height={30} />
        <Skeleton height={40} />
      </Grid>
      <Grid item xs={4}>
        <Skeleton height={30} />
        <Skeleton height={40} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={30} width={70} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton width={80} />
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton height={40} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};