import React from 'react'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  HoverState,
  EventTracker
} from '@devexpress/dx-react-chart';

const LineChart = (props) => {
  const [target, changeHover] = React.useState(null)
  const TooltipContent = (tooltipProps) => {
    const { targetItem, text, ...restProps } = tooltipProps;
    return (
      <div>
        <Tooltip.Content
          {...restProps}
          text={parseFloat(props.data[targetItem.point].[props.valueField]).toFixed(2)}
        />
      </div>
    );
  };

  return (
    <Chart data={props.data} height={props.height}>
      <ArgumentAxis />
      <ValueAxis />
      <LineSeries
        valueField={props.valueField}
        argumentField={props.argumentField}
        color={props.color}
      />
      <Animation />
      <EventTracker />
      <HoverState
        hover={target}
        onHoverChange={changeHover}
      />
      <Tooltip
        targetItem={target}
        contentComponent={TooltipContent}
      />
    </Chart>
  )
}

export default LineChart