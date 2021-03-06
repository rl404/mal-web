import React from 'react'
import PropTypes from 'prop-types'
import { getEntryStaff } from '../../lib/api'
import * as cons from '../../lib/constant'
import Grid from '@material-ui/core/Grid'
import Entry from '../../components/card/Entry'
import Error from '../../components/error/Error'
import InfiniteScroll from '../../components/scroll/InfiniteScroll'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const Staffs = (props) => {
  const data = props.data

  const [state, setState] = React.useState({
    page: 1,
    data: [],
    error: null,
  })

  const getData = async (isNew = false) => {
    const result = await getEntryStaff(cons.PEOPLE_TYPE, data.id, isNew ? 1 : state.page)
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
                No related anime.
              </Typography>
            </Grid> :
            state.data.map(s => {
              return (
                <Grid item md={4} sm={6} xs={12} key={s.id}>
                  <Entry
                    id={s.id}
                    type={cons.ANIME_TYPE}
                    title={s.name}
                    image={s.image}
                    onClick={props.showEntryDrawer}
                    detail={s.role}
                    user={props.animelist ? props.animelist[s.id] : null}
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

Staffs.propTypes = {
  data: PropTypes.object.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
}

export default Staffs
