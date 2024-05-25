import React from 'react';
import { expect } from 'chai';
import { spy, stub, createSandbox } from 'sinon';

import { WithContext as ReactTags } from '../src/index';

import { KEYS, SEPARATORS } from '../src/components/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Tag } from '../src/components/SingleTag';

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
  it.skip('should render with expected props', function () {
    const wrapper = render(mockItem());
    expect(wrapper).to.have.length(1);
    expect(wrapper.props()).to.deep.equal(defaults);
  });

  it('should update the class when the prop classNames changes', () => {
    const { rerender } = render(
      mockItem({
        classNames: {
          tag: 'tag',
        },
      })
    );

    expect(screen.getAllByTestId('tag').length).to.equal(1);
    rerender(
      mockItem({
        classNames: {
          tag: 'changed',
        },
      })
    );

    expect(screen.getAllByTestId('tag').length).to.equal(1);
  });

  it('focus on input by default', () => {
    const wrapper = render(mockItem());
    expect(document.activeElement?.tagName).to.equal('INPUT');
    expect(document.activeElement?.className).to.equal(
      'ReactTags__tagInputField'
    );
    wrapper.unmount();
  });

  it('should not focus on input if autofocus is false', () => {
    const { unmount } = render(mockItem({ autofocus: false }));
    expect(document.activeElement?.tagName).to.equal('BODY');
    unmount();
  });

  it('should not focus on input if autoFocus is false', () => {
    const { unmount } = render(mockItem({ autoFocus: false }));
    expect(document.activeElement?.tagName).to.equal('BODY');
    unmount();
  });

  describe('When readOnly is true', () => {
    it('should not render input', () => {
      const wrapper = render(mockItem({ readOnly: true }));

      expect(
        wrapper.container.querySelector('.ReactTags__tagInputField')
      ).to.equal(null);
    });

    it('should render tags without remove button', () => {
      const wrapper = render(
        mockItem({
          readOnly: true,
          tags: [
            { id: 'Mango', text: 'Mango' },
            { id: 'Lichi', text: 'Litchi' },
          ],
        })
      );
      expect(screen.getAllByTestId('tag').length).to.equal(2);
      expect(
        wrapper.container.querySelector('.ReactTags__tag__remove')
      ).to.equal(null);
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
    const { container } = render(mockItem());
    expect(container.querySelectorAll('.ReactTags__tags').length).to.equal(1);
    expect(container.querySelectorAll('.ReactTags__selected').length).to.equal(
      1
    );
    expect(container.querySelectorAll('.ReactTags__tagInput').length).to.equal(
      1
    );
    expect(
      container.querySelectorAll('.ReactTags__tagInputField').length
    ).to.equal(1);
  });

  it('renders preselected tags properly', () => {
    render(mockItem());
    expect(screen.getByText('Apple')).to.exist;
  });

  it('invokes the onBlur event', () => {
    const handleInputBlur = spy();
    const { rerender } = render(mockItem());

    // Won't be invoked as there's no `handleInputBlur` event yet.
    fireEvent.blur(screen.getByTestId('input'));
    expect(handleInputBlur.callCount).to.equal(0);

    // Will be invoked despite the input being empty.
    rerender(mockItem({ handleInputBlur }));
    fireEvent.blur(screen.getByTestId('input'));
    expect(handleInputBlur.callCount).to.equal(1);
    expect(handleInputBlur.calledWith('')).to.be.true;
    expect(screen.getByTestId('input').textContent).to.be.empty;
  });

  it('invokes the onFocus event', () => {
    const handleInputFocus = spy();
    const { rerender } = render(mockItem({ inputValue: 'Example' }));
    rerender(mockItem({ handleInputFocus }));
    fireEvent.focus(screen.getByTestId('input'));
    expect(handleInputFocus.callCount).to.equal(1);
    expect(handleInputFocus.args[0].length).to.equal(2);
    expect(handleInputFocus.calledWith('Example')).to.be.true;
  });

  it('invokes the onBlur event when input has value', () => {
    const handleInputBlur = spy();
    const { rerender } = render(mockItem({ inputValue: 'Example' }));
    rerender(mockItem({ handleInputBlur }));

    // Will also be invoked for when the input has a value.
    fireEvent.blur(screen.getByTestId('input'));
    expect(handleInputBlur.callCount).to.equal(1);
    expect(handleInputBlur.args[0].length).to.equal(2);
    expect(handleInputBlur.calledWith('Example')).to.be.true;
    expect(screen.getByTestId('input').textContent).to.be.empty;
  });

  describe('tests handlePaste', () => {
    it('should not add new tag when allowAdditionFromPaste is false', () => {
      const actual = [];
      const wrapper = render(
        mockItem({
          allowAdditionFromPaste: false,
          handleAddition(tag) {
            actual.push(tag);
          },
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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
      render(
        mockItem({
          delimiters: [Keys.TAB, Keys.SPACE, Keys.COMMA],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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
      render(
        mockItem({
          delimiters: [...Keys.ENTER],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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

    it('should split the clipboard on separators', () => {
      const tags = [];
      render(
        mockItem({
          separators: [SEPARATORS.TAB, SEPARATORS.SPACE, SEPARATORS.COMMA],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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

    it('should split the clipboard when separated with new lines', () => {
      const tags = [];
      render(
        mockItem({
          separators: [SEPARATORS.ENTER],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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
      const wrapper = render(
        mockItem({
          delimiters: [Keys.TAB, Keys.SPACE, Keys.COMMA],
          handleAddition(tag) {
            tags.push(tag);
          },
          tags,
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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

      const wrapper = render(
        mockItem({
          handleAddition(tag) {
            tags.push(tag);
          },
          maxLength,
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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
      render(
        mockItem({
          delimiters: [Keys.COMMA],
          handleAddition(tag) {
            tags.push(tag);
          },
        })
      );

      fireEvent.paste(screen.getByTestId('input'), {
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
    const tags = [];
    render(
      mockItem({
        delimiters: [Keys.TAB, Keys.SPACE, Keys.COMMA],
        handleAddition(tag) {
          tags.push(tag);
        },
        tags,
      })
    );

    fireEvent.paste(screen.getByTestId('input'), {
      clipboardData: {
        getData: () => 'Banana,Apple,Banana',
      },
    });
    expect(tags.length).to.equal(2);

    // Note that 'Apple' and 'Banana' are only included once in the expected list
    const expected = ['Apple', 'Banana'].map((value) => ({
      className: '',
      id: value,
      text: value,
    }));
    expect(tags.length).to.equal(2);
    expect(tags).to.deep.have.same.members(expected);
  });

  it('should not add empty tag when down arrow is clicked followed by enter key', () => {
    const tags = [];
    render(
      mockItem({
        handleAddition(tag) {
          tags.push(tag);
        },
        suggestions: [],
      })
    );

    expect(tags.length).to.equal(0);
    const input = screen.getByTestId('input');
    fireEvent.keyDown(input, {
      keyCode: DOWN_ARROW_KEY_CODE,
    });
    fireEvent.keyDown(input, {
      keyCode: ENTER_ARROW_KEY_CODE,
    });

    expect(tags).to.have.length(0);
  });

  describe('render tags correctly when html passed in  text attribute, fix #267', () => {
    let modifiedTags: Tag[] = [];
    let handleAddition;
    let actual: Tag[];
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
      render(
        mockItem({
          tags: modifiedTags,
          handleAddition,
        })
      );
      const tags = ['Apple', 'NewYork', 'Austria'];
      screen.getAllByTestId('tag').forEach((tag, index) => {
        expect(tag.textContent).to.contains(tags[index]);
      });
    });

    it('should allow adding a tag outside the suggestions list', () => {
      const actual: Tag[] = [];
      const wrapper = render(
        mockItem({
          handleAddition(tag) {
            actual.push(tag);
          },
          suggestions: [],
        })
      );
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'Austria' } });
      fireEvent.keyDown(input, { keyCode: ENTER_ARROW_KEY_CODE });
      expect(actual).to.have.deep.members([
        { id: 'Austria', text: 'Austria', className: '' },
      ]);
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

    it('should update suggestions if the suggestions prop changes', () => {
      const { rerender } = render(mockItem());

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'ap' } });
      fireEvent.focus(input);

      jestExpect(screen.getByTestId('suggestions')).toMatchInlineSnapshot(`
        <div
          class="ReactTags__suggestions"
          data-testid="suggestions"
        >
          <ul>
             
            <li
              class=""
            >
              <span>
                <mark>
                  Ap
                </mark>
                ricot
              </span>
            </li>
             
          </ul>
        </div>
      `);

      // Rerender with new suggestions
      rerender(
        mockItem({
          suggestions: [
            { className: '', id: 'Papaya', text: 'Papaya' },
            { className: '', id: 'Paprika', text: 'Paprika' },
          ],
        })
      );

      jestExpect(screen.getByTestId('suggestions')).toMatchInlineSnapshot(`
        <div
          class="ReactTags__suggestions"
          data-testid="suggestions"
        >
          <ul>
             
            <li
              class=""
            >
              <span>
                P
                <mark>
                  ap
                </mark>
                aya
              </span>
            </li>
            <li
              class=""
            >
              <span>
                P
                <mark>
                  ap
                </mark>
                rika
              </span>
            </li>
             
          </ul>
        </div>
      `);
    });

    it('should update suggestions if the handleFilterSuggestions prop changes', () => {
      const { rerender } = render(
        mockItem({
          suggestions: [
            { className: '', id: 'Papaya', text: 'Papaya' },
            { className: '', id: 'Paprika', text: 'Paprika' },
          ],
        })
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'ap' } });
      fireEvent.focus(input);

      jestExpect(screen.getByTestId('suggestions')).toMatchInlineSnapshot(`
        <div
          class="ReactTags__suggestions"
          data-testid="suggestions"
        >
          <ul>
             
            <li
              class=""
            >
              <span>
                P
                <mark>
                  ap
                </mark>
                aya
              </span>
            </li>
            <li
              class=""
            >
              <span>
                P
                <mark>
                  ap
                </mark>
                rika
              </span>
            </li>
             
          </ul>
        </div>
      `);

      // Rerender with new handleFilterSuggestions
      rerender(
        mockItem({
          handleFilterSuggestions: (query, suggestions) => {
            const matchingSuggestions = suggestions.filter((suggestion) => {
              return (
                suggestion.text.toLowerCase().indexOf(query.toLowerCase()) >= 0
              );
            });
            // Return first matching suggestion only
            return [matchingSuggestions[0]];
          },
        })
      );

      jestExpect(screen.getByTestId('suggestions')).toMatchInlineSnapshot(`
        <div
          class="ReactTags__suggestions"
          data-testid="suggestions"
        >
          <ul>
             
            <li
              class=""
            >
              <span>
                <mark>
                  Ap
                </mark>
                ricot
              </span>
            </li>
             
          </ul>
        </div>
      `);
    });

    it('should select the correct suggestion using the keyboard when minQueryLength is 0', () => {
      const { container } = render(
        mockItem({
          minQueryLength: 0,
        })
      );
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'Ea' } });
      fireEvent.keyDown(input, { keyCode: DOWN_ARROW_KEY_CODE });
      fireEvent.keyDown(input, { keyCode: DOWN_ARROW_KEY_CODE });

      jestExpect(container.querySelector('.ReactTags__activeSuggestion'))
        .toMatchInlineSnapshot(`
        <li
          class="ReactTags__activeSuggestion"
        >
          <span>
            P
            <mark>
              ea
            </mark>
            ch
          </span>
        </li>
      `);

      fireEvent.change(input, { target: { value: 'Each' } });
      jestExpect(container.querySelector('.ReactTags__activeSuggestion'))
        .toMatchInlineSnapshot(`
        <li
          class="ReactTags__activeSuggestion"
        >
          <span>
            P
            <mark>
              each
            </mark>
          </span>
        </li>
      `);
    });

    it('should select the correct suggestion using the keyboard when label is custom', () => {
      const { container } = render(
        mockItem({
          labelField: 'name',
          suggestions: [
            { className: '', id: 'Papaya', name: 'Papaya' },
            { className: '', id: 'Paprika', name: 'Paprika' },
          ],
        })
      );
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'ap' } });
      fireEvent.keyDown(input, { keyCode: DOWN_ARROW_KEY_CODE });
      fireEvent.keyDown(input, { keyCode: DOWN_ARROW_KEY_CODE });

      jestExpect(container.querySelector('.ReactTags__activeSuggestion'))
        .toMatchInlineSnapshot(`
        <li
          class="ReactTags__activeSuggestion"
        >
          <span>
            P
            <mark>
              ap
            </mark>
            rika
          </span>
        </li>
      `);

      fireEvent.change(input, { target: { value: 'Each' } });
      expect(container.querySelector('.ReactTags__activeSuggestion')).to.be
        .null;
    });

    it('should show suggestions for the tags which are already added when "allowUnique" is false', () => {
      const tags: Tag[] = [];
      const { container } = render(
        mockItem({
          allowUnique: false,
          tags: [],
          handleAddition: (tag) => {
            tags.push(tag);
          },
        })
      );
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'apr' } });
      fireEvent.keyDown(input, { keyCode: DOWN_ARROW_KEY_CODE });
      fireEvent.keyDown(input, { keyCode: DOWN_ARROW_KEY_CODE });

      jestExpect(container.querySelector('.ReactTags__suggestions'))
        .toMatchInlineSnapshot(`
        <div
          class="ReactTags__suggestions"
          data-testid="suggestions"
        >
          <ul>
             
            <li
              class="ReactTags__activeSuggestion"
            >
              <span>
                <mark>
                  Apr
                </mark>
                icot
              </span>
            </li>
             
          </ul>
        </div>
      `);

      fireEvent.keyDown(input, { keyCode: ENTER_ARROW_KEY_CODE });
      expect(tags).to.deep.have.members([
        { className: '', id: 'Apricot', text: 'Apricot' },
      ]);
      fireEvent.change(input, { target: { value: 'apr' } });
      jestExpect(container.querySelector('.ReactTags__suggestions'))
        .toMatchInlineSnapshot(`
        <div
          class="ReactTags__suggestions"
          data-testid="suggestions"
        >
          <ul>
             
            <li
              class=""
            >
              <span>
                <mark>
                  Apr
                </mark>
                icot
              </span>
            </li>
             
          </ul>
        </div>
      `);
    });
  });

  it('should add tag with custom name field', () => {
    const labelField = 'name';
    const mapper = (data: Tag) => ({ id: data.id, name: data.text });
    const tags = defaults.tags.map(mapper);
    const suggestions = defaults.suggestions.map(mapper);

    let actual: Tag[] = [];
    render(
      mockItem({
        handleAddition(tag) {
          actual.push(tag);
        },
        labelField,
        tags,
        suggestions,
      })
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'Or' } });
    fireEvent.keyDown(input, { keyCode: ENTER_ARROW_KEY_CODE });
    expect(actual).to.have.deep.members([
      { className: '', id: 'Or', name: 'Or' },
    ]);
  });

  it('should allow duplicate tags when allowUnique is false', () => {
    const tags: Tag[] = [];
    render(
      mockItem({
        allowUnique: false,
        handleAddition(tag) {
          tags.push(tag);
        },
      })
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'Apple' } });
    fireEvent.keyDown(input, { keyCode: ENTER_ARROW_KEY_CODE });

    fireEvent.change(input, { target: { value: 'Banana' } });
    fireEvent.keyDown(input, { keyCode: ENTER_ARROW_KEY_CODE });

    fireEvent.change(input, { target: { value: 'Apple' } });
    fireEvent.keyDown(input, { keyCode: ENTER_ARROW_KEY_CODE });

    expect(tags.length).to.equal(3);
    expect(tags).to.deep.have.same.members([
      { className: '', id: 'Apple', text: 'Apple' },
      { className: '', id: 'Banana', text: 'Banana' },
      { className: '', id: 'Apple', text: 'Apple' },
    ]);
  });

  describe('Test inputFieldPosition', () => {
    it('should render input field above the tags when "inputFieldPosition" is "top"', () => {
      const { container } = render(
        mockItem({
          inputFieldPosition: 'top',
        })
      );
      const tagsContainer = container.querySelector('.ReactTags__tags');
      expect(tagsContainer?.children.length).to.equal(3);
      expect(tagsContainer?.children[1].firstChild).to.equal(
        screen.getByTestId('input')
      );
      expect(tagsContainer?.lastChild).to.equal(
        container.querySelector('.ReactTags__selected')
      );
    });

    it('should render input field below the tags when "inputFieldPosition" is "bottom"', () => {
      const { container } = render(
        mockItem({
          inputFieldPosition: 'bottom',
        })
      );

      const tagsContainer = container.querySelector('.ReactTags__tags');
      expect(tagsContainer?.children.length).to.equal(3);
      expect(tagsContainer?.children[1]).to.equal(
        container.querySelector('.ReactTags__selected')
      );
      expect(tagsContainer?.lastChild?.firstChild).to.equal(
        screen.getByTestId('input')
      );
    });

    it('should render input field inline with tags when "inputFieldPosition" is "inline"', () => {
      const { container } = render(
        mockItem({
          inputFieldPosition: 'inline',
        })
      );

      const tagsContainer = container.querySelector('.ReactTags__tags');
      expect(tagsContainer?.children.length).to.equal(2);
      expect(tagsContainer?.lastChild).to.equal(
        container.querySelector('.ReactTags__selected')
      );
      expect(tagsContainer?.lastChild?.lastChild?.firstChild).to.equal(
        screen.getByTestId('input')
      );
    });
  });

  it('should pass input props to the input element', () => {
    const wrapper = render(
      mockItem({
        inputProps: {
          disabled: true,
          maxlength: 10,
        },
      })
    );
    const input = screen.getByTestId('input');
    expect(input.getAttribute('disabled')).to.be.empty;
    expect(input.getAttribute('maxlength')).to.equal('10');
  });

  it('should trim the tags before adding', () => {
    const tags = [];
    render(
      mockItem({
        delimiters: [Keys.COMMA],
        tags: [],
        handleAddition(tag) {
          tags.push(tag);
        },
      })
    );

    fireEvent.paste(screen.getByTestId('input'), {
      clipboardData: {
        getData: () => ' Apple,Orange , Banana ',
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
        {
          "className": "",
          "id": "Banana",
          "text": "Banana",
        },
      ]
    `);
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
      render(
        mockItem({
          tags,
          handleAddition(tag) {
            tags.push(tag);
          },
          maxTags: 1,
        })
      );
      const input = screen.getByTestId('input');
      fireEvent.change(input, {
        target: { value: 'B' },
      });
      fireEvent.keyDown(input, {
        keyCode: ENTER_ARROW_KEY_CODE,
      });
      expect(tags).to.have.length(1);
      expect(screen.getByTestId('error').textContent).to.equal(
        'Tag limit reached!'
      );
    });
  });
});
