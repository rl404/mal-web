import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Top from './Top';
import * as cons from '../../constant';
import { getEntryDetail } from '../../api';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Ography from './Ography';
import Va from './Va';

const Character = (props) => {
  const [state, setState] = React.useState({
    data: null,
    meta: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getEntryDetail(cons.CHAR_TYPE, props.match.params.id);
    if (result.status === cons.CODE_OK) {
      setState({ ...state, data: result.data, meta: result.meta, loading: false });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  }

  React.useEffect(() => {
    getData();
  }, [props.match.params.id]);

  const [tabState, setTabState] = React.useState(0);
  const changeTab = (event, newValue) => {
    setTabState(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Top state={state} showHistoryModal={props.showHistoryModal} />
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
          <Ography oType={cons.ANIME_TYPE} state={state} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} mangalist={props.mangalist} />
        </TabPanel>
        <TabPanel value={tabState} index={1}>
          <Ography oType={cons.MANGA_TYPE} state={state} showEntryDrawer={props.showEntryDrawer} animelist={props.animelist} mangalist={props.mangalist} />
        </TabPanel>
        <TabPanel value={tabState} index={2}>
          <Va state={state} showEntryDrawer={props.showEntryDrawer} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

Character.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  showHistoryModal: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
};

export default Character;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
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
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `character-tab-${index}`,
    'aria-controls': `character-tabpanel-${index}`,
  };
};