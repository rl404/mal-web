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
import { getEntryCharacters } from '../../api';
import * as cons from '../../constant';

const Character = (props) => {
  const topState = props.state;

  const [state, setState] = React.useState({
    data: null,
    meta: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getEntryCharacters(cons.MANGA_TYPE, topState.data.id, 1, 6);
    if (result.status === cons.CODE_OK) {
      setState({ ...state, data: result.data, meta: result.meta, loading: false });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  }

  React.useEffect(() => {
    if (!topState.data) return;
    getData();
  }, [topState.data]);

  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <StyledTitle icon={<PersonIcon />} title='Characters' subtitle={state.meta.count.toLocaleString()} />
            </Grid>
            {state.data.length === 0 ?
              <Grid item xs={12}>
                <Typography>
                  No related character.
                </Typography>
              </Grid> :
              state.data.map(c => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={c.id}>
                    <Entry
                      id={c.id}
                      type={cons.CHAR_TYPE}
                      title={c.name}
                      image={c.image}
                      onClick={props.showEntryDrawer}
                      detail={c.role}
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

Character.propTypes = {
  state: PropTypes.object.isRequired,
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Character;

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
