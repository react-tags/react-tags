import React, { useState } from 'react';
import { DEFAULT_PLACEHOLDER, INPUT_POSITION } from 'const';
import { ReactTagsProps, Tag } from 'types';

export const ReactTags = ({
  placeholder = DEFAULT_PLACEHOLDER,
  inputPosition = INPUT_POSITION.LEFT,
}: ReactTagsProps) => {
  const [tags] = useState<Tag[]>([
    { value: 'poland', label: 'Poland' },
    { value: 'germany', label: 'Germany' },
  ]);

  const tagItems = tags.map((tag) => <span key={tag.value}>{tag.label}</span>);

  const tagInput = <input placeholder={placeholder} aria-label={placeholder} />;

  return (
    <div>
      {inputPosition === INPUT_POSITION.TOP && tagInput}
      <div>
        {inputPosition === INPUT_POSITION.LEFT && tagInput}
        {tagItems}
        {inputPosition === INPUT_POSITION.RIGHT && tagInput}
      </div>
      {inputPosition === INPUT_POSITION.BOTTOM && tagInput}
    </div>
  );
};
