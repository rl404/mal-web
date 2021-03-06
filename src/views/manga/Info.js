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
import { malToDate, slugify } from '../../utils';

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
                  <TableCell className={classes.categoryData}>{cons.MANGA_TYPES[state.data.type]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Chapter</TableCell>
                  <TableCell className={classes.categoryData}>{state.data.chapter.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Volume</TableCell>
                  <TableCell className={classes.categoryData}>{state.data.volume.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Status</TableCell>
                  <TableCell className={classes.categoryData}>{cons.MANGA_STATUS[state.data.status]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Authors</TableCell>
                  <TableCell className={classes.categoryData}>
                    {!state.data.authors || state.data.authors.length === 0 ? '?' : state.data.authors
                      .map((p) => <Link to={`/people/${p.id}/${slugify(p.name)}`} key={'p' + p.id} className={classes.link}>{p.name} ({p.role})</Link>)
                      .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Serializations</TableCell>
                  <TableCell className={classes.categoryData}>
                    {!state.data.serializations || state.data.serializations.length === 0 ? '?' : state.data.serializations
                      .map((p) => <Link to={`/search/manga?magazine=${p.id}`} key={'p' + p.id} className={classes.link}>{p.name}</Link>)
                      .reduce((prev, curr) => [prev, <br key={prev} />, curr])
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>Start Date</TableCell>
                  <TableCell className={classes.categoryData}>{malToDate(state.data.publishing.start)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.categoryName}>End Date</TableCell>
                  <TableCell className={classes.categoryData}>{malToDate(state.data.publishing.end)}</TableCell>
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
        </TableBody>
      </Table>
    </>
  );
};