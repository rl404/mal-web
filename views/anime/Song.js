import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import StyledTitle from '../../components/styled/Title'
import MusicNoteIcon from '@material-ui/icons/MusicNote'

const Song = (props) => {
  const data = props.data
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <StyledTitle icon={<MusicNoteIcon size='small' />} title='Opening Theme' subtitle={data.songs.opening.length.toLocaleString()} />
        {!data.songs.opening || data.songs.opening.length === 0 ?
          <Typography>
            No opening theme.
          </Typography> :
          data.songs.opening.map((song, i) => {
            return (
              <Typography key={i}>
                {song}
              </Typography>
            )
          })}
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTitle icon={<MusicNoteIcon size='small' />} title='Closing Theme' subtitle={data.songs.ending.length.toLocaleString()} />
        {!data.songs.ending || data.songs.ending.length === 0 ?
          <Typography>
            No ending theme.
          </Typography> :
          data.songs.ending.map((song, i) => {
            return (
              <Typography key={i}>
                {song}
              </Typography>
            )
          })}
      </Grid>
    </Grid>
  )
}

Song.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Song
