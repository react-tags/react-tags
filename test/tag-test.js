import React, { Component } from 'react';
import { expect } from 'chai';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import noop from 'lodash/noop';
import Tag from '../lib/Tag';

function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    React.createClass({
      render: function () {
        return <DecoratedComponent {...this.props} />;
      }
    })
  );
}

function mockItem(overrides) {
  const props = Object.assign({}, {
    tag: {id: 1, text: "FooBar"},
    onDelete: noop,
    readOnly: false,
    moveTag: noop,
    classNames: {
      tag: "tag",
      remove: "remove"
    }
  }, overrides);
  const TagContext = wrapInTestContext(Tag);
  return <TagContext {...props} />;
}

describe("Tag", () => {
  it("shows the classnames of children properly", () => {
    const $el = mount(mockItem());
    expect($el.find('.tag').length).to.equal(1);
    expect($el.text()).to.have.string("FooBar");
  });

  it("should show cross for removing tag when read-only is false", () => {
    const $el = mount(mockItem());
    expect($el.find('.remove').length).to.equal(1);
  });

  it("should not show cross for removing tag when read-only is true", () => {
    const $el = mount(mockItem({readOnly: true}));
    expect($el.find('.remove').length).to.equal(0);
  });

  it("renders passed in removed component correctly", () => {
    const removeComponent = React.createClass({
      render: function() {
        return <a className="remove">delete me</a>
      }
    });
    const $el = mount(mockItem({ removeComponent: removeComponent }));
    expect($el.find('.remove').length).to.equal(1);
    expect($el.text()).to.have.string("delete me");
  });

  it("calls the delete handler correctly", () => {
    const spy = sinon.spy();
    const $el = mount(mockItem({ onDelete: spy }));
    $el.find('.remove').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it("should be draggable", () => {
    const root = TestUtils.renderIntoDocument(mockItem());
    const backend = root.getManager().getBackend();
    const tag = TestUtils.findRenderedComponentWithType(root, Tag);
    backend.simulateBeginDrag([tag.getDecoratedComponentInstance().getHandlerId()]);
    expect(tag.getDecoratedComponentInstance().state.isDragging).to.be.true;
    const el = TestUtils.findRenderedDOMComponentWithTag(root, "span");
    expect(el.style.opacity).to.equal('0');
    backend.simulateEndDrag();
    expect(el.style.opacity).to.equal('1');
    expect(tag.getDecoratedComponentInstance().state.isDragging).to.be.false;
  });

  it("should not be draggable if readOnly is true", () => {
    const root = TestUtils.renderIntoDocument(mockItem({ readOnly: true }));
    const backend = root.getManager().getBackend();
    const tag = TestUtils.findRenderedComponentWithType(root, Tag);
    backend.simulateBeginDrag([tag.getDecoratedComponentInstance().getHandlerId()]);
    expect(tag.getDecoratedComponentInstance().state.isDragging).to.be.false;
  });
});
