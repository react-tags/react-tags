import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import noop from 'lodash/noop';
import { WithContext as ReactTags } from '../lib/ReactTags';

function mockItem(overrides) {
  const defaults = {
    tags: [],
    suggestions: ["Banana", "Apple", "Apricot", "Pear", "Peach"],
    handleAddition: noop,
    handleDelete: noop,
    handleDrag: noop
  }
  const props = Object.assign({}, defaults, overrides);
  return <ReactTags {...props} />
}

describe("Renders ReactTags properly", function() {
  it("shows the classnames of children properly", function() {
    const $el = mount(mockItem());
    expect($el.find('.ReactTags__tags').length).to.equal(1);
    expect($el.find('.ReactTags__selected').length).to.equal(1);
    expect($el.find('.ReactTags__tagInput').length).to.equal(1);
  });
});
