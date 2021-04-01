import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Error from '../../components/error/Error';
import Entry from '../../components/card/Entry';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import StyledTitle from '../../components/styled/Title';
import PersonIcon from '@material-ui/icons/Person';
import { getEntryStaff } from '../../lib/api';
import * as cons from '../../lib/constant';

const Staff = (props) => {
  const data = props.data;

  const [state, setState] = React.useState({
    data: null,
    meta: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getEntryStaff(cons.ANIME_TYPE, data.id, 1, 6);
    if (result.status === cons.CODE_OK) {
      setState({ ...state, data: result.data, meta: result.meta, loading: false, error: null });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  }

  React.useEffect(() => {
    if (!data) return;
    getData();
  }, [data]);

  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <StyledTitle icon={<PersonIcon />} title='Staff' subtitle={!state.meta ? null : state.meta.count.toLocaleString()} />
          </Grid>
          {state.error !== null ?
            <Grid item xs={12}>
              <Error code={state.error.code} message={state.error.message} />
            </Grid> :
            state.data.length === 0 ?
              <Grid item xs={12}>
                <Typography>
                  No related staff.
                </Typography>
              </Grid> :
              state.data.map(s => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={s.id}>
                    <Entry
                      id={s.id}
                      type={cons.PEOPLE_TYPE}
                      title={s.name}
                      image={s.image}
                      onClick={props.showEntryDrawer}
                      detail={s.role}
                    />
                  </Grid>
                )
              })
          }
        </Grid>
      }
    </>
  );
};

Staff.propTypes = {
  data: PropTypes.object.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Staff;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton height={40} />
        <Divider />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Skeleton variant='rect' height={100} />
      </Grid>
    </Grid>
  );
};

