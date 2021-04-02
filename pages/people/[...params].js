import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Top from '../../views/people/Top'
import * as cons from '../../lib/constant'
import { getEntryDetail } from '../../lib/api'
import Tabs from '@material-ui/core/Tabs'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Characters from '../../views/people/Characters'
import Staffs from '../../views/people/Staffs'
import Manga from '../../views/people/Manga'
import { setHeadMeta } from '../../lib/utils'
import { useRouter } from 'next/router'
import BackdropLoading from '../../components/loading/Backdrop'

const People = (props) => {
  if (useRouter().isFallback) {
    return <BackdropLoading />
  }

  if (props.peopleData.status !== cons.CODE_OK) {
    return <Error code={props.peopleData.status} message={props.peopleData.message} />
  }

  const [tabState, setTabState] = React.useState(0)
  const changeTab = (event, newValue) => {
    setTabState(newValue)
  }

  return (
    <>
      {setHeadMeta(props.peopleData.data.name, props.peopleData.data.more, props.peopleData.data.image)}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Top data={props.peopleData.data} meta={props.peopleData.meta} />
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
              <Tab label='Characters' {...a11yProps(0)} />
              <Tab label='Staff' {...a11yProps(1)} />
              <Tab label='Published manga' {...a11yProps(2)} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabState} index={0}>
            <Characters data={props.peopleData.data} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} />
          </TabPanel>
          <TabPanel value={tabState} index={1}>
            <Staffs data={props.peopleData.data} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} />
          </TabPanel>
          <TabPanel value={tabState} index={2}>
            <Manga data={props.peopleData.data} showEntryDrawer={props.showEntryDrawer} mangalist={props.mangalist} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ params }) {
  const peopleData = await getEntryDetail(cons.PEOPLE_TYPE, params.params[0])
  return {
    props: {
      peopleData,
    }
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

People.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
}

export default People

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