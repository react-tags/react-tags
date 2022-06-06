import { INPUT_POSITION } from 'const';
import React, { InputHTMLAttributes } from 'react';

export interface Tag {
  label: string;
  value: string;
}

export interface ReactTagsProps {
  autofocus?: boolean;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInputBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputPosition?: INPUT_POSITION;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
}

export interface StateProps {
  query: string;
}
