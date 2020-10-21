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

  var barColor = props.color;
  if (!barColor) {
    barColor = theme.palette.primary.chart;
  }

  const [target, changeHover] = React.useState(null);
  const tooltipContent = ({ targetItem, text, ...restProps }) => {
    return (
      <div>
        <Tooltip.Content
          {...restProps}
          text={parseInt(props.data[targetItem.point].barValue).toLocaleString()}
        />
      </div>
    );
  };

  const maxBar = () => {
    var max = 0;
    props.data.forEach(d => {
      if (d.count > max) {
        max = d.count
      }
    })
    console.log(max)
    return max
  }

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
        color={barColor}
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
  data: PropTypes.shape({
    bar: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })),
    line: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })),
  }),
  height: PropTypes.number,
  color: PropTypes.string,
};

BarLineChart.defaultProps = {
  height: 200,
};

export default BarLineChart;