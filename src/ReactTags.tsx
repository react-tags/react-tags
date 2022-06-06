import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_PLACEHOLDER, INPUT_POSITION } from 'const';
import { ReactTagsProps, Tag } from 'types';

export const ReactTags = ({
  autofocus,
  onInputChange,
  onInputFocus,
  onInputBlur,
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
    if (onInputChange) {
      onInputChange(e);
    }
  };

  const _handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onInputFocus) {
      onInputFocus(e);
    }
  };

  const _handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onInputBlur) {
      onInputBlur(e);
    }
  };

  const tagInput = !readOnly && (
    <input
      ref={tagInputRef}
      placeholder={placeholder}
      aria-label={placeholder}
      {...inputProps}
      onChange={_handleInputChange}
      onFocus={_handleInputFocus}
      onBlur={_handleInputBlur}
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
