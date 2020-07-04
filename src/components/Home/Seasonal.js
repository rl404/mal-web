import React from 'react';
import { Link } from 'react-router';
import { isCurrentSeason, getCurrentSeason } from '../../utils/date.js';
import { capitalize } from '../../utils/string.js';

const SeasonalList = props => {
  const data = props.data;

  if (!data) {
    return (
      <div>Loading...</div>
    );
  }

  if (data.length === 0) {
    return (
      <div>Empty Season</div>
    );
  }

  return (
    <div id="home-seasonal">
      <div className="row border-bottom">
        <div className="col" id="home-seasonal-title">
          {capitalize(getCurrentSeason())} {new Date().getFullYear()} Anime
        </div>
        <div className="col text-right">
          <Link to=''>
            View More
          </Link>
        </div>
      </div>
      <div className="row">
          {
            data.map(anime => {
              if (isCurrentSeason(anime.startDate) && anime.type === 'TV') {
                return (
                  <SeasonalAnime anime={anime} key={anime.id} />
                )
              }
              return []
            })
          }
      </div>
    </div >
  );
}

export default SeasonalList;

const SeasonalAnime = props => {
  const anime = props.anime;
  return (
      <img src={anime.image} alt={anime.title} />
  );
}