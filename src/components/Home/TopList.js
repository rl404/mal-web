import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Image } from 'react-bootstrap';
import { slugify }from '../../utils/utils';

export default class TopList extends React.Component {
  render() {
    var data = this.props.data
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
        <Table responsive size="sm">
          <thead>
            <tr>
              <th colSpan={3}>{this.props.title}</th>
              <th className="text-right"><Link to="">More</Link></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((anime, index) => {
                return (
                  <tr key={anime.id}>
                    <td className="table-no text-center">{index + 1}</td>
                    <td>
                      <Link to={{ pathname: `/anime/${anime.id}/` + slugify(anime.title) }}>
                        <Image src={anime.image} alt={anime.title} />
                      </Link>
                    </td>
                    <td className="table-content">
                      <Link className="title" to={{ pathname: `/anime/${anime.id}/` + slugify(anime.title) }}>{anime.title}</Link>
                      <p className="sub-title">
                        {anime.type}, {anime.episode} eps, scored {anime.score}
                        <br />
                        {anime.member.toLocaleString()} members
                      </p>
                    </td>
                    <td className="add text-right"><Link to="">add</Link></td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}