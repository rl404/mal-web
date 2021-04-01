import React from 'react'
import Grid from '@material-ui/core/Grid'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import PropTypes from 'prop-types'
import * as cons from '../../lib/constant'
import Error from '../../components/error/Error'
import StyledTitle from '../../components/styled/Title'
import Cover from '../../components/card/Cover'
import { useTheme, useMediaQuery } from '@material-ui/core'

const Top = (props) => {
  const theme = useTheme()

  var coverLimit = 7
  if (useMediaQuery(theme.breakpoints.down('md'))) { coverLimit = 6 }
  if (useMediaQuery(theme.breakpoints.down('sm'))) { coverLimit = 5 }
  if (useMediaQuery(theme.breakpoints.down('xs'))) { coverLimit = 3 }

  const head = (
    <StyledTitle
      icon={<EventAvailableIcon />}
      title={props.title}
      more={{
        text: 'view more',
        link: props.link,
      }}
    />
  )

  if (props.result.status !== cons.CODE_OK) {
    return (
      <>
        {head}
        <Error code={props.result.status} message={props.result.message} />
      </>
    )
  }

  return (
    <>
      {head}
      <Grid container spacing={1}>
        {props.result.data.slice(0, coverLimit).map(anime => {
          return (
            <Grid item key={anime.id} xs>
              <Cover
                id={anime.id}
                type={cons.ANIME_TYPE}
                title={anime.title}
                image={anime.image}
                score={anime.score}
                format={anime.type}
                onClick={props.showEntryDrawer}
                user={props.animelist ? props.animelist[anime.id] : null}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

Top.propTypes = {
  result: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
}

export default Top
