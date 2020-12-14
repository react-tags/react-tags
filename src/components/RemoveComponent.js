import React from 'react';
import PropTypes from 'prop-types';

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props) => {
  const { readOnly, removeComponent, onClick, className, tag, index } = props;
  if (readOnly) {
    return <span />;
  }

  if (removeComponent) {
    const Component = removeComponent;
    return <Component {...props} />;
  }

  return (
    <button onClick={onClick} className={className} aria-label={`Tag at index ${index} with value ${tag.id} focussed. Press enter to remove`}>
      {crossStr}
    </button>
  );
};

RemoveComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  removeComponent: PropTypes.func,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

export default RemoveComponent;
