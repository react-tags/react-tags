import React from 'react';

const ClearAllTags = (props: {
  classNames: {
    clearAll: string,
  },
  accessibilityLabel: string,
  onClick: () => void,
}) => {
  return (
    <button aria-label={props.accessibilityLabel} className={props.classNames.clearAll} onClick={props.onClick}>
      Clear all
    </button>
  );
};

export default ClearAllTags;
