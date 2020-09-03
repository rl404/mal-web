import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import EntryCard from '../../../components/card/Entry';

import PropTypes from 'prop-types';
import { getEntryDetail } from '../../../api';
import * as cons from '../../../constant';
import StyledDivider from '../../../components/styled/Divider';
import EllipsisText from '../../../components/text/EllipsisText';
import StyledTitle from '../../../components/styled/Title';
import ErrorArea from '../../../components/error/Error';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: props => `url(${theme.overlay.white}), url(${props.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [theme.breakpoints.up('md')]: {
      maxWidth: 260,
      backgroundClip: 'padding-box',
      borderTop: '6px solid transparent',
      borderBottom: '2px solid transparent',
      borderRight: '18px solid transparent',
      borderLeft: '18px solid transparent'
    },
  },
  loadingCover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: 260,
    }
  },
  altTitle: {
    color: theme.palette.grey[500],
    '& span': {
      fontWeight: 'bold'
    }
  },
  favorite: {
    marginTop: 5
  },
  synopsis: {
    whiteSpace: 'pre-wrap'
  },
  marginTop: {
    marginTop: theme.spacing(2)
  },
  relation: {
    height: 130
  },
}));

const CharacterDetails = (props) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    altTitle: false,
    error: null,
  });

  const classes = useStyles(!state.data ? [] : state.data);

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getEntryDetail(cons.CHAR_TYPE, props.match.params.id)
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  const toggleAlt = () => {
    setState({ ...state, altTitle: !state.altTitle });
  };

  return (
    <>
      {!state ? null : state.loading ? <CharacterDetailsLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :

          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.cover}>
              <img src={state.data.image} alt={state.data.name} />
            </Grid>

            <Grid item md xs={12}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Typography variant="h6">
                    <b>{state.data.name}</b>
                    {state.data.nickname === '' && state.data.kanjiName === '' ? null :
                      <Tooltip title='Alternative titles' placement='right'>
                        <IconButton size='small' onClick={toggleAlt}>
                          <ArrowDropDownIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.favorite}>
                    Favorites: {state.data.favorite.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <StyledDivider />

              {state.data.nickname === '' || !state.altTitle ? null :
                <Typography variant="subtitle2" className={classes.altTitle}>
                  <span>Nicknames:</span> {state.data.nickname}
                </Typography>
              }
              {state.data.kanjiName === '' || !state.altTitle ? null :
                <Typography variant="subtitle2" className={classes.altTitle}>
                  <span>Japanese Name:</span> {state.data.kanjiName}
                </Typography>
              }

              <Typography variant="subtitle2" className={classes.synopsis}>
                <EllipsisText text={state.data.about} limit={1000} />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <StyledTitle icon={<TheatersIcon size='small' />} title='Animeography' />
              <Grid container spacing={1}>
                {!state.data.animeography ?
                  <Typography>
                    No related anime found.
                  </Typography> :
                  state.data.animeography.map(anime => {
                    return (
                      <Grid item lg={3} md={4} xs={6} key={anime.id}>
                        <EntryCard
                          id={anime.id}
                          type={cons.ANIME_TYPE}
                          title={anime.title}
                          image={anime.cover}
                          onClick={props.showEntryDrawer}
                        />
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.marginTop}>
              <StyledTitle icon={<MenuBookIcon size='small' />} title='Mangaography' />
              <Grid container spacing={1}>
                {!state.data.mangaography ?
                  <Typography>
                    No related manga found.
                  </Typography> :
                  state.data.mangaography.map(manga => {
                    return (
                      <Grid item lg={3} md={4} xs={6} key={manga.id}>
                        <EntryCard
                          id={manga.id}
                          type={cons.MANGA_TYPE}
                          title={manga.title}
                          image={manga.cover}
                          onClick={props.showEntryDrawer}
                        />
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.marginTop}>
              <StyledTitle icon={<PersonIcon size='small' />} title='Voice Actors' />
              <Grid container spacing={1}>
                {!state.data.voiceActors ?
                  <Typography>
                    No related voice actor found.
                  </Typography> :
                  state.data.voiceActors.map(va => {
                    return (
                      <Grid item lg={3} md={4} xs={6} key={va.id}>
                        <EntryCard
                          id={va.id}
                          type={cons.PEOPLE_TYPE}
                          title={va.name}
                          image={va.image}
                          onClick={props.showEntryDrawer}
                          detail={[va.role]}
                        />
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>
          </Grid>
      }
    </>
  );
};

CharacterDetails.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default CharacterDetails;

const CharacterDetailsLoading = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.loadingCover}>
          <Skeleton variant='rect' height={300} width={200} />
        </Grid>
        <Grid item md xs={12}>
          <Skeleton height={40} width={500} />
          <StyledDivider />
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} width={200} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} container spacing={1}>
          <Skeleton height={40} width={150} />
          <StyledDivider />
          <Grid container spacing={1}>
            {[0, 1, 2, 3].map(i => {
              return (
                <Grid item lg={3} md={4} xs={6} key={i}>
                  <Skeleton variant='rect' height={130} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Skeleton height={40} width={150} />
          <StyledDivider />
          <Grid container spacing={1}>
            {[0, 1, 2, 3].map(i => {
              return (
                <Grid item lg={3} md={4} xs={6} key={i}>
                  <Skeleton variant='rect' height={130} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Skeleton height={40} width={150} />
          <StyledDivider />
          <Grid container spacing={1}>
            {[0, 1, 2, 3].map(i => {
              return (
                <Grid item lg={3} md={4} xs={6} key={i}>
                  <Skeleton variant='rect' height={130} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};