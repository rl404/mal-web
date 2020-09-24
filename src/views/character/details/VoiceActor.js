import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import PropTypes from 'prop-types';
import * as cons from '../../../constant';
import { getEntryVA } from '../../../api';
import ErrorArea from '../../../components/error/Error';
import EntryCard from '../../../components/card/Entry';
import StyledDivider from '../../../components/styled/Divider';

const VoiceActor = (props) => {
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
        const result = await getEntryVA(cons.CHAR_TYPE, data.id)
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
      {!state ? null : state.loading ? <VoiceActorLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            {!state.data || state.data.length === 0 ?
              <Typography>
                No related voice actors found.
              </Typography> :
              state.data.map(va => {
                return (
                  <Grid item lg={4} md={6} xs={12} key={va.id}>
                    <EntryCard
                      id={va.id}
                      type={cons.PEOPLE_TYPE}
                      title={va.name}
                      image={va.image}
                      detail={[va.role]}
                      onClick={props.onClick}
                    />
                  </Grid>
                )
              })}
          </Grid>
      }
    </>
  );
};

VoiceActor.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default VoiceActor;

const VoiceActorLoading = () => {
  return (
    <Grid container spacing={1}>
      <Skeleton height={40} width={150} />
      <StyledDivider />
      <Grid container spacing={1}>
        {[0, 1, 2, 3].map(i => {
          return (
            <Grid item lg={3} md={4} xs={6} key={i}>
              <Skeleton variant='rect' height={130} />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  );
};