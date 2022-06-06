import { INPUT_POSITION } from 'const';

export interface Tag {
  label: string;
  value: string;
}

export interface ReactTagsProps {
  autofocus?: boolean;
  inputPosition?: INPUT_POSITION;
  placeholder?: string;
  readOnly?: boolean;
}
