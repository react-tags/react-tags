import React, { useEffect, useRef, useState } from 'react';
import {
  KEYS,
  DEFAULT_CLEAR_TEXT,
  DEFAULT_PLACEHOLDER,
  INPUT_POSITION,
} from 'const';
import { ReactTagsProps, Tag } from 'types';

export const ReactTags = ({
  allowClear,
  autofocus,
  clearText = DEFAULT_CLEAR_TEXT,
  defaultTags = [],
  delimiters = [KEYS.ENTER],
  onClearAll,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onTagAdd,
  inputPosition = INPUT_POSITION.LEFT,
  inputProps,
  placeholder = DEFAULT_PLACEHOLDER,
  readOnly,
}: ReactTagsProps) => {
  const [tags, setTags] = useState<Tag[]>(defaultTags);

  const tagInputRef = useRef<HTMLInputElement>(null);

  const _resetInput = () => {
    if (tagInputRef.current) {
      tagInputRef.current.value = '';
    }
  };

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

  const _handleClearAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClearAll) {
      onClearAll(e);
    }

    setTags([]);
  };

  const _addTag = (tag: Tag) => {
    setTags((prevState) => [...prevState, tag]);

    if (onTagAdd) {
      onTagAdd(tag);
    }

    _resetInput();
  };

  const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (delimiters.includes(e.code) && !e.shiftKey && value.length) {
      const tag = { value, label: value };
      _addTag(tag);
    }
  };

  const tagInput = !readOnly && (
    <>
      <input
        ref={tagInputRef}
        placeholder={placeholder}
        aria-label={placeholder}
        {...inputProps}
        onChange={_handleInputChange}
        onFocus={_handleInputFocus}
        onBlur={_handleInputBlur}
        onKeyDown={_handleKeyDown}
        data-testid="tag-input"
      />
      {allowClear && (
        <button type="button" onClick={_handleClearAll} data-testid="clear-all">
          {clearText}
        </button>
      )}
    </>
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
