import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Entry = (props) => {
  return (
    <Table stickyHeader size={props.size ? props.size : 'medium'}>
      <TableHead>
        <TableRow>
          {props.header.map((h, i) => {
            if (!!h.hide && h.hide) return;
            return (
              <TableCell align={h.align ? h.align : 'left'} key={i}>
                {h.value}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {!props.data ? null : props.data.map((row, i) => {
          return (
            <TableRow hover key={i}>
              {row.map((col, j) => {
                if (!!col.hide && col.hide) return;
                return (
                  <TableCell align={col.align ? col.align : 'left'} key={j}>
                    {col.value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
};

Entry.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  header: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    hide: PropTypes.bool,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    hide: PropTypes.bool,
  }))),
};

export default Entry;