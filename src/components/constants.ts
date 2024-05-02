export const KEYS = {
  ENTER: [10, 13],
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27,
  SPACE: 32,
  COMMA: 188,
};

export const SEPARATORS = {
  ENTER: 'Enter',
  TAB: 'Tab',
  COMMA: ',',
  SPACE: ' ',
  SEMICOLON: ';',
};

export function getKeyCodeFromSeparator(separator: string) {
  switch (separator) {
    case SEPARATORS.ENTER:
      return 13;
    case SEPARATORS.TAB:
      return 9;
    case SEPARATORS.COMMA:
      return 188;
    case SEPARATORS.SPACE:
      return 32;
    case SEPARATORS.SEMICOLON:
      return 186;
    // Ideally this should never happen but just in case
    // return 0 (Unidentified key)
    default:
      return 0;
  }
}

export const DEFAULT_PLACEHOLDER = 'Press enter to add new tag';

export const DEFAULT_LABEL_FIELD = 'text';

export const DEFAULT_CLASSNAMES = {
  tags: 'ReactTags__tags',
  tagInput: 'ReactTags__tagInput',
  tagInputField: 'ReactTags__tagInputField',
  selected: 'ReactTags__selected',
  tag: 'ReactTags__tag',
  remove: 'ReactTags__remove',
  suggestions: 'ReactTags__suggestions',
  activeSuggestion: 'ReactTags__activeSuggestion',
  editTagInput: 'ReactTags__editTagInput',
  editTagInputField: 'ReactTags__editTagInputField',
  clearAll: 'ReactTags__clearAll',
};

export const INPUT_FIELD_POSITIONS = {
  INLINE: 'inline',
  TOP: 'top',
  BOTTOM: 'bottom',
};

export const ERRORS = {
  TAG_LIMIT: 'Tag limit reached!',
};
