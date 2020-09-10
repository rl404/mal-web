import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
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
  const theme = useTheme();

  var barColor = props.color;
  if (!barColor) {
    barColor = theme.palette.primary.chart;
  }

  const [target, changeHover] = React.useState(null)
  const TooltipContent = (tooltipProps) => {
    const { targetItem, text, ...restProps } = tooltipProps;
    return (
      <div>
        <Tooltip.Content
          {...restProps}
          text={parseFloat(props.data[targetItem.point].value).toFixed(2)}
        />
      </div>
    );
  };

  return (
    <Chart data={props.data} height={props.height}>
      <ArgumentAxis />
      <ValueAxis />
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
        contentComponent={TooltipContent}
      />
    </Chart>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  height: PropTypes.number,
  color: PropTypes.string,
};

LineChart.defaultProps = {
  height: 200,
};

export default LineChart;