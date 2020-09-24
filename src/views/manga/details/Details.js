import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as cons from '../../../constant';
import Statistics from './Stats';
import Characters from './Characters';
import { slugify, parseTime, splitCamel } from '../../../utils';
import StyledTitle from '../../../components/styled/Title';
import EntryCard from '../../../components/card/Entry';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  row: {
    padding: theme.spacing(1),
  },
  more: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  moreButton: {
    margin: theme.spacing(1),
  },
}))

const Details = (props) => {
  const data = props.data
  const classes = useStyles();

  var relatedCount = 0;
  Object.keys(data.related).forEach(key => {
    relatedCount += data.related[key].length;
  });

  var count = 0;
  const [state, setState] = React.useState(6);
  const showMore = () => {
    setState(state + 6);
  };

  const showAll = () => {
    setState(relatedCount);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <StyledTitle icon={<InfoOutlinedIcon size='small' />} title='Information' />
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell className={classes.row} align='right'>Type</TableCell>
              <TableCell className={classes.row} align='left'>{cons.MANGA_TYPES[data.type]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Volume</TableCell>
              <TableCell className={classes.row} align='left'>{data.volume}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Chapter</TableCell>
              <TableCell className={classes.row} align='left'>{data.chapter}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Status</TableCell>
              <TableCell className={classes.row} align='left'>{cons.MANGA_STATUS[data.status]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Authors</TableCell>
              <TableCell className={classes.row} align='left'>
                {!data.authors || data.authors.length === 0 ? '?' : data.authors
                  .map((p) => <Link to={`/people/${p.id}/${slugify(p.name)}`} key={'p' + p.id} className={classes.link}>{p.name} ({p.role})</Link>)
                  .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Serializations</TableCell>
              <TableCell className={classes.row} align='left'>
                {!data.serializations || data.serializations.length === 0 ? '?' : data.serializations
                  .map((p) => <Link to={`/search/manga?producer=${p.id}`} key={'s' + p.id} className={classes.link}>{p.name}</Link>)
                  .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>Start Date</TableCell>
              <TableCell className={classes.row} align='left'>{parseTime(data.publishing.start, "MMM D, YYYY") !== '' ? parseTime(data.publishing.start, "MMM D, YYYY") : '?'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.row} align='right'>End Date</TableCell>
              <TableCell className={classes.row} align='left'>{parseTime(data.publishing.end, "MMM D, YYYY") !== '' ? parseTime(data.publishing.end, "MMM D, YYYY") : '?'}</TableCell>
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
            {relatedCount === 0 ?
              <Typography>
                No related anime/manga found.
              </Typography> :
              Object.keys(data.related).map(key => {
                return data.related[key].map(r => {
                  count++
                  if (count > state) {
                    return null;
                  } else {
                    return (
                      <Grid item md={4} sm={6} xs={12} key={r.id} className={classes.relation}>
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
                  }
                })
              })}
          </Grid>
          {relatedCount <= state ? null :
            <div className={classes.more}>
              <Button
                size='small'
                variant='contained'
                color='primary'
                className={classes.moreButton}
                onClick={showMore}>
                Show more
                </Button>
              <Button
                size='small'
                variant='contained'
                color='primary'
                className={classes.moreButton}
                onClick={showAll}>
                Show all ({relatedCount})
                </Button>
            </div>
          }
        </Grid >

        <Grid item xs={12} className={classes.marginTop}>
          <StyledTitle icon={<PersonIcon />} title='Characters' />
          <Characters data={data} limit={6} onClick={props.onClick} />
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
