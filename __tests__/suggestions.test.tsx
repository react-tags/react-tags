import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import Suggestions, { arePropsEqual } from '../src/components/Suggestions';
import { noop } from 'lodash-es';
import { DEFAULT_LABEL_FIELD } from '../src/components/constants';
import { fireEvent, render, screen } from '@testing-library/react';

const defaults = {
  query: 'ang',
  suggestions: [
    { id: 'Banana', text: 'Banana' },
    { id: 'Mango', text: 'Mango' },
    { id: 'Pear', text: 'Pear' },
    { id: 'Apricot', text: 'Apricot' },
  ],
  labelField: DEFAULT_LABEL_FIELD,
  selectedIndex: 1,
  isFocused: true,
  handleClick: noop,
  handleHover: noop,
  classNames: { suggestions: 'foo', activeSuggestion: 'active' },
};

const mockItem = (overrides?: any) => {
  const props = Object.assign({}, defaults, overrides);
  return <Suggestions {...props} />;
};

describe('Suggestions', () => {
  it('should render with base structure', () => {
    const { container } = render(mockItem());

    jestExpect(container).toMatchSnapshot();
  });

  it('should not render suggestion when query length is less than minQueryLength', () => {
    const { container } = render(mockItem({ minQueryLength: 4, query: 'ap' }));
    expect(container.querySelector('[data-testid="suggestions"]')).to.not.exist;
  });

  it('should be override suggestion renderer when shouldRenderSuggestions prop is provided', () => {
    const { container } = render(
      mockItem({
        minQueryLength: 2,
        query: 'ignore_query',
        shouldRenderSuggestions: (q) => q !== 'ignore_query',
      })
    );
    expect(container.querySelector('[data-testid="suggestions"]')).to.not.exist;
    render(
      mockItem({
        minQueryLength: 2,
        query: 'ang',
        shouldRenderSuggestions: (q) => q !== 'ignore_query',
      })
    );
    expect(screen.getByTestId('suggestions')).to.exist;
  });

  it('should escape html characters in query', () => {
    const suggestions = [{ id: 'script', text: '<script>alert()</script>' }];
    const { container } = render(
      mockItem({
        query: '<script>alert()</script>',
        suggestions,
      })
    );
    jestExpect(screen.getByTestId('suggestions')).toMatchInlineSnapshot(`
      <div
        class="foo"
        data-testid="suggestions"
      >
        <ul>
           
          <li
            class=""
          >
            <span>
              <mark>
                &lt;script&gt;alert()&lt;/script&gt;
              </mark>
            </span>
          </li>
           
        </ul>
      </div>
    `);
  });

  it('should render custom suggestions when renderSuggestion prop is provided', () => {
    render(
      mockItem({
        renderSuggestion: ({ text }) => (
          <div className="bar">
            <i />
            {text}
          </div>
        ),
      })
    );

    jestExpect(screen.getByTestId('suggestions')).toMatchInlineSnapshot(`
      <div
        class="foo"
        data-testid="suggestions"
      >
        <ul>
           
          <li
            class=""
          >
            <div
              class="bar"
            >
              <i />
              Banana
            </div>
          </li>
          <li
            class="active"
          >
            <div
              class="bar"
            >
              <i />
              Mango
            </div>
          </li>
          <li
            class=""
          >
            <div
              class="bar"
            >
              <i />
              Pear
            </div>
          </li>
          <li
            class=""
          >
            <div
              class="bar"
            >
              <i />
              Apricot
            </div>
          </li>
           
        </ul>
      </div>
    `);
  });

  it('should trigger the click handler on touchStart', () => {
    const onTagClickedStub = stub();
    render(mockItem({ handleClick: onTagClickedStub }));
    const suggestion = screen
      .getByTestId('suggestions')
      .querySelector('li')?.firstChild;
    fireEvent.touchStart(suggestion!);
    expect(onTagClickedStub.calledOnce).to.be.true;
  });

  describe('Test arePropsEqual', () => {
    const prevProps = {
      query: 'ang',
      suggestions: [
        { id: 'Banana', text: 'Banana' },
        { id: 'Mango', text: 'Mango' },
        { id: 'Pear', text: 'Pear' },
        { id: 'Apricot', text: 'Apricot' },
      ],
      labelField: 'text',
      selectedIndex: 1,
      isFocused: true,
      handleClick: noop,
      handleHover: noop,
      classNames: { suggestions: 'foo', activeSuggestion: 'active' },
    };
    const nextProps = { ...prevProps };

    it('should return false if isFocussed prop changes', () => {
      expect(
        arePropsEqual(prevProps, { ...nextProps, isFocused: false })
      ).to.equal(false);
    });

    it('should return false if suggestions prop changes', () => {
      expect(
        arePropsEqual(prevProps, {
          ...nextProps,
          suggestions: [
            { id: 'Banana', text: 'Banana' },
            { id: 'Mango', text: 'Mango' },
            { id: 'Pear', text: 'Pear' },
          ],
        })
      ).to.equal(false);
    });

    it('should return false if minQueryLength prop changes leading to no suggestions', () => {
      expect(
        arePropsEqual(prevProps, {
          ...nextProps,
          // Will lead to no suggestions as shouldRenderSuggestions returns false since minQueryLength greater than query length (3)
          minQueryLength: 4,
        })
      ).to.equal(false);
    });

    it('should return true only if isFocused, suggestions, minQueryLength props and return value of shouldRenderSuggestions are the same', () => {
      // Even if label field is getting updated in next Props still the function will return true
      expect(
        arePropsEqual(prevProps, { ...nextProps, labelField: 'name' })
      ).to.equal(true);
    });
  });
});
