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
            .map((b, i) => <Link to={b["link"]} key={i}>{b["name"]}</Link>)
            .reduce((prev, curr, i) => [prev, <span className="separator" key={i + ">"}>></span>, curr])
        }
      </div>
    )
  }
}