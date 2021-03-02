import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as cons from '../../constant';
import Error from '../../components/error/Error';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import StyledTitle from '../../components/styled/Title';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { malToDate, capitalize, timeToDuration, parseClock } from '../../utils';

const useStyles = makeStyles((theme) => ({
  info: {
    position: 'sticky',
    top: 70,
  },
  categoryName: {
    textAlign: 'right',
    padding: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  categoryData: {
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.link,
    },
  },
}));

const Info = (props) => {
  const state = props.state;
  const classes = useStyles();
  return (
    <>
      {!state ? null : state.loading ? <Loading /> :
        state.error !== null ? <Error code={state.error.code} message={state.error.message} /> :
          <div className={classes.info}>
            <StyledTitle icon={<InfoOutlinedIcon size='small' />} title='Information' />
            <Table size='small'>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.categoryName}>Type</TableCell>
                  <TableCell className={classes.categoryData}>{cons.ANIME_TYPES[state.data.type]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Episodes</TableCell>
                  <TableCell className={classes.categoryData}>{state.data.episode.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Status</TableCell>
                  <TableCell className={classes.categoryData}>{cons.ANIME_STATUS[state.data.status]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Producers</TableCell>
                  <TableCell className={classes.categoryData}>
                    {!state.data.producers || state.data.producers.length === 0 ? '?' : state.data.producers
                      .map((p) => <Link to={`/search/anime?producer=${p.id}`} key={'p' + p.id} className={classes.link}>{p.name}</Link>)
                      .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Studios</TableCell>
                  <TableCell className={classes.categoryData}>
                    {!state.data.studios || state.data.studios.length === 0 ? '?' : state.data.studios
                      .map((p) => <Link to={`/search/anime?producer=${p.id}`} key={'p' + p.id} className={classes.link}>{p.name}</Link>)
                      .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Licensors</TableCell>
                  <TableCell className={classes.categoryData}>
                    {!state.data.licensors || state.data.licensors.length === 0 ? '?' : state.data.licensors
                      .map((p) => <Link to={`/search/anime?producer=${p.id}`} key={'p' + p.id} className={classes.link}>{p.name}</Link>)
                      .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Start Date</TableCell>
                  <TableCell className={classes.categoryData}>{malToDate(state.data.airing.start)}</TableCell>
                </TableRow>
                {state.data.episode === 1 ? null :
                  <TableRow>
                    <TableCell className={classes.categoryName}>End Date</TableCell>
                    <TableCell className={classes.categoryData}>{malToDate(state.data.airing.end)}</TableCell>
                  </TableRow>
                }
                {state.data.premiered === '' ? null :
                  <>
                    <TableRow>
                      <TableCell className={classes.categoryName}>Season</TableCell>
                      <TableCell className={classes.categoryData}>{capitalize(state.data.premiered)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.categoryName}>Broadcast</TableCell>
                      <TableCell className={classes.categoryData}>{state.data.airing.day === '' ? '?' : (capitalize(state.data.airing.day) + ' ' + parseClock(state.data.airing.time, 'HH:mm:ss').format('HH:mm'))}</TableCell>
                    </TableRow>
                  </>
                }
                <TableRow>
                  <TableCell className={classes.categoryName}>Duration</TableCell>
                  <TableCell className={classes.categoryData}>{timeToDuration(state.data.duration)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Source</TableCell>
                  <TableCell className={classes.categoryData}>{cons.ANIME_SOURCES[state.data.source]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Rating</TableCell>
                  <TableCell className={classes.categoryData}>{cons.ANIME_RATINGS[state.data.rating]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
      }
    </>
  );
};

Info.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Info;

const Loading = () => {
  return (
    <>
      <Skeleton height={40} />
      <Divider />
      <Table size='small'>
        <TableBody>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton height={30} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};