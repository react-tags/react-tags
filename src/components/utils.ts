import { escapeRegExp } from 'lodash-es';
import { SEPARATORS } from './constants';

/**
 * Convert an array of delimiter characters into a regular expression
 * that can be used to split content by those delimiters.
 * @param {Array<char>} delimiters Array of characters to turn into a regex
 * @returns {RegExp} Regular expression
 */
export function buildRegExpFromDelimiters(delimiters: Array<number>): RegExp {
  const delimiterChars = delimiters
    .map((delimiter) => {
      // See: http://stackoverflow.com/a/34711175/1463681
      const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
      return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
    })
    .join('');
  const escapedDelimiterChars = escapeRegExp(delimiterChars);
  return new RegExp(`[${escapedDelimiterChars}]+`);
}

export function getKeyCodeFromSeparator(separator: string) {
  switch (separator) {
    case SEPARATORS.ENTER:
      // 13 is for enter key and 10 is for carriage return, this might be present when pasting from excel
      return [10, 13];
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

/**
 * Returns true when the tag is drag enabled
 * @param {object} params props of the tag element
 * @returns {boolean} true/false
 * The three different properties which controls this function are moveTag, readOnly and allowDragDrop.
 */
export function canDrag(params: {
  moveTag?: (dragIndex: number, hoverIndex: number) => void;
  readOnly: boolean;
  allowDragDrop: boolean;
}): boolean {
  const { moveTag, readOnly, allowDragDrop } = params;
  return moveTag !== undefined && !readOnly && allowDragDrop;
}

/**
 * Returns true when the tag is drop enabled
 * @param {object} params props of the tag element
 * @returns {boolean} true/false
 * The two different properties which controls this function are readOnly and allowDragDrop.
 */
export function canDrop(params: {
  readOnly: boolean;
  allowDragDrop: boolean;
}): boolean {
  const { readOnly, allowDragDrop } = params;
  return !readOnly && allowDragDrop;
}
