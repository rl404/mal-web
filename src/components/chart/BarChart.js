import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
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
  const theme = useTheme();

  var barColor = props.color;
  if (!barColor) {
    barColor = theme.palette.primary.main;
  }

  const [target, changeHover] = React.useState(null);
  const tooltipContent = (tooltipProps) => {
    const { targetItem, text, ...restProps } = tooltipProps;
    return (
      <div>
        <Tooltip.Content
          {...restProps}
          text={parseInt(props.data[targetItem.point].value).toLocaleString()}
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
      <BarSeries
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
        contentComponent={tooltipContent}
      />
    </Chart>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  height: PropTypes.number,
  color: PropTypes.string,
};

BarChart.defaultProps = {
  height: 200,
};

export default BarChart;