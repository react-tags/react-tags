import { INPUT_POSITION } from 'const';

export interface Tag {
  value: string;
  label: string;
}

export interface ReactTagsProps {
  placeholder?: string;
  inputPosition?: INPUT_POSITION;
}
