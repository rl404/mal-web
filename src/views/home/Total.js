import React from 'react';
import Grid from '@material-ui/core/Grid';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { getSummaryTotal } from '../../api';
import * as cons from '../../constant';
import Stats from '../../components/card/Stats';
import Skeleton from '@material-ui/lab/Skeleton';
import Error from '../../components/error/Error';

const Total = () => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  const getData = async () => {
    const result = await getSummaryTotal()
    if (result.status === cons.CODE_OK) {
      setState({ ...state, data: result.data, loading: false, error: null });
    } else {
      setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const iconMap = {
    [cons.ANIME_TYPE]: <TheatersIcon />,
    [cons.MANGA_TYPE]: <MenuBookIcon />,
    [cons.CHAR_TYPE]: <PersonIcon />,
    [cons.PEOPLE_TYPE]: <PersonIcon />,
  };

  return (
    <>
      {state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1}>
            {Object.keys(state.data).map(key => {
              return (
                <Grid item xs={3} key={key}>
                  <Link to={'/search/' + key} style={{ textDecoration: 'none' }}>
                    <Stats
                      icon={iconMap[key]}
                      data={state.data[key].toLocaleString()}
                      name={key}
                    />
                  </Link>
                </Grid>
              )
            })}
          </Grid>
      }
    </>
  );
};

export default Total;

const Loading = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3].map(i => {
        return (
          <Grid item xs={3} key={i}>
            <Skeleton variant='rect' height={80} />
          </Grid>
        );
      })}
    </Grid>
  );
};