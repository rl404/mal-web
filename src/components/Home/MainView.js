import SeasonalList from './Seasonal';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  data: state.animeSeasonal
});

const MainView = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 border-right">
          <SeasonalList 
            data={props.data} 
          />
        </div>
        <div className="col-md-3">
          asd
      </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, () => ({}))(MainView);