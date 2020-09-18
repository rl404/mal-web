import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import { getEntryDetail } from '../../api';
import * as cons from '../../constant';
import EntryDrawer from './Entry';
import CharacterDrawer from './Character';
import PeopleDrawer from './People';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.drawer.width,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const SummaryDrawer = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const defaultState = {
    data: null,
    loading: true,
    error: null,
    show: false,
    entryType: '',
    entryId: 0,
  };

  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    if (state.show && state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getEntryDetail(state.entryType, state.entryId);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      };
      getData();
    }
  });

  const showDrawer = (type, id) => {
    setState({ ...defaultState, show: true, entryType: type, entryId: id });
  };

  const hideDrawer = () => {
    setState(defaultState);
  };

  React.useImperativeHandle(ref, () => {
    return { showDrawer: showDrawer };
  });

  return (
    <Drawer
      variant='temporary'
      anchor='right'
      open={state.show}
      onClose={hideDrawer}
      classes={{
        paper: classes.root,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {state.entryType === cons.ANIME_TYPE || state.entryType === cons.MANGA_TYPE ?
        <EntryDrawer state={state} /> : null
      }
      {state.entryType === cons.CHAR_TYPE ?
        <CharacterDrawer state={state} /> : null
      }
      {state.entryType === cons.PEOPLE_TYPE ?
        <PeopleDrawer state={state} /> : null
      }
    </Drawer>
  );
});

export default SummaryDrawer;