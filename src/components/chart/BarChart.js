import React from 'react'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  HoverState,
  EventTracker
} from '@devexpress/dx-react-chart';

const BarChart = (props) => {
  const [target, changeHover] = React.useState(null)
  const TooltipContent = (tooltipProps) => {
    const { targetItem, text, ...restProps } = tooltipProps;
    return (
      <div>
        <Tooltip.Content
          {...restProps}
          text={parseInt(props.data[targetItem.point].[props.valueField]).toLocaleString()}
        />
      </div>
    );
  };

  return (
    <Chart data={props.data} height={props.height}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries
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

export default BarChart