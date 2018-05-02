import { expect } from 'chai';
import { buildRegExpFromDelimiters } from '../lib/utils';

const KeyCodes = {
  colon: 58,
  forwardSlash: 47,
  period: 46,
};

/**
 * Tests that the generated regex works as expected
 * @param {string} input Input string to be split
 * @param {array<char>} delimiters Array of characters to build a regex for
 * @param {array<string>} expected resulting split of the input
 */
function testRegex(input, delimiters, expected) {
  const regex = buildRegExpFromDelimiters(delimiters);
  const result = input.split(regex);
  expect(result).to.deep.equal(expected);
}

describe('Test buildRegExpFromDelimiters', () => {
  test('handles / delimiter', () => {
    const input = 'https:/www.lodash.com';
    const delimiters = [KeyCodes.forwardSlash];
    const expected = ['https:', 'www.lodash.com'];
    testRegex(input, delimiters, expected);
  });

  test('handles multiple consecutive delimiters', () => {
    const input = 'https:///www.lodash.com';
    const delimiters = [KeyCodes.forwardSlash];
    const expected = ['https:', 'www.lodash.com'];
    testRegex(input, delimiters, expected);
  });

  test('handles multiple delimiters', () => {
    const input = 'https://www.lodash.com';
    const delimiters = [KeyCodes.colon, KeyCodes.forwardSlash, KeyCodes.period];
    const expected = ['https', 'www', 'lodash', 'com'];
    testRegex(input, delimiters, expected);
  });
});
