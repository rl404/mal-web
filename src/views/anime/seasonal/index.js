import React from 'react';
import PropTypes from 'prop-types';
import SeasonalHeader from './Header';
import SeasonalContent from './Content';

const AnimeSeasonal = (props) => {
  const ref = React.useRef(null);
  const updateSeasonYear = (season, year) => {
    ref.current.updateSeasonYear(season, year);
  };

  const setHentai = (h) => {
    ref.current.setHentai(h);
  };

  return (
    <>
      <SeasonalHeader updateSeasonYear={updateSeasonYear} setHentai={setHentai} />
      <SeasonalContent ref={ref} onClick={props.showEntryDrawer} />
    </>
  );
};

AnimeSeasonal.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default AnimeSeasonal;