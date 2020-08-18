import React from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { getMainTotal } from '../../api';
import * as cons from '../../constant'
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
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

  const iconMap = {
    cons.ANIME_TYPE: <TheatersIcon />,
    cons.MANGA_TYPE: <MenuBookIcon />,
    cons.CHARACTER_TYPE:
    cons.PEOPLE_TYPE:
  }

  return (
    <Grid container spacing={1}>
      {Object.keys(data).map(key => {
        return (
          <Grid item md={3}>
            <Card>
              <div className={classes.details}>
                <CardContent>
                  {iconMap.[key]}
                </CardContent>
              <CardContent >
                <Typography variant="h5">
                  {data[key]}
                </Typography>
                <Typography color="textSecondary">
                  {key}
                </Typography>
              </CardContent>
              </div>
            </Card>
          </Grid>
        )
      })}

    </Grid>
  )
}

export default Total