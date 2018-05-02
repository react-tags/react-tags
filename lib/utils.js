import { escapeRegExp } from 'lodash';

/**
 * Convert an array of delimiter characters into a regular expression
 * that can be used to split content by those delimiters.
 * @param {Array<char>} delimiters Array of characters to turn into a regex
 * @returns {RegExp} Regular expression
 */
export function buildRegExpFromDelimiters(delimiters) {
  const delimiterChars = delimiters.map((delimiter) => {
    // See: http://stackoverflow.com/a/34711175/1463681
    const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
    return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
  }).join('');
  const escapedDelimiterChars = escapeRegExp(delimiterChars);
  return new RegExp(`[${escapedDelimiterChars}]+`);
}
