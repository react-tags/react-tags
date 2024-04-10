import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import Suggestions, { arePropsEqual } from '../src/components/Suggestions';
import noop from 'lodash/noop';
import { DEFAULT_LABEL_FIELD } from '../src/components/constants';

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
  it('should render with expected props', () => {
    const $el = mount(mockItem());

    expect($el.props()).deep.equal(defaults);
  });

  it('shows the classname properly', () => {
    const $el = shallow(mockItem());
    expect($el.find('.foo').length).to.equal(1);
  });

  it('renders all suggestions properly', () => {
    const $el = shallow(mockItem());
    expect($el.find('li').length).to.equal(4);
  });

  it('selects the correct suggestion', () => {
    const $el = mount(mockItem());
    expect($el.find('li.active').length).to.equal(1);
    expect($el.find('li.active').text()).to.equal('Mango');
  });

  it('should not render suggestion with less than minQueryLength', () => {
    const $el = shallow(
      mockItem({
        minQueryLength: 2,
        query: 'q',
      })
    );
    expect($el.find('.foo').length).to.equal(0);
    expect($el.find('li').length).to.equal(0);
  });

  it('should be able to override suggestion render', () => {
    const $el = shallow(
      mockItem({
        minQueryLength: 2,
        query: 'ignore_query',
        shouldRenderSuggestions: (q) => q !== 'ignore_query',
      })
    );
    expect($el.find('.foo').length).to.equal(0);
    expect($el.find('li').length).to.equal(0);
  });

  it('should escape html characters in query', () => {
    const suggestions = [{ id: 'script', text: '<script>alert()</script>' }];
    const $el = shallow(
      mockItem({
        query: '<script>alert()</script>',
        suggestions,
      })
    );
    expect($el.html()).to.equal(
      '<div class="foo"><ul> ' +
        '<li class=""><span><mark>&lt;script&gt;alert()&lt;/script&gt;</mark></span></li> ' +
        '</ul></div>'
    );
  });

  it('should mark highlighted suggestions correctly', () => {
    const $el = shallow(mockItem());
    expect($el.find('li.active').find('span').html()).to.equal(
      '<span>M<mark>ang</mark>o</span>'
    );
  });

  // it('should not wastefully re-render if the list of suggestions have not changed', () => {
  //   const suggestions = [
  //     { id: 'queue', text: 'queue' },
  //     { id: 'quiz', text: 'quiz' },
  //     { id: 'quantify', text: 'quantify' },
  //   ];
  //   const $el = mount(
  //     mockItem({
  //       minQueryLength: 2,
  //       query: 'q',
  //       suggestions,
  //     })
  //   );

  //   $el.setProps({ suggestions });
  // });

  // it('should re-render if there is an active query', () => {
  //   const suggestions = [
  //     { id: 'queue', text: 'queue' },
  //     { id: 'quiz', text: 'quiz' },
  //     { id: 'quantify', text: 'quantify' },
  //   ];
  //   const $el = mount(
  //     mockItem({
  //       minQueryLength: 2,
  //       query: 'qu',
  //       suggestions,
  //     })
  //   );
  //   spy(Suggestions.prototype, 'componentDidUpdate');
  //   $el.setProps({ suggestions });
  //   expect(Suggestions.prototype.componentDidUpdate.called).to.equal(true);
  //   Suggestions.prototype.componentDidUpdate.restore();
  // });

  // it('should re-render if minQueryLength is set to 0', () => {
  //   const suggestions = [
  //     { id: 'queue', text: 'queue' },
  //     { id: 'quiz', text: 'quiz' },
  //     { id: 'quantify', text: 'quantify' },
  //   ];
  //   const $el = mount(
  //     mockItem({
  //       minQueryLength: 0,
  //       query: '',
  //       suggestions,
  //     })
  //   );
  //   spy(Suggestions.prototype, 'componentDidUpdate');
  //   $el.setProps({ suggestions });
  //   expect(Suggestions.prototype.componentDidUpdate.called).to.equal(true);
  //   Suggestions.prototype.componentDidUpdate.restore();
  // });

  // it('should re-render if the provided "shouldRenderSuggestions" prop returns true', () => {
  //   const suggestions = [
  //     { id: 'queue', text: 'queue' },
  //     { id: 'quiz', text: 'quiz' },
  //     { id: 'quantify', text: 'quantify' },
  //   ];
  //   const $el = mount(
  //     mockItem({
  //       shouldRenderSuggestions: () => true,
  //       suggestions,
  //     })
  //   );
  //   spy(Suggestions.prototype, 'componentDidUpdate');
  //   $el.setProps({ suggestions });
  //   expect(Suggestions.prototype.componentDidUpdate.called).to.equal(true);
  //   Suggestions.prototype.componentDidUpdate.restore();
  // });

  // it('should re-render when the query reaches minQueryLength', () => {
  //   const suggestions = [
  //     { id: 'queue', text: 'queue' },
  //     { id: 'quiz', text: 'quiz' },
  //     { id: 'quantify', text: 'quantify' },
  //   ];
  //   let div = document.createElement('div');
  //   let component = mockItem({
  //     minQueryLength: 2,
  //     query: '',
  //     suggestions,
  //   });
  //   var $el = ReactDOM.render(component, div);
  //   spy($el, 'componentDidUpdate');

  //   // re-render with updated query prop
  //   $el = ReactDOM.render(
  //     mockItem({
  //       minQueryLength: 2,
  //       query: 'qu',
  //       suggestions,
  //     }),
  //     div
  //   );

  //   expect($el.componentDidUpdate.called).to.equal(true);
  // });

  it('should render custom suggestions when renderSuggestion prop is provided', () => {
    const $el = shallow(
      mockItem({
        renderSuggestion: ({ text }) => (
          <div className="bar">
            <i />
            {text}
          </div>
        ),
      })
    );

    expect($el.find('.bar').length).to.equal(4);
  });

  it('should trigger the click handler on touchStart', () => {
    const onTagClickedStub = stub();
    const $el = mount(mockItem({ handleClick: onTagClickedStub }));
    $el.find('li').first().simulate('touchStart');
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
