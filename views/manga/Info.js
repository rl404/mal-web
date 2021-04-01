import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as cons from '../../lib/constant'
import PropTypes from 'prop-types'
import StyledTitle from '../../components/styled/Title'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Link from 'next/link'
import { malToDate, slugify } from '../../lib/utils'

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
}))

const Info = (props) => {
  const data = props.data
  const classes = useStyles()
  return (
    <div className={classes.info}>
      <StyledTitle icon={<InfoOutlinedIcon size='small' />} title='Information' />
      <Table size='small'>
        <TableBody>
          <TableRow>
            <TableCell className={classes.categoryName}>Type</TableCell>
            <TableCell className={classes.categoryData}>{cons.MANGA_TYPES[data.type]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Chapter</TableCell>
            <TableCell className={classes.categoryData}>{data.chapter.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Volume</TableCell>
            <TableCell className={classes.categoryData}>{data.volume.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Status</TableCell>
            <TableCell className={classes.categoryData}>{cons.MANGA_STATUS[data.status]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Authors</TableCell>
            <TableCell className={classes.categoryData}>
              {!data.authors || data.authors.length === 0 ? '?' : data.authors
                .map((p) => <Link href={`/people/${p.id}/${slugify(p.name)}`} key={'p' + p.id}><a className={classes.link}>{p.name} ({p.role})</a></Link>)
                .reduce((prev, curr) => [prev, <br key={prev} />, curr])
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Serializations</TableCell>
            <TableCell className={classes.categoryData}>
              {!data.serializations || data.serializations.length === 0 ? '?' : data.serializations
                .map((p) => <Link href={`/search/manga?magazine=${p.id}`} key={'p' + p.id}><a className={classes.link}>{p.name}</a></Link>)
                .reduce((prev, curr) => [prev, <br key={prev} />, curr])
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Start Date</TableCell>
            <TableCell className={classes.categoryData}>{malToDate(data.publishing.start)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>End Date</TableCell>
            <TableCell className={classes.categoryData}>{malToDate(data.publishing.end)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

Info.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Info
