import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from './Header';
import SearchContent from './Content';

const Search = (props) => {
  const ref = React.useRef(null);
  const updateQuery = (type, query, advQuery) => {
    ref.current.updateQuery(type, query, advQuery);
  };

  const producer = new URLSearchParams(props.location.search).get('producer');

  return (
    <>
      <SearchHeader updateQuery={updateQuery} type={props.match.params.type} producer={!producer ? 0 : parseInt(producer)} />
      <SearchContent ref={ref} onClick={props.showEntryDrawer} type={props.match.params.type} producer={!producer ? 0 : parseInt(producer)} />
    </>
  )
};

Search.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Search;