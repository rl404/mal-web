import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { ellipsis } from '../../lib/utils'
import { withStyles } from '@material-ui/core'

const EllipsisButton = withStyles((theme) => ({
  root: {
    color: theme.palette.icon,
  },
}))(Button)

const Ellipsis = (props) => {
  const [state, setState] = React.useState(false)
  const toggleText = () => {
    setState(!state)
  }

  return (
    <>
      {state ? props.text : ellipsis(props.text, props.limit)}
      {props.text.length <= props.limit ? null :
        <>
          <br />
          {state ?
            <EllipsisButton size='small' onClick={toggleText}>Show less</EllipsisButton> :
            <EllipsisButton size='small' onClick={toggleText}>Show more</EllipsisButton>
          }
        </>
      }
    </>
  )
}

Ellipsis.propTypes = {
  limit: PropTypes.number,
}

Ellipsis.defaultProps = {
  limit: 200,
}

export default Ellipsis