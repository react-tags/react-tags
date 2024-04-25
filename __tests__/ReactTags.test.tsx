import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy, stub, createSandbox } from 'sinon';

import {
  WithContext as ReactTags,
  WithOutContext as PureReactTags,
} from '../src/index';

import { INPUT_FIELD_POSITIONS, KEYS } from '../src/components/constants';
import { fireEvent, render } from '@testing-library/react';
import Suggestions from '../src/components/Suggestions';

/* eslint-disable no-console */

let defaults;
const sandbox = createSandbox();
let handleDragStub;

const Keys = {
  TAB: 9,
  SPACE: 32,
  COMMA: 188,
};

beforeAll(() => {
  handleDragStub = sandbox.stub();
  defaults = {
    tags: [{ className: '', id: 'Apple', text: 'Apple' }],
    suggestions: [
      { className: '', id: 'Banana', text: 'Banana' },
      { className: '', id: 'Apple', text: 'Apple' },
      { className: '', id: 'Apricot', text: 'Apricot' },
      { className: '', id: 'Pear', text: 'Pear' },
      { className: '', id: 'Peach', text: 'Peach' },
    ],
    handleDrag: handleDragStub,
  };
});

beforeEach(() => {
  sandbox.resetHistory();
});

afterAll(() => {
  sandbox.restore();
});
const DOWN_ARROW_KEY_CODE = 40;
const ENTER_ARROW_KEY_CODE = 13;

function mockItem(overrides?: any) {
  const props = Object.assign({}, defaults, overrides);
  return <ReactTags {...props} />;
}

describe('Test ReactTags', () => {
  it('should render with expected props', function () {
    const $el = shallow(mockItem());
    expect($el).to.have.length(1);
    jestExpect($el.props().children.props).toMatchSnapshot();
  });

  it('should update the class when the prop classNames changes', () => {
    let $el = mount(
      mockItem({
        classNames: {
          tag: 'tag',
        },
      })
    );
    expect($el.find('.tag').length).to.equal(1);
    $el.setProps({
      classNames: {
        tag: 'changed',
      },
    });
    expect($el.find('.changed').length).to.equal(1);
  });

  it('focus on input by default', () => {
    const $el = mount(mockItem(), { attachTo: document.body });
    expect(document.activeElement?.tagName).to.equal('INPUT');
    expect(document.activeElement?.className).to.equal(
      'ReactTags__tagInputField'
    );
    $el.unmount();
  });

  it('should not focus on input if autofocus is false', () => {
    const $el = mount(mockItem({ autofocus: false }), {
      attachTo: document.body,
    });
    expect(document.activeElement?.tagName).to.equal('BODY');
    $el.unmount();
  });

  it('should not focus on input if autoFocus is false', () => {
    const $el = mount(mockItem({ autoFocus: false }), {
      attachTo: document.body,
    });
    expect(document.activeElement?.tagName).to.equal('BODY');
    $el.unmount();
  });

  describe('When readOnly is true', () => {
    it('should not render input', () => {
      const wrapper = mount(mockItem({ readOnly: true }));

      expect(wrapper.exists('.ReactTags__tagInputField')).to.equal(false);
    });

    it('should render tags without remove button', () => {
      const wrapper = mount(
        mockItem({
          readOnly: true,
          tags: [
            { id: 'Mango', text: 'Mango' },
            { id: 'Lichi', text: 'Litchi' },
          ],
        })
      );
      expect(wrapper.find('.ReactTags__tag').length).to.equal(2);
      expect(wrapper.exists('.ReactTags__tag__remove')).to.equal(false);
    });

    it('should not edit tags', () => {
      const container = render(
        mockItem({
          readOnly: true,
          editable: true,
          tags: [
            { id: 'Mango', text: 'Mango' },
            { id: 'Lichi', text: 'Litchi' },
          ],
        })
      );
      fireEvent.click(container.queryByText('Litchi')!);
      expect(container.queryByTestId('tag-edit')).to.be.null;
    });

    it('should not be draggable', () => {
      const container = render(
        mockItem({
          readOnly: true,
          tags: [
            ...defaults.tags,
            { id: 'Litchi', text: 'Litchi' },
            { id: 'Mango', text: 'Mango' },
          ],
        })
      );

      const src = container.getByText('Apple');
      const dest = container.getByText('Mango');

      let styles = getComputedStyle(src);
      expect(styles.cursor).to.equal('auto');
      expect(styles.opacity).to.equal('1');

      fireEvent.dragStart(src);
      styles = getComputedStyle(src);
      // The cursor and opacity should not be updated when attempting to drag in readOnly mode
      expect(styles.cursor).to.equal('auto');
      expect(styles.opacity).to.equal('1');

      fireEvent.dragEnter(dest);
      fireEvent.dragLeave(dest);
      fireEvent.dragEnd(dest);

      expect(handleDragStub.called).to.be.false;
    });
  });

  it('shows the classnames of children properly', () => {
    const $el = mount(mockItem());
    expect($el.find('.ReactTags__tags').length).to.equal(1);
    expect($el.find('.ReactTags__selected').length).to.equal(1);
    expect($el.find('.ReactTags__tagInput').length).to.equal(1);
    expect($el.find('.ReactTags__tagInputField').length).to.equal(1);
  });

  it('renders preselected tags properly', () => {
    const $el = mount(mockItem());
    expect($el.text()).to.have.string('Apple');
  });

  it('invokes the onBlur event', () => {
    const handleInputBlur = spy();
    const $el = mount(mockItem());

    // Won't be invoked as there's no `handleInputBlur` event yet.
    $el.find('.ReactTags__tagInputField').simulate('blur');
    expect(handleInputBlur.callCount).to.equal(0);

    // Will be invoked despite the input being empty.
    $el.setProps({ handleInputBlur });
    $el.find('.ReactTags__tagInputField').simulate('blur');
    expect(handleInputBlur.callCount).to.equal(1);
    expect(handleInputBlur.calledWith('')).to.be.true;
    expect($el.find('.ReactTags__tagInputField').get(0).value).to.be.undefined;
  });

  it('invokes the onFocus event', () => {
    const handleInputFocus = spy();
    const $el = mount(mockItem({ inputValue: 'Example' }));

    $el.setProps({ handleInputFocus });
    $el.find('.ReactTags__tagInputField').simulate('focus', { isMock: true });
    expect(handleInputFocus.callCount).to.equal(1);
    expect(handleInputFocus.args[0].length).to.equal(2);
    expect(handleInputFocus.args[0][1].isMock).to.equal(true);
    expect(handleInputFocus.calledWith('Example')).to.be.true;
  });

  it('invokes the onBlur event when input has value', () => {
    const handleInputBlur = spy();
    const $el = mount(mockItem({ inputValue: 'Example' }));

    // Will also be invoked for when the input has a value.
    $el.setProps({ handleInputBlur });
    $el.find('.ReactTags__tagInputField').simulate('blur', { isMock: true });
    expect(handleInputBlur.callCount).to.equal(1);
    expect(handleInputBlur.args[0].length).to.equal(2);
    expect(handleInputBlur.args[0][1].isMock).to.equal(true);
    expect(handleInputBlur.calledWith('Example')).to.be.true;
    expect($el.find('.ReactTags__tagInputField').get(0).value).to.be.undefined;
  });

  describe('tests handlePaste', () => {
    it('should not add new tag when allowAdditionFromPaste is false', () => {
      const actual = [];
      const $el = mount(
        mockItem({
          allowAdditionFromPaste: false,
          handleAddition(tag) {
            actual.push(tag);
          },
        })
      );

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('paste', {
        clipboardData: {
          getData: () => 'Banana',
        },
      });

      expect(actual).to.have.length(0);
      expect(actual).to.not.have.members(['Banana']);
    });

    it('should split the clipboard on delimiters', () => {
      const Keys = {
        TAB: 9,
        SPACE: 32,
        COMMA: 188,
      };

      const tags = [];
      const $el = mount(
        mockItem({
          delimiters: [Keys.TAB, Keys.SPACE, Keys.COMMA],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('paste', {
        clipboardData: {
          getData: () =>
            'Banana,Apple,Apricot\nOrange Blueberry,Pear,Peach\tKiwi',
        },
      });

      const expected = [
        'Banana',
        'Apple',
        'Apricot\nOrange',
        'Blueberry',
        'Pear',
        'Peach',
        'Kiwi',
      ].map((value) => ({ id: value, text: value }));

      jestExpect(tags).toMatchInlineSnapshot(`
        [
          {
            "className": "",
            "id": "Banana",
            "text": "Banana",
          },
          {
            "className": "",
            "id": "Apple",
            "text": "Apple",
          },
          {
            "className": "",
            "id": "Apricot
        Orange",
            "text": "Apricot
        Orange",
          },
          {
            "className": "",
            "id": "Blueberry",
            "text": "Blueberry",
          },
          {
            "className": "",
            "id": "Pear",
            "text": "Pear",
          },
          {
            "className": "",
            "id": "Peach",
            "text": "Peach",
          },
          {
            "className": "",
            "id": "Kiwi",
            "text": "Kiwi",
          },
        ]
      `);
    });

    it('should split the clipboard when delimited with new lines', () => {
      const Keys = {
        ENTER: [10, 13],
      };

      const tags = [];
      const $el = mount(
        mockItem({
          delimiters: [...Keys.ENTER],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('paste', {
        clipboardData: {
          getData: () => 'Banana\nApple\rApricot\r\n\r\nOrange',
        },
      });

      const expected = ['Banana', 'Apple', 'Apricot', 'Orange'].map(
        (value) => ({ id: value, text: value })
      );

      jestExpect(tags).toMatchInlineSnapshot(`
        [
          {
            "className": "",
            "id": "Banana",
            "text": "Banana",
          },
          {
            "className": "",
            "id": "Apple",
            "text": "Apple",
          },
          {
            "className": "",
            "id": "Apricot",
            "text": "Apricot",
          },
          {
            "className": "",
            "id": "Orange",
            "text": "Orange",
          },
        ]
      `);
    });

    it('should not allow duplicate tags', () => {
      const tags = [...defaults.tags];
      const $el = mount(
        mockItem({
          delimiters: [Keys.TAB, Keys.SPACE, Keys.COMMA],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('paste', {
        clipboardData: {
          getData: () => 'Banana,Apple,Banana',
        },
      });

      // Note that 'Apple' and 'Banana' are only included once in the expected list
      const expected = ['Apple', 'Banana'].map((value) => ({
        className: '',
        id: value,
        text: value,
      }));

      expect(tags).to.deep.have.same.members(expected);
    });

    it('should allow pasting text only up to maxLength characters', () => {
      const tags = [];
      const maxLength = 5;
      const inputValue = 'Thimbleberry';

      const $el = mount(
        mockItem({
          handleAddition(tag) {
            tags.push(tag);
          },
          maxLength,
        })
      );

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('paste', {
        clipboardData: {
          getData: () => inputValue,
        },
      });

      const clipboardText = inputValue.substr(0, maxLength);

      jestExpect(tags).toMatchInlineSnapshot(`
        [
          {
            "className": "",
            "id": "Thimb",
            "text": "Thimb",
          },
        ]
      `);
    });

    it('should trim the tags', () => {
      const tags = [...defaults.tags];
      const $el = mount(
        mockItem({
          delimiters: [Keys.COMMA],
          handleAddition(tag) {
            tags.push(tag);
          },
        })
      );

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('paste', {
        clipboardData: {
          getData: () => ' Orange,Orange , Orange ',
        },
      });
      jestExpect(tags).toMatchInlineSnapshot(`
        [
          {
            "className": "",
            "id": "Apple",
            "text": "Apple",
          },
          {
            "className": "",
            "id": "Orange",
            "text": "Orange",
          },
        ]
      `);
    });
  });

  it('should not allow duplicate tags', () => {
    const actual = [];
    const $el = mount(
      mockItem({
        handleAddition(tag) {
          actual.push(tag);
        },
      })
    );
    expect($el.find(PureReactTags).props().tags).to.have.deep.members(
      defaults.tags
    );
    const $input = $el.find('.ReactTags__tagInputField');
    $input.simulate('change', { target: { value: 'Apple' } });

    $input.simulate('keyDown', { keyCode: KEYS.ENTER[1] });
    expect(actual).to.have.length(0);
  });

  it('should not add empty tag when down arrow is clicked followed by enter key', () => {
    const actual = [];
    const $el = mount(
      mockItem({
        handleAddition(tag) {
          actual.push(tag);
        },
        suggestions: [],
      })
    );

    expect($el.find(PureReactTags).props().tags).to.have.members(defaults.tags);

    const $input = $el.find('.ReactTags__tagInputField');
    $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
    $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
    expect(actual).to.have.length(0);
  });

  // this test will fail if console.error occurs
  it('should not set any property of this.textInput when readOnly', () => {
    console.error = jest.fn((error) => {
      throw error;
    });

    const $el = mount(mockItem({ readOnly: true }));
    const $tag = $el.find('.ReactTags__tag');
    $tag.simulate('click');
  });

  it('should fail the test if two tags have same key, issue #110', () => {
    console.warn = jest.fn(() => {
      throw 'Error';
    });

    let modifiedTags = [
      ...defaults.tags,
      { className: '', id: 'NewYork', text: 'NewYork' },
      { className: '', id: 'Austria', text: 'Austria' },
    ];
    const $el = mount(
      mockItem({
        tags: modifiedTags,
        handleDelete: (i) => {
          modifiedTags = modifiedTags.filter((tag, index) => index !== i);
        },
      })
    );
    //remove Apple
    $el.find('.ReactTags__remove').at(0).simulate('click');
    //remove NewYork
    $el.find('.ReactTags__remove').at(1).simulate('click');
    $el.setProps({ tags: modifiedTags });
    const $input = $el.find('.ReactTags__tagInputField');
    $input.simulate('change', { target: { value: 'Hello' } });
    $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
  });

  describe('render tags correctly when html passed in  text attribute, fix #267', () => {
    let modifiedTags = [];
    let handleAddition;
    let actual;
    beforeEach(() => {
      actual = [];
      modifiedTags = [
        ...defaults.tags,
        {
          className: '',
          id: '1',
          text: <span style={{ color: 'red' }}> NewYork</span>,
        },
        {
          className: '',
          id: '2',
          text: <span style={{ color: 'blue' }}> Austria</span>,
        },
      ];
      handleAddition = ({ id, text }) => {
        actual.push({
          id,
          text: <span style={{ color: 'yellow' }}>{text}</span>,
        });
      };
    });
    it('should render tags correctly', () => {
      const $el = mount(
        mockItem({
          tags: modifiedTags,
        })
      );
      expect($el.find(PureReactTags).props().tags).to.have.members(
        modifiedTags
      );
    });

    it('allow adding tag which is not in the list', () => {
      const $el = mount(
        mockItem({
          tags: modifiedTags,
          handleAddition,
        })
      );
      const $input = $el.find('.ReactTags__tagInputField');
      $input.simulate('change', { target: { value: 'Custom tag' } });

      $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.length(1);
      expect(React.isValidElement(actual[0].text)).to.be.true;
    });

    it('should not allow duplicate tags', () => {
      const actual = [];
      const $el = mount(
        mockItem({
          tags: modifiedTags,
          handleAddition,
        })
      );
      const $input = $el.find('.ReactTags__tagInputField');
      $input.simulate('change', { target: { value: 'Austria' } });

      $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.length(0);
    });
  });

  describe('autocomplete/suggestions filtering', () => {
    let consoleWarnStub;
    beforeAll(() => {
      consoleWarnStub = stub(console, 'warn');
    });
    afterAll(() => {
      consoleWarnStub.restore();
    });

    it('updates suggestions state if the suggestions prop changes', () => {
      const $el = mount(mockItem());

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('change', { target: { value: 'ap' } });
      $input.simulate('focus');

      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Apricot', text: 'Apricot' },
      ]);
      $el.setProps({
        suggestions: [
          { className: '', id: 'Papaya', text: 'Papaya' },
          { className: '', id: 'Paprika', text: 'Paprika' },
        ],
      });
      $el.update();
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Papaya', text: 'Papaya' },
        { className: '', id: 'Paprika', text: 'Paprika' },
      ]);
    });

    it('updates suggestions state as expected based on default filter logic', () => {
      const $el = mount(mockItem());

      // Apple is removed since its in default tags prop
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        {
          className: '',
          id: 'Banana',
          text: 'Banana',
        },
        {
          className: '',
          id: 'Apricot',
          text: 'Apricot',
        },
        {
          className: '',
          id: 'Pear',
          text: 'Pear',
        },
        {
          className: '',
          id: 'Peach',
          text: 'Peach',
        },
      ]);

      const $input = $el.find('.ReactTags__tagInputField');
      $input.simulate('change', { target: { value: 'or' } });
      expect($el.find(Suggestions).props().suggestions).to.have.members([]);

      $input.simulate('change', { target: { value: 'ea' } });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Pear', text: 'Pear' },
        { className: '', id: 'Peach', text: 'Peach' },
      ]);

      $input.simulate('change', { target: { value: 'ap' } });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Apricot', text: 'Apricot' },
      ]);
    });

    it('updates suggestions state as expected based on custom filter logic', () => {
      const $el = mount(
        mockItem({
          handleFilterSuggestions: (query, suggestions) => {
            return suggestions.filter((suggestion) => {
              return (
                suggestion.text.toLowerCase().indexOf(query.toLowerCase()) >= 0
              );
            });
          },
        })
      );
      const $input = $el.find('.ReactTags__tagInputField');
      // Apple is removed since its in default tags prop
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        {
          className: '',
          id: 'Banana',
          text: 'Banana',
        },
        {
          className: '',
          id: 'Apricot',
          text: 'Apricot',
        },
        {
          className: '',
          id: 'Pear',
          text: 'Pear',
        },
        {
          className: '',
          id: 'Peach',
          text: 'Peach',
        },
      ]);

      $input.simulate('change', { target: { value: 'Ea' } });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Pear', text: 'Pear' },
        { className: '', id: 'Peach', text: 'Peach' },
      ]);

      $input.simulate('change', { target: { value: 'ap' } });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Apricot', text: 'Apricot' },
      ]);
    });

    it('updates selectedIndex state as expected based on changing suggestions', () => {
      const $el = mount(
        mockItem({
          autocomplete: true,
          handleFilterSuggestions: (query, suggestions) => {
            return suggestions.filter((suggestion) => {
              return (
                suggestion.text.toLowerCase().indexOf(query.toLowerCase()) >= 0
              );
            });
          },
        })
      );
      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('change', { target: { value: 'Ea' } });
      $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
      $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Pear', text: 'Pear' },
        { className: '', id: 'Peach', text: 'Peach' },
      ]);
      expect($el.find(Suggestions).props().selectedIndex).to.equal(1);
      $input.simulate('change', { target: { value: 'Each' } });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Peach', text: 'Peach' },
      ]);
      expect($el.find(Suggestions).props().selectedIndex).to.equal(0);
    });

    it('selects the correct suggestion using the keyboard when minQueryLength is set to 0', () => {
      let actual = [];
      const $el = mount(
        mockItem({
          query: '',
          minQueryLength: 0,
          handleAddition(tag) {
            actual.push(tag);
          },
        })
      );
      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
      $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
      $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.deep.members([
        { className: '', id: 'Apricot', text: 'Apricot' },
      ]);

      $el.unmount();
    });

    it('handles addition when using default suggestions filter', () => {
      let actual = [];
      const $el = mount(
        mockItem({
          autocomplete: true,
          handleAddition(tag) {
            actual.push(tag);
          },
        })
      );
      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('change', { target: { value: 'Or' } });
      $input.simulate('focus');
      $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.deep.members([
        { className: '', id: 'Or', text: 'Or' },
      ]);
    });

    it('should add tag with custom label field and default suggestion filter', () => {
      const labelField = 'name';
      const mapper = (data) => ({ id: data.id, name: data.text });
      const tags = defaults.tags.map(mapper);
      const suggestions = defaults.suggestions.map(mapper);

      let actual = [];
      const $el = mount(
        mockItem({
          autocomplete: true,
          handleAddition(tag) {
            actual.push(tag);
          },
          labelField,
          tags,
          suggestions,
        })
      );
      const $input = $el.find('.ReactTags__tagInputField');
      $input.simulate('change', { target: { value: 'Or' } });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members(
        []
      );
      $input.simulate('focus');
      $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.deep.members([
        { className: '', id: 'Or', name: 'Or' },
      ]);
    });

    it('should select the correct suggestion using the keyboard when label is custom', () => {
      const labelField = 'name';
      const mapper = (data) => ({ id: data.id, name: data.text });
      let actual = [];
      const suggestions = defaults.suggestions.map(mapper);

      const $el = mount(
        mockItem({
          labelField,
          tags: actual,
          suggestions,
          handleAddition(tag) {
            actual.push(tag);
          },
        })
      );

      const $input = $el.find('.ReactTags__tagInputField');

      $input.simulate('change', { target: { value: 'Ap' } });
      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { id: 'Apple', name: 'Apple' },
        { id: 'Apricot', name: 'Apricot' },
      ]);
      $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
      $input.simulate('keyDown', { keyCode: DOWN_ARROW_KEY_CODE });
      $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.deep.members([
        { id: 'Apricot', [labelField]: 'Apricot' },
      ]);
      $el.unmount();
    });

    it('should show suggestions for the tags which are already added when "allowUnique" is false', () => {
      const actual = [];
      const $el = mount(
        mockItem({
          autocomplete: true,
          handleAddition(tag) {
            actual.push(tag);
          },
          allowUnique: false,
        })
      );

      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Banana', text: 'Banana' },
        { className: '', id: 'Apple', text: 'Apple' },
        { className: '', id: 'Apricot', text: 'Apricot' },
        { className: '', id: 'Pear', text: 'Pear' },
        { className: '', id: 'Peach', text: 'Peach' },
      ]);

      const $input = $el.find('.ReactTags__tagInputField');
      $input.simulate('change', { target: { value: 'App' } });

      expect($el.find(Suggestions).props().suggestions).to.have.deep.members([
        { className: '', id: 'Apple', text: 'Apple' },
      ]);
      $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.deep.members([
        { className: '', id: 'Apple', text: 'Apple' },
      ]);
    });
  });

  it('should render default tags with custom label field', () => {
    const labelField = 'name';
    const mapper = (data) => ({ id: data.id, name: data.text });
    const tags = defaults.tags.map(mapper);
    const suggestions = defaults.suggestions.map(mapper);

    const expectedText = tags[0][labelField];

    const props = {
      labelField,
      tags,
      suggestions,
    };

    const $el = mount(mockItem(props));
    expect($el.text().slice(0, -1)).to.equal(expectedText);
    $el.unmount();
  });

  it('should allow duplicate tags when allowUnique is false', () => {
    const actual = [];
    const $el = mount(
      mockItem({
        handleAddition(tag) {
          actual.push(tag);
        },
        allowUnique: false,
      })
    );

    expect($el.find(PureReactTags).props().tags).to.have.deep.members(
      defaults.tags
    );
    const $input = $el.find('.ReactTags__tagInputField');
    $input.simulate('change', { target: { value: 'Apple' } });
    $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
    expect(actual).to.have.deep.members([
      {
        className: '',
        id: 'Apple',
        text: 'Apple',
      },
    ]);
  });

  describe('Test inputFieldPosition', () => {
    it('should display input field and tags inline when "inputFieldPosition" is inline', () => {
      const $el = mount(
        mockItem({
          inputFieldPosition: INPUT_FIELD_POSITIONS.INLINE,
        })
      );

      const $tagContainer = $el.find('.ReactTags__selected');
      const childLength = $tagContainer.children().length;
      expect(
        $tagContainer.children().get(childLength - 1).props.className
      ).to.equal('ReactTags__tagInput');
    });

    it('should delete the last tag when query is empty, input position is inline and backspace is pressed', () => {
      const handleDeleteStub = sandbox.stub();
      const wrapper = mount(
        mockItem({
          tags: [
            {
              id: 'Apple',
              text: 'Apple',
            },
            {
              id: 'Orange',
              text: 'Orange',
            },
            {
              id: 'Banana',
              text: 'Banana',
            },
          ],
          handleDelete: handleDeleteStub,
          inputFieldPosition: INPUT_FIELD_POSITIONS.INLINE,
        })
      );
      expect(wrapper.find(PureReactTags).props().tags).to.have.length(3);
      const input = wrapper.find('.ReactTags__tagInputField');
      input.simulate('keyDown', { key: 'Backspace' });
      expect(handleDeleteStub.calledWith(2)).to.be.true;
    });

    it('should display input field above tags when "inputFieldPosition" is top', () => {
      const $el = mount(
        mockItem({
          inputFieldPosition: INPUT_FIELD_POSITIONS.TOP,
        })
      );

      const $tagContainer = $el.find('.ReactTags__tags');
      expect($tagContainer.children().get(1).props.className).to.equal(
        'ReactTags__tagInput'
      );
    });

    it('should display input field below tags when "inputFieldPosition" is bottom', () => {
      const $el = mount(
        mockItem({
          inputFieldPosition: INPUT_FIELD_POSITIONS.BOTTOM,
        })
      );

      const $tagContainer = $el.find('.ReactTags__tags');
      expect($tagContainer.children().get(2).props.className).to.equal(
        'ReactTags__tagInput'
      );
    });

    it('should show console warning when "inline" is false', () => {
      const consoleWarnStub = stub(console, 'warn');

      mount(
        mockItem({
          inline: false,
        })
      );

      expect(consoleWarnStub.calledOnce).to.be.true;
      expect(
        consoleWarnStub.calledWithExactly(
          '[Deprecation] The inline attribute is deprecated and will be removed in v7.x.x, please use inputFieldPosition instead.'
        )
      ).to.be.true;
      consoleWarnStub.restore();
    });
  });

  it('should pass input props to the input element', () => {
    const $el = mount(
      mockItem({
        inputProps: {
          disabled: true,
        },
      })
    );
    expect($el.find('[data-automation="input"]').props().disabled).to.be.true;
  });

  it('should trim the tags before adding', () => {
    const tags = [...defaults.tags];
    const $el = mount(
      mockItem({
        handleAddition(tag) {
          tags.push(tag);
        },
      })
    );
    expect(tags).to.length(1);

    const $input = $el.find('.ReactTags__tagInputField');

    $input.simulate('change', { target: { value: ' Orange' } });
    $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
    $el.setProps({ tags });

    $input.simulate('change', { target: { value: 'Orange ' } });
    $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
    $el.setProps({ tags });

    $input.simulate('change', { target: { value: ' Orange ' } });
    $input.simulate('keyDown', { keyCode: ENTER_ARROW_KEY_CODE });
    $el.setProps({ tags });

    expect(tags).to.length(2);
    expect(tags).to.have.deep.members([
      { className: '', id: 'Apple', text: 'Apple' },
      { className: '', id: 'Orange', text: 'Orange' },
    ]);
  });

  describe('Test drag and drop', () => {
    it('should be draggable', () => {
      const root = render(
        mockItem({
          tags: [
            ...defaults.tags,
            { id: 'Litchi', text: 'Litchi' },
            { id: 'Mango', text: 'Mango' },
          ],
        })
      );
      const src = root.getByText('Apple');
      const dest = root.getByText('Mango');
      fireEvent.dragStart(src);
      const styles = getComputedStyle(src);
      expect(styles.cursor).to.equal('move');
      fireEvent.dragEnter(dest);
      fireEvent.drop(dest);
      fireEvent.dragLeave(dest);
      fireEvent.dragEnd(dest);

      const dragTag = defaults.tags[0];
      const dragIndex = 0;
      const hoverIndex = 2;
      expect(handleDragStub.calledWithExactly(dragTag, dragIndex, hoverIndex))
        .to.be.true;
    });

    it('should not be draggable when drag and drop index is same', () => {
      const root = render(mockItem());
      const src = root.getByText('Apple');
      fireEvent.dragStart(src);
      fireEvent.dragEnter(src);
      fireEvent.drop(src);
      fireEvent.dragLeave(src);
      fireEvent.dragEnd(src);

      expect(handleDragStub.called).to.be.false;
    });

    [
      { overrideProps: { readOnly: true }, title: 'readOnly is true' },
      {
        overrideProps: { allowDragDrop: false },
        title: 'allowDragDrop is false',
      },
    ].forEach((data) => {
      const { title, overrideProps } = data;
      it(`should not be draggable when ${title}`, () => {
        const root = render(
          mockItem({
            ...overrideProps,
            tags: [
              ...defaults.tags,
              { id: 'Litchi', text: 'Litchi' },
              { id: 'Mango', text: 'Mango' },
            ],
          })
        );
        const src = root.getByText('Apple');
        const dest = root.getByText('Mango');
        fireEvent.dragStart(src);
        fireEvent.dragEnter(dest);
        fireEvent.dragLeave(dest);
        fireEvent.dragEnd(dest);
        expect(handleDragStub.called).to.be.false;
        const styles = getComputedStyle(src);
        expect(styles.cursor).to.equal('auto');
      });
    });
  });

  describe('When editable', () => {
    // todo fix as document.activeElement is null after upgrading
    // jest;
    it.skip('should update the tag to input and focus the tag when clicked', () => {
      const tags = render(
        mockItem({
          editable: true,
          tags: [
            ...defaults.tags,
            { id: 'Litchi', text: 'Litchi' },
            { id: 'Mango', text: 'Mango' },
          ],
        })
      );
      fireEvent.click(tags.getByText('Litchi'));
      expect(document.activeElement).to.equal(tags.queryByTestId('tag-edit'));
      jestExpect(tags.container).toMatchSnapshot();
    });
    // TODO fix, test fails after upgrading jest
    it.skip('should trigger "onTagUpdate" if present when tag is edited', () => {
      const onTagUpdateStub = sandbox.stub();
      const tags = render(
        mockItem({
          editable: true,
          tags: [
            ...defaults.tags,
            { id: 'Litchi', text: 'Litchi' },
            { id: 'Mango', text: 'Mango' },
          ],
          onTagUpdate: onTagUpdateStub,
        })
      );
      fireEvent.click(tags.getByText('Litchi'));
      const input = tags.queryByTestId('tag-edit');
      fireEvent.change(input, {
        target: { value: 'banana' },
      });
      fireEvent.keyDown(input, {
        keyCode: KEYS.ENTER[1],
      });
      expect(
        onTagUpdateStub.calledWithExactly(1, { id: 'banana', text: 'banana' })
      ).to.be.true;
    });
  });

  describe('When ClearAll is true', () => {
    it('should render a clear all button', () => {
      const tags = render(
        mockItem({
          clearAll: true,
        })
      );
      jestExpect(tags.container.querySelector('.ReactTags__clearAll'))
        .toMatchInlineSnapshot(`
        <button
          class="ReactTags__clearAll"
        >
          Clear all
        </button>
      `);
    });

    it('should trigger "onClearAll" callback if present when clear all button is clicked', () => {
      const onClearAllStub = sandbox.stub();
      const tags = render(
        mockItem({
          clearAll: true,
          onClearAll: onClearAllStub,
        })
      );

      const clearAllBtn = tags.getByText('Clear all');
      fireEvent.click(clearAllBtn);
      expect(onClearAllStub.calledOnce).to.be.true;
    });
  });

  describe('When maxTags is defined', () => {
    it('should disable adding tags when tag limit reached', () => {
      const tags = [{ id: 'A', text: 'A' }];
      const $el = render(
        mockItem({
          tags,
          handleAddition(tag) {
            tags.push(tag);
          },
          maxTags: 1,
        })
      );
      const input = $el.getByTestId('input');
      fireEvent.change(input, {
        target: { value: 'B' },
      });
      fireEvent.keyDown(input, {
        keyCode: ENTER_ARROW_KEY_CODE,
      });
      expect(tags).to.have.length(1);
      expect($el.getByTestId('error').textContent).to.equal(
        'Tag limit reached!'
      );
    });
  });
});
