import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Top from './Top';
import * as cons from '../../constant';
import { getEntryDetail } from '../../api';
import Details from './Details';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Characters from './Characters';
import Staffs from './Staffs';

const Anime = (props) => {
  const [state, setState] = React.useState({
    data: null,
    meta: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getEntryDetail(cons.ANIME_TYPE, props.match.params.id);
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
        <Top state={state} />
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
          <Details state={state} showEntryDrawer={props.showEntryDrawer} />
        </TabPanel>
        <TabPanel value={tabState} index={1}>
          <Characters state={state} showEntryDrawer={props.showEntryDrawer} />
        </TabPanel>
        <TabPanel value={tabState} index={2}>
          <Staffs state={state} showEntryDrawer={props.showEntryDrawer} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

Anime.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Anime;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
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
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `anime-tab-${index}`,
    'aria-controls': `anime-tabpanel-${index}`,
  };
};