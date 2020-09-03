import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { ellipsis } from '../../utils';

const EllipsisText = (props) => {
  const [state, setState] = React.useState(false);
  const toggleText = () => {
    setState(!state);
  };

  return (
    <>
      {state ? props.text : ellipsis(props.text, props.limit)}
      {props.text.length <= props.limit ? null :
        <>
          <br />
          {state ?
            <Button color='primary' size='small' onClick={toggleText}>Show less</Button> :
            <Button color='primary' size='small' onClick={toggleText}>Show more</Button>
          }
        </>
      }
    </>
  );
};

EllipsisText.propTypes = {
  limit: PropTypes.number,
};

EllipsisText.defaultProps = {
  limit: 200,
};

export default EllipsisText;