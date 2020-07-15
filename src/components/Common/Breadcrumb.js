import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
  render() {
    var data = this.props.data
    if (!data || data.length === 0) {
      return
    }

    return (
      <div className="breadcrumb">
        {
          data
            .map(b => <Link to={b["link"]}>{b["name"]}</Link>)
            .reduce((prev, curr) => [prev, <span className="separator">></span>, curr])
        }
      </div>
    )
  }
}