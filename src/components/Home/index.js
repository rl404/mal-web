import React from 'react';

import MainView from './MainView';
import MiniHeader from '../Header/MiniHeader';

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <MiniHeader title="Welcome to MyAnimeList.net!" />        
        <MainView />
      </div>
    );
  }
}

export default Home;