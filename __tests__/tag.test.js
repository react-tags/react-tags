import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import { mount } from 'enzyme';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import noop from 'lodash/noop';
import Tag from '../src/components/Tag';

function wrapInTestContext(DecoratedComponent) {
  class DecoratedComponentWrapper extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }
  return DragDropContext(TestBackend)(DecoratedComponentWrapper);
}

function mockItem(overrides) {
  const props = Object.assign(
    {},
    {
      tag: { id: '1', text: 'FooBar', className: 'action' },
      onDelete: noop,
      readOnly: false,
      allowDragDrop: true,
      moveTag: noop,
      classNames: {
        tag: 'tag',
        remove: 'remove',
      },
    },
    overrides
  );
  const TagContext = wrapInTestContext(Tag);
  return <TagContext {...props} />;
}

describe('Tag', () => {
  test('shows the classnames of children properly', () => {
    const $el = mount(mockItem());
    expect($el.find('.tag').length).to.equal(1);
    expect($el.text()).to.have.string('FooBar');
  });

  test('should show cross for removing tag when read-only is false', () => {
    const $el = mount(mockItem());
    expect($el.find('a.remove').length).to.equal(1);
  });

  test('should not show cross for removing tag when read-only is true', () => {
    const $el = mount(mockItem({ readOnly: true }));
    expect($el.find('a.remove').length).to.equal(0);
  });

  test('renders passed in removed component correctly', () => {
    const CustomRemoveComponent = function() {
      return <a className="remove">delete me</a>;
    };
    const $el = mount(mockItem({ removeComponent: CustomRemoveComponent }));
    expect($el.find('a.remove').length).to.equal(1);
    expect($el.text()).to.have.string('delete me');
  });

  test('renders conditionaly passed in removed component correctly', () => {
    const CustomConditionRemoveComponent = function(props) {
      return props.tag.id === '1' ? null : <a className="removeTag">x</a>;
    };
    CustomConditionRemoveComponent.propTypes = {
      tag: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    };
    const $el = mount(
      mockItem({ removeComponent: CustomConditionRemoveComponent })
    );
    expect($el.find('.removeTag').length).to.equal(0);
  });

  test('calls the delete handler correctly', () => {
    const spy = sinon.spy();
    const $el = mount(mockItem({ onDelete: spy }));
    $el.find('a.remove').simulate('click');
    expect(spy.calledOnce).to.be.true;
    spy.resetHistory();
    $el.find('a.remove').simulate('keyDown');
    expect(spy.calledOnce).to.be.true;
  });

  test('should add className passed in tags to the tag', () => {
    const $el = mount(mockItem());
    expect($el.find('.action').length).to.equal(1);
  });

  test('calls the tag click handler correctly', () => {
    const spy = sinon.spy();
    const $el = mount(mockItem({ onTagClicked: spy }));
    $el.find('span').simulate('click');
    expect(spy.calledOnce).to.be.true;
    spy.resetHistory();
    $el.find('span').simulate('keyDown');
    expect(spy.calledOnce).to.be.true;
  });

  test('calls the tag touch handler correctly on touchStart', () => {
    const spy = sinon.spy();
    const $el = mount(mockItem({ onTagClicked: spy }));
    $el.find('span').simulate('touchStart');
    expect(spy.calledOnce).to.be.true;
    spy.resetHistory();
    $el.find('span').simulate('keyDown');
    expect(spy.calledOnce).to.be.true;
  });

  test('should be draggable', () => {
    const root = TestUtils.renderIntoDocument(mockItem());
    const backend = root.getManager().getBackend();
    const tag = TestUtils.findRenderedComponentWithType(root, Tag);
    backend.simulateBeginDrag([
      tag.getDecoratedComponentInstance().getHandlerId(),
    ]);
    expect(tag.getDecoratedComponentInstance().state.isDragging).to.be.true;
    const el = TestUtils.findRenderedDOMComponentWithTag(root, 'span');
    const { _values: styleAttributes } = el.style;
    expect(styleAttributes.opacity).to.equal('0');
    expect(styleAttributes.cursor).to.equal('move');
    backend.simulateEndDrag();
    expect(styleAttributes.opacity).to.equal('1');
    expect(tag.getDecoratedComponentInstance().state.isDragging).to.be.false;
  });

  [
    { overrideProps: { readOnly: true }, title: 'readOnly is true' },
    {
      overrideProps: { allowDragDrop: false },
      title: 'allowDragDrop is false',
    },
  ].forEach((data) => {
    const { title, overrideProps } = data;
    test(`should not be draggable when ${title}`, () => {
      const root = TestUtils.renderIntoDocument(mockItem({ ...overrideProps }));
      const backend = root.getManager().getBackend();
      const tag = TestUtils.findRenderedComponentWithType(root, Tag);
      backend.simulateBeginDrag([
        tag.getDecoratedComponentInstance().getHandlerId(),
      ]);
      const el = TestUtils.scryRenderedDOMComponentsWithClass(
        root,
        'cursor-move'
      );
      expect(el.length).eq(0);
      expect(tag.getDecoratedComponentInstance().state.isDragging).to.be.false;
    });
  });
});
