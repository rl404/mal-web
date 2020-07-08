import React from 'react';

export default class TopAiring extends React.Component {
  render() {
    var data = this.props.data
    // console.log(data)
    if (!data) {
      return (
        <div>Loading...</div>
      );
    }

    if (data.length === 0) {
      return (
        <div>Empty Data</div>
      );
    }

    return (
      <div id="home-top-airing">
        {
          data.map(anime => {
            return (
              <div>{anime.title}</div>
            );
          })
        }
      </div>
    )
  }
}