import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CheckIcon from '@material-ui/icons/Check';
import PauseIcon from '@material-ui/icons/Pause';
import ClearIcon from '@material-ui/icons/Clear';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getUserList } from '../../../api';
import ErrorArea from '../../../components/error/Error';
import SortTable from '../../../components/table/SortTable';

const statsIcon = {
  1: <PlayArrowIcon color='primary' fontSize='small' />,
  2: <CheckIcon color='primary' fontSize='small' />,
  3: <PauseIcon color='primary' fontSize='small' />,
  4: <ClearIcon color='primary' fontSize='small' />,
  6: <EventNoteIcon color='primary' fontSize='small' />,
}

const List = (props) => {
  const [state, setState] = React.useState({
    data: null,
    meta: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getUserList(props.username, props.type);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, meta: result.meta, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    !state ? null : state.loading ? <ListLoading /> :
      state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
        <Grid container>
          <Grid item xs={12} style={{ width: 0 }}>
            <SortTable
              defaultLimit={50}
              limit={[50, 100, 500]}
              header={[
                { id: 'status', align: 'center', label: 'Status' },
                { id: 'title', align: 'left', label: 'Title' },
                { id: 'type', align: 'center', label: 'Type' },
                { id: 'score', align: 'center', label: 'Score' },
              ]}
              data={state.data.map(d => {
                return {
                  status: { value: d.status, align: 'center', formatted: <Tooltip placement='top' title={props.type === cons.ANIME_TYPES ? cons.ANIME_USER_STATUS[d.status] : cons.MANGA_USER_STATUS[d.status]}>{statsIcon[d.status]}</Tooltip> },
                  title: { value: d.title, align: 'left', onClick: () => props.onClick(props.type, d.id) },
                  type: { value: d.type, align: 'center', formatted: props.type === cons.ANIME_TYPE ? cons.ANIME_TYPES[d.type] : cons.MANGA_TYPES[d.type] },
                  score: { value: d.userScore, align: 'center', formatted: Number(d.userScore).toFixed(2) },
                }
              })}
            />
          </Grid>
        </Grid>
  )
};

export default List;

List.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.oneOf([cons.ANIME_TYPE, cons.MANGA_TYPE]),
  onClick: PropTypes.func.isRequired,
};

const ListLoading = () => {
  return (
    <TableContainer>
      <Table size='small'>
        <TableBody>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i =>
            <TableRow key={i}>
              <TableCell><Skeleton width={20} /></TableCell>
              <TableCell><Skeleton width={Math.random() * (300 - 100) + 100} /></TableCell>
              <TableCell><Skeleton width={100} /></TableCell>
              <TableCell><Skeleton width={50} /></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
};