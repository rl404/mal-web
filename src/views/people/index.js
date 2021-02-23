import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Top from './Top';
import * as cons from '../../constant';
import { getEntryDetail } from '../../api';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Characters from './Characters';
import Staffs from './Staffs';
import Manga from './Manga';

const People = (props) => {
  const [state, setState] = React.useState({
    data: null,
    meta: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getEntryDetail(cons.PEOPLE_TYPE, props.match.params.id);
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
            <Tab label='Characters' {...a11yProps(0)} />
            <Tab label='Staff' {...a11yProps(1)} />
            <Tab label='Published manga' {...a11yProps(2)} />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value={tabState} index={0}>
          <Characters state={state} showEntryDrawer={props.showEntryDrawer} />
        </TabPanel>
        <TabPanel value={tabState} index={1}>
          <Staffs state={state} showEntryDrawer={props.showEntryDrawer} />
        </TabPanel>
        <TabPanel value={tabState} index={2}>
          <Manga state={state} showEntryDrawer={props.showEntryDrawer} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

People.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default People;

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