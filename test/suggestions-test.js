import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Suggestions from '../lib/Suggestions';
import noop from 'lodash/noop';

function mockItem(overrides) {
  const defaults = {
    query: "ang",
    suggestions: ["Banana", "Mango", "Pear", "Apricot"],
    selectedIndex: 1,
    handleClick: noop,
    handleHover: noop,
    classNames: { suggestions: "foo" }
  };
  const props = Object.assign({}, defaults, overrides);
  return <Suggestions {...props} />
}

describe("Suggestions", function() {
  it("shows the classname properly", function() {
    const $el = shallow(mockItem());
    expect($el.find('.foo').length).to.equal(1);
  });

  it("renders all suggestions properly", function() {
    const $el = shallow(mockItem());
    expect($el.find('li').length).to.equal(4);
  });

  it("selects the correct suggestion", function() {
    const $el = mount(mockItem());
    expect($el.find('li.active').length).to.equal(1);
    expect($el.find('li.active').text()).to.equal("Mango");
  });

  it("should not render suggestion with less than minQueryLength", function() {
    const $el = shallow(mockItem({
      minQueryLength: 2,
      query: "q"
    }));
    expect($el.find('.foo').length).to.equal(0);
    expect($el.find('li').length).to.equal(0);
  });

  it("should be able to override suggestion render", function() {
    const $el = shallow(mockItem({
      minQueryLength: 2,
      query: "ignore_query",
      shouldRenderSuggestions: (q) => q !== "ignore_query"
    }));
    expect($el.find('.foo').length).to.equal(0);
    expect($el.find('li').length).to.equal(0);
  });

  it("should mark highlighted suggestions correctly", function() {
    const $el = shallow(mockItem());
    expect($el.find("li.active").find("span").html()).to.equal("<span>M<mark>ang</mark>o</span>");
  });
});
