import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Error from '../../components/error/Error';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import StyledTitle from '../../components/styled/Title';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const Song = (props) => {
  const state = props.state;
  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <StyledTitle icon={<MusicNoteIcon size='small' />} title='Opening Theme' subtitle={state.data.songs.opening.length.toLocaleString()} />
              {!state.data.songs.opening || state.data.songs.opening.length === 0 ?
                <Typography>
                  No opening theme.
                </Typography> :
                state.data.songs.opening.map((song, i) => {
                  return (
                    <Typography key={i}>
                      {song}
                    </Typography>
                  )
                })}
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTitle icon={<MusicNoteIcon size='small' />} title='Closing Theme' subtitle={state.data.songs.ending.length.toLocaleString()} />
              {!state.data.songs.ending || state.data.songs.ending.length === 0 ?
                <Typography>
                  No ending theme.
                </Typography> :
                state.data.songs.ending.map((song, i) => {
                  return (
                    <Typography key={i}>
                      {song}
                    </Typography>
                  )
                })}
            </Grid>
          </Grid>
      }
    </>
  );
};

Song.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Song;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Skeleton height={40} />
        <Divider />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton height={40} />
        <Divider />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Grid>
    </Grid>
  );
};