import { expect } from 'chai';
import {
  KEYS,
  SEPARATORS,
  DEFAULT_PLACEHOLDER,
  DEFAULT_LABEL_FIELD,
  DEFAULT_CLASSNAMES,
  INPUT_FIELD_POSITIONS,
  ERRORS,
} from '../src/components/constants';

describe('Constants', () => {
  describe('KEYS', () => {
    it('should have correct ENTER key codes', () => {
      expect(KEYS.ENTER).to.deep.equal([10, 13]);
    });

    it('should have correct TAB key code', () => {
      expect(KEYS.TAB).to.equal(9);
    });

    it('should have correct BACKSPACE key code', () => {
      expect(KEYS.BACKSPACE).to.equal(8);
    });

    it('should have correct UP_ARROW key code', () => {
      expect(KEYS.UP_ARROW).to.equal(38);
    });

    it('should have correct DOWN_ARROW key code', () => {
      expect(KEYS.DOWN_ARROW).to.equal(40);
    });

    it('should have correct ESCAPE key code', () => {
      expect(KEYS.ESCAPE).to.equal(27);
    });

    it('should have correct SPACE key code', () => {
      expect(KEYS.SPACE).to.equal(32);
    });

    it('should have correct COMMA key code', () => {
      expect(KEYS.COMMA).to.equal(188);
    });
  });

  describe('SEPARATORS', () => {
    it('should have correct ENTER separator', () => {
      expect(SEPARATORS.ENTER).to.equal('Enter');
    });

    it('should have correct TAB separator', () => {
      expect(SEPARATORS.TAB).to.equal('Tab');
    });

    it('should have correct COMMA separator', () => {
      expect(SEPARATORS.COMMA).to.equal(',');
    });

    it('should have correct SPACE separator', () => {
      expect(SEPARATORS.SPACE).to.equal(' ');
    });

    it('should have correct SEMICOLON separator', () => {
      expect(SEPARATORS.SEMICOLON).to.equal(';');
    });
  });

  describe('DEFAULT_PLACEHOLDER', () => {
    it('should have the correct default placeholder text', () => {
      expect(DEFAULT_PLACEHOLDER).to.equal('Press enter to add new tag');
    });
  });

  describe('DEFAULT_LABEL_FIELD', () => {
    it('should have the correct default label field', () => {
      expect(DEFAULT_LABEL_FIELD).to.equal('text');
    });
  });

  describe('DEFAULT_CLASSNAMES', () => {
    it('should have the correct tags class', () => {
      expect(DEFAULT_CLASSNAMES.tags).to.equal('ReactTags__tags');
    });

    it('should have the correct tagInput class', () => {
      expect(DEFAULT_CLASSNAMES.tagInput).to.equal('ReactTags__tagInput');
    });

    it('should have the correct tagInputField class', () => {
      expect(DEFAULT_CLASSNAMES.tagInputField).to.equal('ReactTags__tagInputField');
    });

    it('should have the correct selected class', () => {
      expect(DEFAULT_CLASSNAMES.selected).to.equal('ReactTags__selected');
    });

    it('should have the correct tag class', () => {
      expect(DEFAULT_CLASSNAMES.tag).to.equal('ReactTags__tag');
    });

    it('should have the correct remove class', () => {
      expect(DEFAULT_CLASSNAMES.remove).to.equal('ReactTags__remove');
    });

    it('should have the correct suggestions class', () => {
      expect(DEFAULT_CLASSNAMES.suggestions).to.equal('ReactTags__suggestions');
    });

    it('should have the correct activeSuggestion class', () => {
      expect(DEFAULT_CLASSNAMES.activeSuggestion).to.equal('ReactTags__activeSuggestion');
    });

    it('should have the correct editTagInput class', () => {
      expect(DEFAULT_CLASSNAMES.editTagInput).to.equal('ReactTags__editTagInput');
    });

    it('should have the correct editTagInputField class', () => {
      expect(DEFAULT_CLASSNAMES.editTagInputField).to.equal('ReactTags__editTagInputField');
    });

    it('should have the correct clearAll class', () => {
      expect(DEFAULT_CLASSNAMES.clearAll).to.equal('ReactTags__clearAll');
    });
  });

  describe('INPUT_FIELD_POSITIONS', () => {
    it('should have correct INLINE position', () => {
      expect(INPUT_FIELD_POSITIONS.INLINE).to.equal('inline');
    });

    it('should have correct TOP position', () => {
      expect(INPUT_FIELD_POSITIONS.TOP).to.equal('top');
    });

    it('should have correct BOTTOM position', () => {
      expect(INPUT_FIELD_POSITIONS.BOTTOM).to.equal('bottom');
    });
  });

  describe('ERRORS', () => {
    it('should have correct TAG_LIMIT error message', () => {
      expect(ERRORS.TAG_LIMIT).to.equal('Tag limit reached!');
    });
  });
});
