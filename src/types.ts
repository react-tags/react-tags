import { INPUT_POSITION, KEYS } from 'const';
import React, { InputHTMLAttributes } from 'react';

export interface Tag {
  label: string;
  value: string;
}

export interface ReactTagsProps {
  allowClear?: boolean;
  autofocus?: boolean;
  clearText?: string;
  defaultTags?: Tag[];
  delimiters?: (string | KEYS)[];
  onClearAll?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInputBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onTagAdd?: (tag: Tag) => void;
  inputPosition?: INPUT_POSITION;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
}

export interface StateProps {
  query: string;
}
