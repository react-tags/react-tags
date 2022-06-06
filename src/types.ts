import { INPUT_POSITION } from 'const';
import { InputHTMLAttributes } from 'react';

export interface Tag {
  label: string;
  value: string;
}

export interface ReactTagsProps {
  autofocus?: boolean;
  handleInputChange?: (value: string) => void;
  inputPosition?: INPUT_POSITION;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
}

export interface StateProps {
  query: string;
}
