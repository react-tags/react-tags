import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Suggestions from '../lib/Suggestions';

describe("Renders suggestions properly", function() {
  beforeEach(function() {
    this.component = <Suggestions query={"query"}
              suggestions={["Banana", "Mango", "Pear", "Apricot"]}
              selectedIndex={1}
              handleClick= { (e) =>  null }
              handleHover= { (e) =>  null }
              classNames={ { "suggestions": "foo"} }/>
    this.$el = mount(this.component);
  });

  it("shows the classname properly", function() {
    expect(this.$el.find('.foo').length).to.equal(1);
  })

  it("renders all suggestions properly", function() {
    expect(this.$el.find('li').length).to.equal(4);
  })

  it("selects the correct suggestion", function() {
    expect(this.$el.find('li.active').length).to.equal(1);
    expect(this.$el.find('li.active').text()).to.equal("Mango");
  });

  it("should not render suggestion with less than minQueryLength", function() {
    let component = <Suggestions query={"q"}
              suggestions={["Banana", "Mango", "Pear", "Apricot"]}
              selectedIndex={1}
              handleClick= { (e) =>  null }
              handleHover= { (e) =>  null }
              classNames={ { "suggestions": "foo"} }
              minQueryLength={2} />

    expect(mount(component).find('.foo').length).to.equal(0);
    expect(mount(component).find('li').length).to.equal(0);
  });

  it("should be able to override suggestion render condiational using a function", function() {
    let component = <Suggestions query={"ignore_query"}
              suggestions={["Banana", "Mango", "Pear", "Apricot"]}
              selectedIndex={1}
              handleClick={ (e) =>  null }
              handleHover={ (e) =>  null }
              shouldRenderSuggestions={ (query) => query !== "ignore_query" }
              classNames={ { "suggestions": "foo"} }
              minQueryLength={2} />

    expect(mount(component).find('.foo').length).to.equal(0);
    expect(mount(component).find('li').length).to.equal(0);
  });
});
