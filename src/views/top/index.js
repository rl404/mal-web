import React from 'react';
import PropTypes from 'prop-types';
import TopHeader from './Header';
import TopContent from './Content';

const Top = (props) => {
  const ref = React.useRef(null);
  const updateQuery = (type, order) => {
    ref.current.updateQuery(type, order);
  };

  const order = new URLSearchParams(props.location.search).get('order');

  return (
    <>
      <TopHeader updateQuery={updateQuery} type={props.match.params.type} order={!order ? 0 : parseInt(order)} />
      <TopContent ref={ref} onClick={props.showEntryDrawer} type={props.match.params.type} />
    </>
  )
};

Top.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
};

export default Top;