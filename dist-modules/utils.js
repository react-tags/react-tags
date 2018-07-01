'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRegExpFromDelimiters = buildRegExpFromDelimiters;

var _escapeRegExp = require('lodash/escapeRegExp');

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert an array of delimiter characters into a regular expression
 * that can be used to split content by those delimiters.
 * @param {Array<char>} delimiters Array of characters to turn into a regex
 * @returns {RegExp} Regular expression
 */
function buildRegExpFromDelimiters(delimiters) {
  var delimiterChars = delimiters.map(function (delimiter) {
    // See: http://stackoverflow.com/a/34711175/1463681
    var chrCode = delimiter - 48 * Math.floor(delimiter / 48);
    return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
  }).join('');
  var escapedDelimiterChars = (0, _escapeRegExp2.default)(delimiterChars);
  return new RegExp('[' + escapedDelimiterChars + ']+');
}