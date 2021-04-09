import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { getSearch } from '../../lib/api'
import * as cons from '../../lib/constant'
import Cover from '../../components/card/Cover'
import Error from '../../components/error/Error'
import InfiniteScroll from '../../components/scroll/InfiniteScroll'
import CircularProgress from '@material-ui/core/CircularProgress'

const Content = (props) => {
  const [state, setState] = React.useState({
    page: 1,
    type: props.sType,
    data: [],
    error: null,
  })

  const getData = async (isNew = false) => {
    const result = await getSearch(state.type, props.query.query, isNew ? 1 : state.page, 20, props.query)
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
    if (!props.ready) return
    setState({
      page: 1,
      type: props.sType,
      data: [],
      error: null,
    })
    getData(true)
  }, [props.ready, props.query, props.sType])

  return (
    <>
      {state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
        <Grid container spacing={1} id='data-list'>
          {state.data.length === 0 ?
            <Grid item xs={12}>
              <Typography>
                No result.
              </Typography>
            </Grid> :
            state.data.map((d, i) => {
              return (
                <Grid item md={2} sm={3} xs={4} key={i}>
                  {state.type === cons.ANIME_TYPE || state.type === cons.MANGA_TYPE ?
                    <Cover
                      id={d.id}
                      type={state.type}
                      title={d.title}
                      image={d.image}
                      score={d.score}
                      format={d.type}
                      onClick={props.showEntryDrawer}
                      user={state.type === cons.ANIME_TYPE ?
                        props.animelist ? props.animelist[d.id] : null :
                        props.mangalist ? props.mangalist[d.id] : null
                      }
                    /> :
                    <Cover
                      id={d.id}
                      type={state.type}
                      title={d.name}
                      image={d.image}
                      onClick={props.showEntryDrawer}
                    />
                  }
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

Content.propTypes = {
  sType: PropTypes.oneOf(cons.MAIN_TYPES).isRequired,
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
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default Content