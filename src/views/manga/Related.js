import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Error from '../../components/error/Error';
import Entry from '../../components/card/Entry';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import StyledTitle from '../../components/styled/Title';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { splitCamel } from '../../utils';
import * as cons from '../../constant';

const useStyles = makeStyles((theme) => ({
  more: {
    textAlign: 'center',
  },
  moreButton: {
    margin: theme.spacing(1),
  },
}));

const MoreButton = withStyles((theme) => ({
  root: {
    color: theme.palette.icon,
  },
}))(Button);

const Related = (props) => {
  const state = props.state;
  const classes = useStyles();

  var relatedCount = 0;
  if (state.data) {
    Object.keys(state.data.related).forEach(key => {
      relatedCount += state.data.related[key].length;
    });
  }

  var count = 0;
  const [countState, setCountState] = React.useState(6);
  const showMore = () => {
    setCountState(countState + 6);
  };

  const showAll = () => {
    setCountState(relatedCount);
  };

  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <StyledTitle icon={<LinkIcon />} title={'Relations'} subtitle={relatedCount.toLocaleString()} />
            </Grid>
            {relatedCount === 0 ?
              <Grid item xs={12}>
                <Typography>
                  No related anime/manga.
                </Typography>
              </Grid> :
              Object.keys(state.data.related).map(key => {
                return state.data.related[key].map(r => {
                  count++
                  if (count > countState) {
                    return null;
                  } else {
                    return (
                      <Grid item md={4} sm={6} xs={12} key={r.id}>
                        <Entry
                          id={r.id}
                          type={r.type}
                          title={r.title}
                          image={r.image}
                          onClick={props.showEntryDrawer}
                          detail={splitCamel(key) + ' · ' + r.type}
                          user={r.type === cons.ANIME_TYPE ?
                            props.animelist ? props.animelist[r.id] : null :
                            props.mangalist ? props.mangalist[r.id] : null
                          }
                        />
                      </Grid>
                    )
                  }
                })
              })}
            {relatedCount <= countState ? null :
              <Grid item xs={12} className={classes.more}>
                <MoreButton
                  size='small'
                  color='secondary'
                  className={classes.moreButton}
                  onClick={showMore}>
                  Show more
                </MoreButton>
                <MoreButton
                  size='small'
                  color='secondary'
                  className={classes.moreButton}
                  onClick={showAll}>
                  Show all ({relatedCount})
                </MoreButton>
              </Grid>
            }
          </Grid>
      }
    </>
  );
};

Related.propTypes = {
  state: PropTypes.object.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
};

export default Related;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton height={40} />
        <Divider />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
    </Grid>
  )
}