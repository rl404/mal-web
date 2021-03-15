import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { getEntryDetail } from '../../api';
import * as cons from '../../constant';
import Drawer from '@material-ui/core/Drawer';
import Entry from './Entry';
import Character from './Character';
import People from './People';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.drawer.width,
    padding: theme.spacing(2),
  },
}));

const Summary = React.forwardRef((props, ref) => {
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

  const getData = async () => {
    const result = await getEntryDetail(state.entryType, state.entryId);
    if (result.status === cons.CODE_OK) {
      setState({ ...state, data: result.data, loading: false });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  };

  React.useEffect(() => {
    if (state.entryId > 0) getData();
  }, [state.entryId]);

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
        <Entry
          state={state}
          user={state.entryType === cons.ANIME_TYPE ?
            props.animelist ? props.animelist[state.entryId] : null :
            props.mangalist ? props.mangalist[state.entryId] : null
          } /> : null
      }
      {state.entryType === cons.CHAR_TYPE ?
        <Character state={state} /> : null
      }
      {state.entryType === cons.PEOPLE_TYPE ?
        <People state={state} /> : null
      }
    </Drawer>
  );
});

Summary.propTypes = {
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
};

export default Summary;