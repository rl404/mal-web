import React from 'react';

export default class Detail extends React.Component {
  render() {
    var data = this.props.data
    if (!data) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        {data.title}
      </div>
    )
  }
}