import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Header from '../../views/search/Header'
import Content from '../../views/search/Content'
import { capitalize, setHeadMeta } from '../../lib/utils'

const Search = (props) => {
  const defaultQuery = {
    query: '',
    order: '-',
    type: 0,
    status: 0,
    season: '-',
    genre: [],
    genre2: [-12],
  }

  const [queryState, setQueryState] = React.useState(defaultQuery)
  const setQuery = (query) => {
    setQueryState({
      ...queryState,
      ...query,
    })
  }

  const [readyState, setReadyState] = React.useState(false)
  const setReady = () => setReadyState(true)
  const setUnready = () => setReadyState(false)

  React.useEffect(() => {
    const order = new URLSearchParams(window.location.search).get('order')
    const type = new URLSearchParams(window.location.search).get('type')
    const status = new URLSearchParams(window.location.search).get('status')
    const season = new URLSearchParams(window.location.search).get('season')
    const producer = new URLSearchParams(window.location.search).get('producer')
    const genre = new URLSearchParams(window.location.search).get('genre')
    setQueryState({
      query: '',
      order: order ? order : '-',
      type: type ? parseInt(type) : 0,
      status: status ? parseInt(status) : 0,
      season: season ? season : '-',
      producer: producer ? parseInt(producer) : null,
      genre: genre ? genre.split(',').map(g => parseInt(g)) : [],
      genre2: [-12],
    })
  }, [props.sType])

  React.useEffect(() => {
    setReady()
  }, [queryState])

  return (
    <>
      {setHeadMeta(`${capitalize(props.sType)} Search`, `Search your ${props.sType} from AnimeList data.`, '')}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Header
            sType={props.sType}
            ready={readyState}
            setQuery={setQuery}
            query={queryState} />
        </Grid>
        <Grid item xs={12}>
          <Content
            sType={props.sType}
            query={queryState}
            ready={readyState}
            showEntryDrawer={props.showEntryDrawer}
            animelist={props.animelist}
            mangalist={props.mangalist} />
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ params }) {
  const sType = params.sType
  return {
    props: {
      sType,
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { sType: 'anime' }, },
      { params: { sType: 'manga' }, },
      { params: { sType: 'character' }, },
      { params: { sType: 'people' }, },
    ],
    fallback: false,
  }
}

Search.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default Search