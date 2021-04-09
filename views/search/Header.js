import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import * as cons from '../../lib/constant'
import Top from './Top'
import Adv from './Adv'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
}))

const Header = (props) => {
  const classes = useStyles()

  const [advState, setAdvState] = React.useState(false)
  const toggleAdv = () => {
    setAdvState(!advState)
  }

  React.useEffect(() => {
    setAdvState(false)
  }, [props.sType])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Top
          sType={props.sType}
          ready={props.ready}
          readyTop={props.readyTop}
          setReadyTop={props.setReadyTop}
          toggleAdv={toggleAdv}
          setQuery={props.setQuery}
          query={props.query} />
        <Divider className={classes.divider} />
      </Grid>
      {props.sType !== cons.ANIME_TYPE && props.sType !== cons.MANGA_TYPE ? null :
        <Grid item xs={12} style={{ display: !advState ? 'none' : null }}>
          <Adv
            sType={props.sType}
            ready={props.ready}
            readyAdv={props.readyAdv}
            setReadyAdv={props.setReadyAdv}
            setQuery={props.setQuery}
            query={props.query} />
          <Divider className={classes.divider} />
        </Grid>
      }
    </Grid>
  )
}

Header.propTypes = {
  sType: PropTypes.oneOf(cons.MAIN_TYPES).isRequired,
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.shape({
    query: PropTypes.string,
    order: PropTypes.string,
    producer: PropTypes.number,
    magazine: PropTypes.number,
    score: PropTypes.number,
    type: PropTypes.number,
    status: PropTypes.number,
    rating: PropTypes.number,
    source: PropTypes.number,
    season: PropTypes.string,
    year: PropTypes.string,
    genre: PropTypes.arrayOf(PropTypes.number),
    genre2: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
}

export default Header