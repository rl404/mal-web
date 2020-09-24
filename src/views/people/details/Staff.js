import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getEntryStaff } from '../../../api';
import EntryCard from '../../../components/card/Entry';
import ErrorArea from '../../../components/error/Error';

const Staff = (props) => {
  const idRef = React.useRef(0);
  const data = props.data;

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if ((state.data === null && state.error === null) || idRef.current !== data.id) {
      idRef.current = data.id;

      const getData = async () => {
        const result = await getEntryStaff(cons.PEOPLE_TYPE, data.id);
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      }
      getData();
    }
  });

  return (
    <>
      {!state ? null : state.loading ? <StaffLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            {!state.data || state.data.length === 0 ?
              <Typography>
                No anime staff position found.
              </Typography> :
              state.data.map(anime => {
                return (
                  <Grid item lg={3} md={4} xs={6} key={anime.id}>
                    <EntryCard
                      id={anime.id}
                      type={cons.ANIME_TYPE}
                      title={anime.name}
                      image={anime.image}
                      onClick={props.onClick}
                      detail={[anime.role]}
                    />
                  </Grid>
                )
              })}
          </Grid>
      }
    </>
  );
};

Staff.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Staff;

const StaffLoading = () => {
  return (
    <Grid container spacing={1}>
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4, 5].map(i => {
          return (
            <Grid item lg={4} md={6} xs={12} key={i}>
              <Skeleton variant='rect' height={130} />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  );
};