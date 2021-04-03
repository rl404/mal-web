import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Top from '../../views/character/Top'
import * as cons from '../../lib/constant'
import { getEntryDetail } from '../../lib/api'
import Tabs from '@material-ui/core/Tabs'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Ography from '../../views/character/Ography'
import Va from '../../views/character/Va'
import { setHeadMeta } from '../../lib/utils'
import { useRouter } from 'next/router'
import BackdropLoading from '../../components/loading/Backdrop'
import Error from '../../components/error/Error'

const Character = (props) => {
  if (useRouter().isFallback) {
    return <BackdropLoading />
  }

  if (props.charData.status !== cons.CODE_OK) {
    return (
      <>
        {setHeadMeta(props.charData.message, '', '')}
        <Error code={props.charData.status} message={props.charData.message} />
      </>
    )
  }

  const [tabState, setTabState] = React.useState(0)
  const changeTab = (event, newValue) => {
    setTabState(newValue)
  }

  return (
    <>
      {setHeadMeta(props.charData.data.name, props.charData.data.about, props.charData.data.image)}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Top
            data={props.charData.data}
            meta={props.charData.meta}
            showHistoryModal={props.showHistoryModal} />
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
              <Tab label='Anime-ography' {...a11yProps(0)} />
              <Tab label='Manga-ography' {...a11yProps(1)} />
              <Tab label='Voice actors' {...a11yProps(2)} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabState} index={0}>
            <Ography oType={cons.ANIME_TYPE} data={props.charData.data} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} mangalist={props.mangalist} />
          </TabPanel>
          <TabPanel value={tabState} index={1}>
            <Ography oType={cons.MANGA_TYPE} data={props.charData.data} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} mangalist={props.mangalist} />
          </TabPanel>
          <TabPanel value={tabState} index={2}>
            <Va data={props.charData.data} showEntryDrawer={props.showEntryDrawer} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ params }) {
  const charData = await getEntryDetail(cons.CHAR_TYPE, params.params[0])
  return {
    props: {
      charData,
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

Character.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  showHistoryModal: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default Character

const TabPanel = (props) => {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`character-tabpanel-${index}`}
      aria-labelledby={`character-tab-${index}`}
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
    id: `character-tab-${index}`,
    'aria-controls': `character-tabpanel-${index}`,
  }
}