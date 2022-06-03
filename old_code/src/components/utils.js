import escapeRegExp from 'lodash/escapeRegExp';

/**
 * Convert an array of delimiter characters into a regular expression
 * that can be used to split content by those delimiters.
 * @param {Array<char>} delimiters Array of characters to turn into a regex
 * @returns {RegExp} Regular expression
 */
export function buildRegExpFromDelimiters(delimiters) {
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

/**
 * Returns true when the tag is drag enabled
 * @param {object} params props of the tag element
 * @returns {boolean} true/false
 * The three different properties which controls this function are moveTag, readOnly and allowDragDrop.
 */
export function canDrag(params) {
  const { moveTag, readOnly, allowDragDrop } = params;
  return moveTag !== undefined && !readOnly && allowDragDrop;
}

/**
 * Returns true when the tag is drop enabled
 * @param {object} params props of the tag element
 * @returns {boolean} true/false
 * The two different properties which controls this function are readOnly and allowDragDrop.
 */
export function canDrop(params) {
  const { readOnly, allowDragDrop } = params;
  return !readOnly && allowDragDrop;
}
