import React from 'react'
import {
  Grid,
  Typography,
  Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniEntry from '../../../components/card/MiniEntry';
import Summary from '../../../components/drawer/Summary'

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(1)
  },
}))

const Details = (props) => {
  const data = props.data
  const classes = useStyles();

  const ref = React.useRef(null);

  const onClick = (id, type) => {
    ref.current.showSummary(id, type);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          <b>Relations</b>
        </Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={1}>
          {Object.keys(data.related).map(key => {
            return data.related[key].map(r => {
              return (
                <Grid item sm key={r.id}>
                  <MiniEntry
                    entryId={r.id}
                    entryType={r.type}
                    title={r.name}
                    image={r.image}
                    relation={key.replace('_', ' ')}
                    onClick={onClick}
                  />
                </Grid>
              )
            })
          })}
        </Grid>
      </Grid>
      <Summary ref={ref} />
    </Grid>
  )
}

export default Details