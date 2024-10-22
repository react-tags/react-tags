import React from 'react';

const ClearAllTags = (props: {
  classNames: {
    clearAll: string,
  },
  'aria-label'?: string,
  onClick: () => void,
}) => {
  return (
    <button aria-label={props['aria-label']} className={props.classNames.clearAll} onClick={props.onClick}>
      Clear all
    </button>
  );
};

export default ClearAllTags;
