import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy].value < a[orderBy].value) {
    return -1;
  }
  if (b[orderBy].value > a[orderBy].value) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Entry = (props) => {
  const [page, setPage] = React.useState(0);
  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(props.pagination ? 50 : props.data.length);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(0);
  const handleSorting = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  React.useEffect(() => {
    if (props.pagination) {
      setPage(0);
    } else {
      setRowsPerPage(props.data.length);
    }
  }, [props.data]);

  return (
    <>
      <Table stickyHeader size={props.dense ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            {props.header.map((h, i) => {
              if (!!h.hide && h.hide) return;
              return (
                <TableCell
                  key={i}
                  align={h.align ? h.align : 'left'}
                  sortDirection={orderBy === i ? order : false}>
                  {!h.sortable ? h.value :
                    <TableSortLabel
                      active={orderBy === i}
                      direction={orderBy === i ? order : 'asc'}
                      onClick={handleSorting(i)}
                    >
                      {h.value}
                    </TableSortLabel>
                  }
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!props.data ? null :
            stableSort(props.data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover key={i}>
                    {row.map((col, j) => {
                      if (!!col.hide && col.hide) return;
                      return (
                        <TableCell align={col.align ? col.align : 'left'} key={j}>
                          {col.label ? col.label : col.value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
          }
          {emptyRows > 0 && (
            <TableRow style={{ height: (props.dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={Object.keys(props.data).length} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!props.pagination ? null :
        <TablePagination
          component='div'
          rowsPerPageOptions={[20, 50, 100]}
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      }
    </>
  );
};

Entry.propTypes = {
  dense: PropTypes.bool,
  header: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    hide: PropTypes.bool,
    sortable: PropTypes.bool,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.any,
    value: PropTypes.any.isRequired,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    hide: PropTypes.bool,
  }))),
  pagination: PropTypes.bool,
};

export default Entry;