import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const SortTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.defaultLimit ? props.defaultLimit : 10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  if (rowsPerPage >= props.data.length) {
    emptyRows = 0;
  }

  return (
    <>
      <TableContainer>
        <Table size='small'>
          <SortTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            header={props.header}
          />
          <TableBody>
            {stableSort(props.data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover key={index}>
                    {Object.keys(row).map(k => {
                      return (
                        <TableCell key={k} align={row[k].align} onClick={row[k].onClick ? row[k].onClick : null}>
                          {row[k].link ?
                            <a href={row[k].link} target='_blank' rel='noopener noreferrer' className={classes.link}>
                              {row[k].formatted ? row[k].formatted : row[k].value}
                            </a> :
                            row[k].formatted ? row[k].formatted : row[k].value
                          }
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            }
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={props.header.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        rowsPerPageOptions={props.limit ? props.limit : [10, 20, 50]}
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
};

export default SortTable;

SortTable.propTypes = {
  defaultLimit: PropTypes.number,
  limit: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        value: PropTypes.isRequired,
        align: PropTypes.oneOf(['left', 'center', 'right']),
        formatted: PropTypes.any,
        onClick: PropTypes.func,
        link: PropTypes.string,
      }).isRequired
    ).isRequired
  ).isRequired,
  header: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
    })
  ).isRequired,
};

const descendingComparator = (a, b, orderBy) => {
  if (orderBy === '') return 0;
  if (b[orderBy].value < a[orderBy].value) return -1;
  if (b[orderBy].value > a[orderBy].value) return 1;
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const SortTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort, header } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {header.map(h => (
          <TableCell
            key={h.id}
            align={h.align}
            sortDirection={orderBy === h.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === h.id}
              direction={orderBy === h.id ? order : 'asc'}
              onClick={createSortHandler(h.id)}
            >
              {h.label ? h.label : capitalize(h.id)}
              {orderBy === h.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
};

SortTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  header: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      label: PropTypes.string,
    })
  ).isRequired,
};