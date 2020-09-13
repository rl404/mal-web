import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from './Header';
import SearchContent from './Content';

const Search = (props) => {
  const ref = React.useRef(null);
  const updateQuery = (type, query, advQuery) => {
    ref.current.updateQuery(type, query, advQuery);
  };

  return (
    <>
      <SearchHeader updateQuery={updateQuery} type={props.match.params.type} />
      <SearchContent ref={ref} onClick={props.showEntryDrawer} type={props.match.params.type} />
    </>
  )
};

Search.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Search;