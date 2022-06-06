import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_PLACEHOLDER, INPUT_POSITION } from 'const';
import { ReactTagsProps, Tag } from 'types';

export const ReactTags = ({
  autofocus,
  handleInputChange,
  inputPosition = INPUT_POSITION.LEFT,
  inputProps,
  placeholder = DEFAULT_PLACEHOLDER,
  readOnly,
}: ReactTagsProps) => {
  const [tags] = useState<Tag[]>([
    { value: 'poland', label: 'Poland' },
    { value: 'germany', label: 'Germany' },
  ]);

  const tagInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tagInputRef.current && autofocus) {
      tagInputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tagItems = tags.map((tag) => <span key={tag.value}>{tag.label}</span>);

  const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleInputChange) {
      /**
       * ? Should i pass value or event object? Or Both?
       */
      handleInputChange(e.currentTarget.value);
    }
  };

  const tagInput = !readOnly && (
    <input
      ref={tagInputRef}
      placeholder={placeholder}
      aria-label={placeholder}
      {...inputProps}
      onChange={_handleInputChange}
      data-testid="tag-input"
    />
  );

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
