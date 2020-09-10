import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as cons from '../../../constant';
import Staff from './Staff';
import Statistics from './Stats';
import Characters from './Characters';
import { capitalize, parseTime, timeToDuration, parseClock, splitCamel } from '../../../utils';
import StyledTitle from '../../../components/styled/Title';
import EntryCard from '../../../components/card/Entry';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  relation: {
    height: 130,
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  row: {
    padding: theme.spacing(1),
  },
}))

const Details = (props) => {
  const data = props.data;
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <StyledTitle icon={<InfoOutlinedIcon size='small' />} title='Information' />
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell className={classes.row} align='right'>Type</TableCell>
              <TableCell className={classes.row} align='left'>{cons.ANIME_TYPES[data.type]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Episodes</TableCell>
              <TableCell className={classes.row} align='left'>{data.episode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Status</TableCell>
              <TableCell className={classes.row} align='left'>{cons.ANIME_STATUS[data.status]}</TableCell>
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
              <TableCell className={classes.row} align='left'>{cons.ANIME_SOURCES[data.source]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Rating</TableCell>
              <TableCell className={classes.row} align='left'>{cons.ANIME_RATINGS[data.rating]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item md xs={12} container>

        <Grid item xs={12}>
          <Statistics data={data} />
        </Grid>

        <Grid item xs={12} className={classes.marginTop}>
          <StyledTitle icon={<LinkIcon />} title='Relations' />
          <Grid container spacing={1}>
            {isRelatedEmpty(data.related) ?
              <Typography>
                No related anime/manga found.
              </Typography> :
              Object.keys(data.related).map(key => {
                return data.related[key].map(r => {
                  return (
                    <Grid item md={4} sm={6} xs={12} key={r.id}>
                      <EntryCard
                        id={r.id}
                        type={r.type}
                        title={r.name}
                        image={r.image}
                        onClick={props.onClick}
                        detail={[r.type, splitCamel(key)]}
                      />
                    </Grid>
                  )
                })
              })}
          </Grid>
        </Grid >

        <Grid item xs={12} className={classes.marginTop}>
          <StyledTitle icon={<PersonIcon />} title='Characters' />
          <Characters data={data} limit={6} onClick={props.onClick} />
        </Grid>

        <Grid item xs={12} className={classes.marginTop}>
          <StyledTitle icon={<PersonIcon />} title='Staff' />
          <Staff data={data} limit={6} onClick={props.onClick} />
        </Grid>

        <Grid item md={6} xs={12} className={classes.marginTop}>
          <StyledTitle icon={<MusicNoteIcon size='small' />} title='Opening Theme' />
          {!data.songs.opening || data.songs.opening.length === 0 ?
            <Typography>
              No opening theme found.
            </Typography> :
            data.songs.opening.map((song, i) => {
              return (
                <Typography key={i}>
                  {song}
                </Typography>
              )
            })}
        </Grid>

        <Grid item md={6} xs={12} className={classes.marginTop}>
          <StyledTitle icon={<MusicNoteIcon size='small' />} title='Closing Theme' />
          {!data.songs.ending || data.songs.ending.length === 0 ?
            <Typography>
              No ending theme found.
            </Typography> :
            data.songs.ending.map((song, i) => {
              return (
                <Typography key={i}>
                  {song}
                </Typography>
              )
            })}
        </Grid>

      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Details;

const isRelatedEmpty = (related) => {
  var isEmpty = true;
  Object.keys(related).forEach(key => {
    if (related[key].length > 0) {
      isEmpty = false;
    }
  });
  return isEmpty;
}