import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Top from '../../views/anime/Top'
import * as cons from '../../lib/constant'
import { getEntryDetail } from '../../lib/api'
import Tabs from '@material-ui/core/Tabs'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Details from '../../views/anime/Details'
import Characters from '../../views/anime/Characters'
import Staffs from '../../views/anime/Staffs'
import { setHeadMeta } from '../../lib/utils'
import { useRouter } from 'next/router'
import BackdropLoading from '../../components/loading/Backdrop'
import Error from '../../components/error/Error'

const Anime = (props) => {
  if (useRouter().isFallback) {
    return <BackdropLoading />
  }

  if (props.animeData.status !== cons.CODE_OK) {
    return (
      <>
        {setHeadMeta(props.animeData.message, '', '')}
        <Error code={props.animeData.status} message={props.animeData.message} />
      </>
    )
  }

  const [tabState, setTabState] = React.useState(0)
  const changeTab = (event, newValue) => {
    setTabState(newValue)
  }

  return (
    <>
      {setHeadMeta(props.animeData.data.title, props.animeData.data.synopsis, props.animeData.data.image)}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Top
            data={props.animeData.data}
            meta={props.animeData.meta}
            showHistoryModal={props.showHistoryModal}
            animelist={props.animelist} />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Tabs
              value={tabState}
              onChange={changeTab}
              indicatorColor='primary'
              variant='fullWidth'
              centered
            >
              <Tab label='Details' {...a11yProps(0)} />
              <Tab label='Characters' {...a11yProps(1)} />
              <Tab label='Staff' {...a11yProps(2)} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabState} index={0}>
            <Details data={props.animeData.data} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} mangalist={props.mangalist} />
          </TabPanel>
          <TabPanel value={tabState} index={1}>
            <Characters data={props.animeData.data} showEntryDrawer={props.showEntryDrawer} />
          </TabPanel>
          <TabPanel value={tabState} index={2}>
            <Staffs data={props.animeData.data} showEntryDrawer={props.showEntryDrawer} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ params }) {
  const animeData = await getEntryDetail(cons.ANIME_TYPE, params.params[0])
  return {
    props: {
      animeData,
    },
    revalidate: 86400,
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          params: ['1']
        }
      },
    ],
    fallback: true,
  }
}

Anime.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  showHistoryModal: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default Anime

const TabPanel = (props) => {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`anime-tabpanel-${index}`}
      aria-labelledby={`anime-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const a11yProps = (index) => {
  return {
    id: `anime-tab-${index}`,
    'aria-controls': `anime-tabpanel-${index}`,
  }
}