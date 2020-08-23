import React from 'react'
import {
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniEntry from '../../../components/card/MiniEntry';
import Summary from '../../../components/drawer/Summary'
import { capitalize, parseTime, timeToDuration, parseClock } from '../../../utils'
import { Link } from 'react-router-dom';
import * as cons from '../../../constant'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  relation: {
    height: 130
  },
  marginTop: {
    marginTop: theme.spacing(2)
  },
  row: {
    padding: theme.spacing(1)
  }
}))

const Details = (props) => {
  const data = props.data
  const classes = useStyles();

  const ref = React.useRef(null);

  const onClick = (id, type) => {
    ref.current.showSummary(id, type);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <InfoOutlinedIcon size='small' />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <b>Information</b>
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell className={classes.row} align='right'>Type</TableCell>
              <TableCell className={classes.row} align='left'>{data.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Episodes</TableCell>
              <TableCell className={classes.row} align='left'>{data.episode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Status</TableCell>
              <TableCell className={classes.row} align='left'>{data.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Producers</TableCell>
              <TableCell className={classes.row} align='left'>
                {!data.producers || data.producers.length === 0 ? '?' : data.producers
                  .map((p) => <Link to="" key={'p' + p.id} className={classes.link}>{p.name}</Link>)
                  .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Studios</TableCell>
              <TableCell className={classes.row} align='left'>
                {!data.studios || data.studios.length === 0 ? '?' : data.studios
                  .map((p) => <Link to="" key={'s' + p.id} className={classes.link}>{p.name}</Link>)
                  .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Licensors</TableCell>
              <TableCell className={classes.row} align='left'>
                {!data.licensors || data.licensors.length === 0 ? '?' : data.licensors
                  .map((p) => <Link to="" key={'l' + p.id} className={classes.link}>{p.name}</Link>)
                  .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Start Date</TableCell>
              <TableCell className={classes.row} align='left'>{parseTime(data.airing.start, "MMM D, YYYY") !== '' ? parseTime(data.airing.start, "MMM D, YYYY") : '?'}</TableCell>
            </TableRow>
            {data.episode === 1 ? null : (
              <TableRow>
                <TableCell className={classes.row} align='right'>End Date</TableCell>
                <TableCell className={classes.row} align='left'>{parseTime(data.airing.end, "MMM D, YYYY") !== '' ? parseTime(data.airing.end, "MMM D, YYYY") : '?'}</TableCell>
              </TableRow>
            )}
            {data.type !== cons.ANIME_TV ? null : (
              <TableRow>
                <TableCell className={classes.row} align='right'>Season</TableCell>
                <TableCell className={classes.row} align='left'>{data.premiered === '' ? '?' : capitalize(data.premiered)}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className={classes.row} align='right'>Duration</TableCell>
              <TableCell className={classes.row} align='left'>{timeToDuration(data.duration)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Broadcast</TableCell>
              <TableCell className={classes.row} align='left'>{data.airing.day === '' ? '?' : capitalize(data.airing.day) + ' ' + parseClock(data.airing.time, 'HH:mm:ss').format('HH:mm')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Source</TableCell>
              <TableCell className={classes.row} align='left'>{data.source}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Rating</TableCell>
              <TableCell className={classes.row} align='left'>{data.rating}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item md xs={12} container>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <LinkIcon />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                <b>Relations</b>
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={1}>
            {Object.keys(data.related).map(key => {
              return data.related[key].map(r => {
                return (
                  <Grid item md={4} xs={6} key={r.id} className={classes.relation}>
                    <MiniEntry
                      entryId={r.id}
                      entryType={r.type}
                      title={r.name}
                      image={r.image}
                      onClick={onClick}
                      height={130}
                      detail={[r.type, key.replace('_', ' ')]}
                    />
                  </Grid>
                )
              })
            })}
          </Grid>
          <Summary ref={ref} />
        </Grid >
        <Grid item md={6} xs={12} className={classes.marginTop}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <MusicNoteIcon size='small' />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                <b>Opening Theme</b>
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          {data.songs.opening.map((song, i) => {
            return (
              <Typography key={i}>
                {song}
              </Typography>
            )
          })}
        </Grid>
        <Grid item md={6} xs={12} className={classes.marginTop}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <MusicNoteIcon size='small' />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                <b>Opening Theme</b>
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          {data.songs.ending.map((song, i) => {
            return (
              <Typography key={i}>
                {song}
              </Typography>
            )
          })}
        </Grid>
      </Grid>

    </Grid>
  )
}

export default Details