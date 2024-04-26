"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYS = exports.INPUT_FIELD_POSITIONS = exports.ERRORS = exports.DEFAULT_PLACEHOLDER = exports.DEFAULT_LABEL_FIELD = exports.DEFAULT_IS_PROTECTED_FIELD = exports.DEFAULT_HAS_NOTES_FIELD = exports.DEFAULT_CLASSNAMES = void 0;
var KEYS = exports.KEYS = {
  ENTER: [10, 13],
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27,
  SPACE: 32,
  COMMA: 188
};
var DEFAULT_PLACEHOLDER = exports.DEFAULT_PLACEHOLDER = 'Press enter to add new tag';
var DEFAULT_LABEL_FIELD = exports.DEFAULT_LABEL_FIELD = 'text';
var DEFAULT_HAS_NOTES_FIELD = exports.DEFAULT_HAS_NOTES_FIELD = 'hasNotes';
var DEFAULT_IS_PROTECTED_FIELD = exports.DEFAULT_IS_PROTECTED_FIELD = 'isProteced';
var DEFAULT_CLASSNAMES = exports.DEFAULT_CLASSNAMES = {
  tags: 'ReactTags__tags',
  tagInput: 'ReactTags__tagInput',
  tagInputField: 'ReactTags__tagInputField',
  selected: 'ReactTags__selected',
  tag: 'ReactTags__tag',
  remove: 'ReactTags__remove',
  notes: 'ReactTags__notes',
  suggestions: 'ReactTags__suggestions',
  activeSuggestion: 'ReactTags__activeSuggestion',
  editTagInput: 'ReactTags__editTagInput',
  editTagInputField: 'ReactTags__editTagInputField',
  clearAll: 'ReactTags__clearAll'
};
var INPUT_FIELD_POSITIONS = exports.INPUT_FIELD_POSITIONS = {
  INLINE: 'inline',
  TOP: 'top',
  BOTTOM: 'bottom'
};
var ERRORS = exports.ERRORS = {
  TAG_LIMIT: 'Tag limit reached!'
};