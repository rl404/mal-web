import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Top from '../../views/manga/Top'
import * as cons from '../../lib/constant'
import { getEntryDetail } from '../../lib/api'
import Details from '../../views/manga/Details'
import Tabs from '@material-ui/core/Tabs'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Characters from '../../views/manga/Characters'
import { setHeadMeta } from '../../lib/utils'
import { useRouter } from 'next/router'
import BackdropLoading from '../../components/loading/Backdrop'
import Error from '../../components/error/Error'

const Manga = (props) => {
  if (useRouter().isFallback) {
    return <BackdropLoading />
  }

  if (props.mangaData.status !== cons.CODE_OK) {
    return (
      <>
        {setHeadMeta(props.mangaData.message, '', '')}
        <Error code={props.mangaData.status} message={props.mangaData.message} />
      </>
    )
  }

  const [tabState, setTabState] = React.useState(0)
  const changeTab = (event, newValue) => {
    setTabState(newValue)
  }

  return (
    <>
      {setHeadMeta(props.mangaData.data.title, props.mangaData.data.synopsis, props.mangaData.data.image)}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Top
            data={props.mangaData.data}
            meta={props.mangaData.meta}
            showHistoryModal={props.showHistoryModal}
            mangalist={props.mangalist} />
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
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabState} index={0}>
            <Details data={props.mangaData.data} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} mangalist={props.mangalist} />
          </TabPanel>
          <TabPanel value={tabState} index={1}>
            <Characters data={props.mangaData.data} showEntryDrawer={props.showEntryDrawer} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ params }) {
  const mangaData = await getEntryDetail(cons.MANGA_TYPE, params.params[0])
  return {
    props: {
      mangaData,
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

Manga.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  showHistoryModal: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default Manga

const TabPanel = (props) => {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`manga-tabpanel-${index}`}
      aria-labelledby={`manga-tab-${index}`}
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
    id: `manga-tab-${index}`,
    'aria-controls': `manga-tabpanel-${index}`,
  }
}