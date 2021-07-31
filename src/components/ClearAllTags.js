import React from 'react';
import PropTypes from 'prop-types';

const ClearAllTags = (props) => {
  return (
    <button className={props.classNames.clearAll} onClick={props.onClick}>
      Clear all
    </button>
  );
};

ClearAllTags.propTypes = {
  classNames: PropTypes.object,
  onClick: PropTypes.func,
};

export default ClearAllTags;
