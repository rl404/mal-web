import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui'
import {
  Animation,
  HoverState,
  EventTracker,
  ValueScale
} from '@devexpress/dx-react-chart'

const LineChart = (props) => {
  const theme = useTheme()

  var barColor = props.color
  if (!barColor) {
    barColor = theme.palette.primary.main
  }

  const [target, changeHover] = React.useState(null)
  const TooltipContent = (tooltipProps) => {
    const { targetItem, text, ...restProps } = tooltipProps
    var value = props.float ?
      parseFloat(props.data[targetItem.point].value).toFixed(2) :
      parseInt(props.data[targetItem.point].value).toLocaleString()
    return (
      <Tooltip.Content
        {...restProps}
        text={props.prefix + value}
      />
    )
  }

  const TooltipOverlay = (tooltipProps) => {
    const { children, ...restProps } = tooltipProps
    return (
      <Tooltip.Overlay
        {...restProps}
        style={{ zIndex: 2000 }}
      >
        {children}
      </Tooltip.Overlay>
    )
  }

  const invertedDomain = d => [d[1], d[0]]

  return (
    <Chart data={props.data} height={props.height}>
      <ArgumentAxis />
      <ValueAxis />
      <ValueScale modifyDomain={props.inverted ? invertedDomain : null} />
      <Animation />
      <EventTracker />
      <LineSeries
        valueField='value'
        argumentField='key'
        color={barColor}
      />
      <HoverState
        hover={target}
        onHoverChange={changeHover}
      />
      <Tooltip
        targetItem={target}
        overlayComponent={TooltipOverlay}
        contentComponent={TooltipContent}
      />
    </Chart>
  )
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  height: PropTypes.number,
  color: PropTypes.string,
  float: PropTypes.bool,
  prefix: PropTypes.string,
  inverted: PropTypes.bool,
}

LineChart.defaultProps = {
  height: 200,
  float: false,
  prefix: '',
  inverted: false,
}

export default LineChart