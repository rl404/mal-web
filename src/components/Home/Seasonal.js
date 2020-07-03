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
      <div className="row mx-auto my-auto">
        <div id="recipeCarousel" className="carousel slide w-100" data-ride="carousel">
          <div className="carousel-inner w-100" role="listbox">
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
          <a className="carousel-control-prev w-auto" href="#recipeCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next w-auto" href="#recipeCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div >
  );
}

export default SeasonalList;

const SeasonalAnime = props => {
  const anime = props.anime;
  return (
    <div className="carousel-item">
      <div className="col-md-4">
        <div className="card card-body">
          <img className="img-fluid" src={anime.image} alt={anime.title} />
        </div>
      </div>
    </div>
  );
}