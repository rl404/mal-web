import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { getMainTotal } from '../../api';
import * as cons from '../../constant'
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import Stats from '../../components/card/Stats';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    margin: 'auto',
    '& svg': {
      fontSize: '2.5rem'
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(2)
    },
  },
  link: {
    textDecoration: 'none'
  },
  details: {
    display: 'flex',
  }
}))

const Total = () => {
  const classes = useStyles();

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      const result = await getMainTotal()
      if (result.status === cons.CODE_OK) {
        setData(result.data);
      } else {
        setError(result.message)
        console.error(error)
      }
      setLoading(false)
    }
    getData()
  }, [error]);

  const iconMap = {}
  iconMap[cons.ANIME_TYPE] = <TheatersIcon />
  iconMap[cons.MANGA_TYPE] = <MenuBookIcon />
  iconMap[cons.CHAR_TYPE] = <PersonIcon />
  iconMap[cons.PEOPLE_TYPE] = <PersonIcon />

  if (loading) {
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
    )
  }

  return (
    <Grid container spacing={1} justify="center">
      {Object.keys(data).map(key => {
        return (
          <Grid item md={3} key={key}>
            <Link to={'/search/' + key} className={classes.link}>
              <Stats
                width={200}
                icon={iconMap.[key]}
                data={data[key].toLocaleString()}
                name={key}
              />
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Total