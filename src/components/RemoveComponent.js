import React from 'react';
import PropTypes from 'prop-types';

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props) => {
  const { readOnly, removeComponent, onClick, className, tag } = props;
  if (readOnly) {
    return <span />;
  }

  if (removeComponent) {
    const Component = removeComponent;
    return <Component {...props} />;
  }

  return (
    <button onClick={onClick} className={className} aria-label={`remove ${tag.text}`}>
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
};

export default RemoveComponent;
