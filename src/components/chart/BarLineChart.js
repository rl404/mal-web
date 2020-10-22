import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  LineSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  HoverState,
  EventTracker,
  ValueScale
} from '@devexpress/dx-react-chart';

const BarLineChart = (props) => {
  const theme = useTheme();

  var barColor = props.barColor;
  if (!barColor) {
    barColor = theme.palette.primary.chart;
  }

  var lineColor = props.lineColor;
  if (!lineColor) {
    lineColor = theme.palette.secondary.chart;
  }

  const [target, changeHover] = React.useState(null);
  const tooltipContent = ({ targetItem, text, ...restProps }) => {
    console.log(targetItem, text, restProps)
    return (
      <div>
        <Tooltip.Content
          {...restProps}
          text={parseInt(props.data[targetItem.point].barValue).toLocaleString()}
        />
      </div>
    );
  };

  return (
    <Chart data={props.data} height={props.height}>
      <ValueScale name='bar' />
      <ValueScale name='line' />

      <ArgumentAxis />
      <ValueAxis scaleName='bar' />

      <Animation />
      <EventTracker />
      <BarSeries
        valueField='barValue'
        argumentField='key'
        color={barColor}
        scaleName='bar'
      />
      <LineSeries
        valueField='lineValue'
        argumentField='key'
        color={lineColor}
        scaleName='line'
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

BarLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      barValue: PropTypes.number.isRequired,
      lineValue: PropTypes.number.isRequired,
    }),
  ),
  height: PropTypes.number,
  barColor: PropTypes.string,
  lineColor: PropTypes.string,
};

BarLineChart.defaultProps = {
  height: 200,
};

export default BarLineChart;