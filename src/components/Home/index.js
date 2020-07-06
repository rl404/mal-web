import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { getCurrentSeason } from '../../utils/utils.js';

import MainView from './MainView';
import MiniHeader from '../Header/MiniHeader';

const mapStateToProps = state => ({
  appName: state.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', payload }),
})

class Home extends React.Component {
  componentWillMount() {
    var year = new Date().getFullYear();
    var season = getCurrentSeason()
    this.props.onLoad(agent.Seasonal.current(year, season))
  }

  render() {
    return (
      <div className="home-page">
        <MiniHeader title="Welcome to MyAnimeList.net!" />
        <MainView />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);