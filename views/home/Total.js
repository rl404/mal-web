import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TheatersIcon from '@material-ui/icons/Theaters'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PersonIcon from '@material-ui/icons/Person'
import * as cons from '../../lib/constant'
import Stats from '../../components/card/Stats'
import Error from '../../components/error/Error'

const Total = ({ result }) => {
  const iconMap = {
    [cons.ANIME_TYPE]: <TheatersIcon />,
    [cons.MANGA_TYPE]: <MenuBookIcon />,
    [cons.CHAR_TYPE]: <PersonIcon />,
    [cons.PEOPLE_TYPE]: <PersonIcon />,
  }

  if (result.status !== cons.CODE_OK) {
    return <Error code={result.status} message={result.message} />
  }

  return (
    <Grid container spacing={1}>
      {Object.keys(result.data).map(key => {
        return (
          <Grid item xs={3} key={key}>
            <Link href={'/search/' + key}>
              <a style={{ textDecoration: 'none' }}>
                <Stats
                  icon={iconMap[key]}
                  data={result.data[key].toLocaleString()}
                  name={key}
                />
              </a>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

Total.propTypes = {
  result: PropTypes.object.isRequired,
}

export default Total
