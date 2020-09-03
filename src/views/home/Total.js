import React from 'react';
import Grid from '@material-ui/core/Grid';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import { getMainTotal } from '../../api';
import * as cons from '../../constant';
import StatsCard from '../../components/card/Stats';
import ErrorArea from '../../components/error/Error';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    margin: 'auto',
    '& svg': {
      fontSize: '2.5rem',
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  link: {
    textDecoration: 'none',
  },
  details: {
    display: 'flex',
  },
}))

const Total = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (state.data === null && state.error === null) {
      const getData = async () => {
        const result = await getMainTotal()
        if (result.status === cons.CODE_OK) {
          setState({ ...state, data: result.data, loading: false });
        } else {
          setState({ ...state, error: { code: result.status, message: result.message }, loading: false });
        }
      };
      getData();
    }
  });

  const iconMap = {
    [cons.ANIME_TYPE]: <TheatersIcon />,
    [cons.MANGA_TYPE]: <MenuBookIcon />,
    [cons.CHAR_TYPE]: <PersonIcon />,
    [cons.PEOPLE_TYPE]: <PersonIcon />,
  };

  return (
    <>
      {state.loading ? <TotalLoading /> :
        state.error !== null ? <ErrorArea code={state.error.code} message={state.error.message} /> :
          <Grid container spacing={1} justify="center">
            {Object.keys(state.data).map(key => {
              return (
                <Grid item md={3} key={key}>
                  <Link to={'/search/' + key} className={classes.link}>
                    <StatsCard
                      width={200}
                      icon={iconMap.[key]}
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

const TotalLoading = () => {
  return (
    <Grid container spacing={1} justify="center">
      {[0, 1, 2, 3].map(i => {
        return (
          <Grid item md={3} key={i}>
            <Skeleton variant="rect" width={200} height={80} style={{ margin: 'auto' }} />
          </Grid>
        )
      })}
    </Grid>
  );
};