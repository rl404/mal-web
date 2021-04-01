import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import * as cons from '../../lib/constant'
import StyledTitle from '../../components/styled/Title'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import { malToDate, capitalize, timeToDuration, parseClock } from '../../lib/utils'

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
            <TableCell className={classes.categoryData}>{cons.ANIME_TYPES[data.type]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Episodes</TableCell>
            <TableCell className={classes.categoryData}>{data.episode.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Status</TableCell>
            <TableCell className={classes.categoryData}>{cons.ANIME_STATUS[data.status]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Producers</TableCell>
            <TableCell className={classes.categoryData}>
              {!data.producers || data.producers.length === 0 ? '?' : data.producers
                .map((p) => <Link href={`/search/anime?producer=${p.id}`} key={'p' + p.id}><a className={classes.link}>{p.name}</a></Link>)
                .reduce((prev, curr) => [prev, <br key={prev} />, curr])
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Studios</TableCell>
            <TableCell className={classes.categoryData}>
              {!data.studios || data.studios.length === 0 ? '?' : data.studios
                .map((p) => <Link href={`/search/anime?producer=${p.id}`} key={'p' + p.id}><a className={classes.link}>{p.name}</a></Link>)
                .reduce((prev, curr) => [prev, <br key={prev} />, curr])
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Licensors</TableCell>
            <TableCell className={classes.categoryData}>
              {!data.licensors || data.licensors.length === 0 ? '?' : data.licensors
                .map((p) => <Link href={`/search/anime?producer=${p.id}`} key={'p' + p.id}><a className={classes.link}>{p.name}</a></Link>)
                .reduce((prev, curr) => [prev, <br key={prev} />, curr])
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Start Date</TableCell>
            <TableCell className={classes.categoryData}>{malToDate(data.airing.start)}</TableCell>
          </TableRow>
          {data.episode === 1 ? null :
            <TableRow>
              <TableCell className={classes.categoryName}>End Date</TableCell>
              <TableCell className={classes.categoryData}>{malToDate(data.airing.end)}</TableCell>
            </TableRow>
          }
          {data.premiered === '' ? null :
            <>
              <TableRow>
                <TableCell className={classes.categoryName}>Season</TableCell>
                <TableCell className={classes.categoryData}>{capitalize(data.premiered)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.categoryName}>Broadcast</TableCell>
                <TableCell className={classes.categoryData}>{data.airing.day === '' ? '?' : (capitalize(data.airing.day) + ' ' + parseClock(data.airing.time, 'HH:mm:ss').format('HH:mm'))}</TableCell>
              </TableRow>
            </>
          }
          <TableRow>
            <TableCell className={classes.categoryName}>Duration</TableCell>
            <TableCell className={classes.categoryData}>{timeToDuration(data.duration)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Source</TableCell>
            <TableCell className={classes.categoryData}>{cons.ANIME_SOURCES[data.source]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.categoryName}>Rating</TableCell>
            <TableCell className={classes.categoryData}>{cons.ANIME_RATINGS[data.rating]}</TableCell>
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
