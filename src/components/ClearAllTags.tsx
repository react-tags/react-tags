import React from 'react';

const ClearAllTags = (props: {
  classNames: {
    clearAll: string,
  },
  ariaLabel?: string,
  onClick: () => void,
}) => {
  return (
    <button aria-label={props.ariaLabel} className={props.classNames.clearAll} onClick={props.onClick}>
      Clear all
    </button>
  );
};

export default ClearAllTags;
