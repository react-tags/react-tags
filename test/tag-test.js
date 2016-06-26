import React, { Component } from 'react';
import { expect } from 'chai';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import { shallow, mount, render } from 'enzyme';
import Tag from '../lib/tag';

const noop = (e) => {};

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
    labelField: "label",
    onDelete: noop,
    moveTag: noop,
    readOnly: false,
    classNames: {
      tag: "tag",
      remove: "remove"
    }
  }, overrides);
  const TagContext = wrapInTestContext(Tag);
  return <TagContext {...props} />;
}

describe("Renders a Tag properly", function() {
  it("shows the classnames of children properly", function() {
    const $el = mount(mockItem());
    expect($el.find('.remove').length).to.equal(1);
    expect($el.find('.tag').length).to.equal(1);
  });
});
