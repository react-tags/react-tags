import React from "react";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import { spy } from "sinon";
import noop from "lodash/noop";
import { WithContext as ReactTags } from "../lib/ReactTags";
import renderer from "react-test-renderer";

const defaults = {
  tags: [{ id: 1, text: "Apple" }],
  suggestions: ["Banana", "Apple", "Apricot", "Pear", "Peach"],
  handleAddition: noop,
  handleDelete: noop,
  handleDrag: noop,
};

const DOWN_ARROW_KEY_CODE = 40;
const ENTER_ARROW_KEY_CODE = 13;

function mockItem(overrides) {
  const props = Object.assign({}, defaults, overrides);
  return <ReactTags {...props} />;
}

test("focus on input by default", () => {
  const $el = mount(mockItem());
  expect(document.activeElement.tagName).to.equal("INPUT");
  expect(document.activeElement.className).to.equal("ReactTags__tagInputField");
  $el.unmount();
});

test("should not focus on input if autofocus is false", () => {
  const $el = mount(mockItem({ autofocus: false }));
  expect(document.activeElement.tagName).to.equal("BODY");
  $el.unmount();
});

test("should not focus on input if readOnly is true", () => {
  const $el = mount(mockItem({ autofocus: false }));
  expect(document.activeElement.tagName).to.equal("BODY");
  $el.unmount();
});

test("shows the classnames of children properly", () => {
  const $el = mount(mockItem());
  expect($el.find(".ReactTags__tags").length).to.equal(1);
  expect($el.find(".ReactTags__selected").length).to.equal(1);
  expect($el.find(".ReactTags__tagInput").length).to.equal(1);
  expect($el.find(".ReactTags__tagInputField").length).to.equal(1);
});

test("renders preselected tags properly", () => {
  const $el = mount(mockItem());
  expect($el.text()).to.have.string("Apple");
});

test("invokes the onBlur event", () => {
  const handleInputBlur = spy();
  const $el = mount(mockItem());

  // Won't be invoked as there's no `handleInputBlur` event yet.
  $el.find(".ReactTags__tagInputField").simulate("blur");
  expect(handleInputBlur.callCount).to.equal(0);

  // Will be invoked despite the input being empty.
  $el.setProps({ handleInputBlur });
  $el.find(".ReactTags__tagInputField").simulate("blur");
  expect(handleInputBlur.callCount).to.equal(1);
  expect(handleInputBlur.calledWith("")).to.be.true;
  expect($el.find(".ReactTags__tagInputField").get(0).value).to.be.undefined;
});

test("invokes the onFocus event", () => {
  const handleInputFocus = spy();
  const $el = mount(mockItem({ inputValue: "Example" }));

  $el.setProps({ handleInputFocus });
  $el.find(".ReactTags__tagInputField").simulate("focus");
  expect(handleInputFocus.callCount).to.equal(1);
  expect(handleInputFocus.calledWith("Example")).to.be.true;
});

test("invokes the onBlur event when input has value", () => {
  const handleInputBlur = spy();
  const $el = mount(mockItem({ inputValue: "Example" }));

  // Will also be invoked for when the input has a value.
  $el.setProps({ handleInputBlur });
  $el.find(".ReactTags__tagInputField").simulate("blur");
  expect(handleInputBlur.callCount).to.equal(1);
  expect(handleInputBlur.calledWith("Example")).to.be.true;
  expect($el.find(".ReactTags__tagInputField").get(0).value).to.be.undefined;
});

test("should not add new tag on paste event", () => {
  const actual = [];
  const $el = mount(
    mockItem({
      allowAdditionFromPaste: false,
      handleAddition(tag) {
        actual.push(tag);
      },
    })
  );

  const ReactTagsInstance = $el.instance().refs.child;
  const $input = $el.find(".ReactTags__tagInputField");

  $input.simulate("paste", {
    clipboardData: {
      getData: () => "Banana",
    },
  });

  expect(actual).to.have.length(0);
  expect(actual).to.not.have.members(["Banana"]);
});

test("handles the paste event and splits the clipboard on delimiters", () => {
  const Keys = {
    TAB: 9,
    SPACE: 32,
    COMMA: 188,
  };

  const actual = [];
  const $el = mount(
    mockItem({
      delimiters: [Keys.TAB, Keys.SPACE, Keys.COMMA],
      handleAddition(tag) {
        actual.push(tag);
      },
    })
  );

  const ReactTagsInstance = $el.instance().refs.child;
  const $input = $el.find(".ReactTags__tagInputField");

  $input.simulate("paste", {
    clipboardData: {
      getData: () => "Banana,Apple,Apricot\nOrange Blueberry,Pear,Peach\tKiwi",
    },
  });

  expect(actual).to.have.members([
    "Banana",
    "Apple",
    "Apricot\nOrange",
    "Blueberry",
    "Pear",
    "Peach",
    "Kiwi",
  ]);
});

test("should not allow duplicate tags", () => {
  const actual = [];
  const $el = mount(
    mockItem({
      handleAddition(tag) {
        actual.push(tag);
      },
    })
  );

  expect($el.instance().props.tags).to.have.members(defaults.tags);
  const $input = $el.find(".ReactTags__tagInputField");
  $input.simulate("change", { target: { value: "Apple" } });

  $input.simulate("keyDown", { keyCode: ENTER_ARROW_KEY_CODE });
  expect(actual).to.have.length(0);
});

test("should not add empty tag when down arrow is clicked followed by enter key", () => {
  const actual = [];
  const $el = mount(
    mockItem({
      handleAddition(tag) {
        actual.push(tag);
      },
      suggestions: [],
    })
  );

  expect($el.instance().props.tags).to.have.members(defaults.tags);

  const $input = $el.find(".ReactTags__tagInputField");
  $input.simulate("keyDown", { keyCode: DOWN_ARROW_KEY_CODE });
  $input.simulate("keyDown", { keyCode: ENTER_ARROW_KEY_CODE });
  expect(actual).to.have.length(0);
});

describe("autocomplete/suggestions filtering", () => {
  test("updates suggestions state as expected based on default filter logic", () => {
    const $el = mount(mockItem());
    const ReactTagsInstance = $el.instance().getDecoratedComponentInstance();
    const $input = $el.find(".ReactTags__tagInputField");

    expect(ReactTagsInstance.state.suggestions).to.have.members(
      defaults.suggestions
    );

    $input.simulate("change", { target: { value: "ea" } });
    expect(ReactTagsInstance.state.suggestions).to.have.members([]);

    $input.simulate("change", { target: { value: "ap" } });
    expect(ReactTagsInstance.state.suggestions).to.have.members([
      "Apple",
      "Apricot",
    ]);
  });

  test("updates suggestions state as expected based on custom filter logic", () => {
    const $el = mount(
      mockItem({
        handleFilterSuggestions: (query, suggestions) => {
          return suggestions.filter(suggestion => {
            return suggestion.toLowerCase().indexOf(query.toLowerCase()) >= 0;
          });
        },
      })
    );
    const ReactTagsInstance = $el.instance().getDecoratedComponentInstance();
    const $input = $el.find(".ReactTags__tagInputField");

    expect(ReactTagsInstance.state.suggestions).to.have.members(
      defaults.suggestions
    );

    $input.simulate("change", { target: { value: "Ea" } });
    expect(ReactTagsInstance.state.suggestions).to.have.members([
      "Pear",
      "Peach",
    ]);

    $input.simulate("change", { target: { value: "ap" } });
    expect(ReactTagsInstance.state.suggestions).to.have.members([
      "Apple",
      "Apricot",
    ]);
  });

  test("updates selectedIndex state as expected based on changing suggestions", () => {
    const $el = mount(
      mockItem({
        autocomplete: true,
        handleFilterSuggestions: (query, suggestions) => {
          return suggestions.filter(suggestion => {
            return suggestion.toLowerCase().indexOf(query.toLowerCase()) >= 0;
          });
        },
      })
    );
    const ReactTagsInstance = $el.instance().getDecoratedComponentInstance();
    const $input = $el.find(".ReactTags__tagInputField");

    expect(ReactTagsInstance.state.suggestions).to.have.members(
      defaults.suggestions
    );

    $input.simulate("change", { target: { value: "Ea" } });
    $input.simulate("focus");
    $input.simulate("keyDown", { keyCode: DOWN_ARROW_KEY_CODE });
    $input.simulate("keyDown", { keyCode: DOWN_ARROW_KEY_CODE });
    expect(ReactTagsInstance.state.suggestions).to.have.members([
      "Pear",
      "Peach",
    ]);
    expect(ReactTagsInstance.state.selectedIndex).to.equal(1);
    $input.simulate("change", { target: { value: "Each" } });
    expect(ReactTagsInstance.state.suggestions).to.have.members(["Peach"]);
    expect(ReactTagsInstance.state.selectedIndex).to.equal(0);
  });

  test("selects the correct suggestion using the keyboard when minQueryLength is set to 0", function() {
    let actual = [];
    const $el = mount(
      mockItem({
        query: "",
        minQueryLength: 0,
        handleAddition(tag) {
          actual.push(tag);
        },
      })
    );
    const $input = $el.find(".ReactTags__tagInputField");

    $input.simulate("keyDown", { keyCode: DOWN_ARROW_KEY_CODE });
    $input.simulate("keyDown", { keyCode: DOWN_ARROW_KEY_CODE });
    $input.simulate("keyDown", { keyCode: DOWN_ARROW_KEY_CODE });
    $input.simulate("keyDown", { keyCode: ENTER_ARROW_KEY_CODE });
    expect(actual).to.have.members(["Apricot"]);

    $el.unmount();
  });
});
