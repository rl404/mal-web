import React from 'react'
import PropTypes from 'prop-types'
import { getEntryOgraphy } from '../../lib/api'
import * as cons from '../../lib/constant'
import Grid from '@material-ui/core/Grid'
import Entry from '../../components/card/Entry'
import Error from '../../components/error/Error'
import InfiniteScroll from '../../components/scroll/InfiniteScroll'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const Ography = (props) => {
  const data = props.data

  const [state, setState] = React.useState({
    page: 1,
    data: [],
    error: null,
  })

  const getData = async (isNew = false) => {
    const result = await getEntryOgraphy(cons.CHAR_TYPE, data.id, props.oType, isNew ? 1 : state.page)
    if (result.status === cons.CODE_OK) {
      if (result.data.length > 0) {
        setState({ ...state, page: isNew ? 2 : state.page + 1, data: !state.data || isNew ? result.data : state.data.concat(result.data), error: null })
      }
      if (isNew && result.data.length === 0) {
        setState({ ...state, data: result.data, error: null })
      }
    } else {
      setState({ ...state, error: { code: result.status, message: result.message } })
    }
    setIsLoading(false)
  }

  const [isLoading, setIsLoading] = InfiniteScroll(getData, '#data-list', '.MuiGrid-root')

  React.useEffect(() => {
    if (!data) return
    getData(true)
  }, [data])

  return (
    <>
      {state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
        <Grid container spacing={1} id='data-list'>
          {state.data.length === 0 ?
            <Grid item xs={12}>
              <Typography>
                No related {props.oType}.
              </Typography>
            </Grid> :
            state.data.map(c => {
              return (
                <Grid item md={4} sm={6} xs={12} key={c.id}>
                  <Entry
                    id={c.id}
                    type={props.oType}
                    title={c.name}
                    image={c.image}
                    onClick={props.showEntryDrawer}
                    detail={c.role}
                    user={props.oType === cons.ANIME_TYPE ?
                      props.animelist ? props.animelist[c.id] : null :
                      props.mangalist ? props.mangalist[c.id] : null
                    }
                  />
                </Grid>
              )
            })}
          {isLoading &&
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress size={30} />
            </Grid>
          }
        </Grid>
      }
    </>
  )
}

Ography.propTypes = {
  data: PropTypes.object.isRequired,
  oType: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]).isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default Ography
