import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Suggestions from "./Suggestions";
import PropTypes from "prop-types";
import Tag from "./Tag";

// Constants
const Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27,
};

const DEFAULT_PLACEHOLDER = "Add new tag";

const DefaultClassNames = {
  tags: "ReactTags__tags",
  tagInput: "ReactTags__tagInput",
  tagInputField: "ReactTags__tagInputField",
  selected: "ReactTags__selected",
  tag: "ReactTags__tag",
  remove: "ReactTags__remove",
  suggestions: "ReactTags__suggestions",
  activeSuggestion: "ReactTags__activeSuggestion",
};

class ReactTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: this.props.suggestions,
      query: "",
      selectedIndex: -1,
      selectionMode: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.moveTag = this.moveTag.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.resetAndFocusInput = this.resetAndFocusInput.bind(this);
    this.handleSuggestionHover = this.handleSuggestionHover.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      classNames: { ...DefaultClassNames, ...this.props.classNames },
    });
  }

  resetAndFocusInput() {
    this.textInput.value = "";
    this.textInput.focus();
  }

  componentDidMount() {
    const { autofocus, readOnly } = this.props;
    if (autofocus && !readOnly) {
      this.resetAndFocusInput();
    }
  }

  filteredSuggestions(query, suggestions) {
    if (this.props.handleFilterSuggestions) {
      return this.props.handleFilterSuggestions(query, suggestions);
    }

    return suggestions.filter(function(item) {
      return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
    });
  }

  componentWillReceiveProps(props) {
    const suggestions = this.filteredSuggestions(
      this.state.query,
      props.suggestions
    );
    this.setState({
      suggestions: suggestions,
      classNames: { ...DefaultClassNames, ...props.classNames },
    });
  }

  handleDelete(i, e) {
    this.props.handleDelete(i);
    this.setState({ query: "" });
    this.resetAndFocusInput();
  }

  handleChange(e) {
    if (this.props.handleInputChange) {
      this.props.handleInputChange(e.target.value.trim());
    }

    const query = e.target.value.trim();
    const suggestions = this.filteredSuggestions(query, this.props.suggestions);

    let selectedIndex = this.state.selectedIndex;
    if (selectedIndex >= suggestions.length) {
      selectedIndex = suggestions.length - 1;
    }

    this.setState({
      query: query,
      suggestions: suggestions,
      selectedIndex: selectedIndex,
    });
  }

  handleBlur(e) {
    const value = e.target.value.trim();
    if (this.props.handleInputBlur) {
      this.props.handleInputBlur(value);
      this.textInput.value = "";
    }
  }

  handleKeyDown(e) {
    let { query, selectedIndex, suggestions } = this.state;

    // hide suggestions menu on escape
    if (e.keyCode === Keys.ESCAPE) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        selectedIndex: -1,
        selectionMode: false,
        suggestions: [],
      });
    }

    // When one of the terminating keys is pressed, add current query to the tags.
    // If no text is typed in so far, ignore the action - so we don't end up with a terminating
    // character typed in.
    if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
      if (e.keyCode !== Keys.TAB || query !== "") {
        e.preventDefault();
      }

      if (query !== "") {
        if (this.state.selectionMode && this.state.selectedIndex != -1) {
          query = this.state.suggestions[this.state.selectedIndex];
        }
        this.addTag(query);
      }
    }

    // when backspace key is pressed and query is blank, delete tag
    if (
      e.keyCode === Keys.BACKSPACE &&
      query == "" &&
      this.props.allowDeleteFromEmptyInput
    ) {
      this.handleDelete(this.props.tags.length - 1);
    }

    // up arrow
    if (e.keyCode === Keys.UP_ARROW) {
      e.preventDefault();

      let { selectedIndex, suggestions } = this.state;

      selectedIndex = selectedIndex <= 0
        ? suggestions.length - 1
        : selectedIndex - 1;

      this.setState({
        selectedIndex: selectedIndex,
        selectionMode: true,
      });
    }

    // down arrow
    if (e.keyCode === Keys.DOWN_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
        selectionMode: true,
      });
    }
  }

  handlePaste(e) {
    e.preventDefault();

    // See: http://stackoverflow.com/a/6969486/1463681
    const escapeRegex = str =>
      str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    // Used to determine how the pasted content is split.
    const delimiterChars = escapeRegex(
      this.props.delimiters
        .map(delimiter => {
          // See: http://stackoverflow.com/a/34711175/1463681
          const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
          return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
        })
        .join("")
    );

    const clipboardData = e.clipboardData || window.clipboardData;
    const string = clipboardData.getData("text");
    const regExp = new RegExp(`[${delimiterChars}]+`);
    string.split(regExp).forEach(tag => this.props.handleAddition(tag));
  }

  addTag(tag) {
    if (this.props.autocomplete) {
      const possibleMatches = this.filteredSuggestions(
        tag,
        this.props.suggestions
      );

      if (
        (this.props.autocomplete === 1 && possibleMatches.length === 1) ||
        (this.props.autocomplete === true && possibleMatches.length)
      ) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    this.props.handleAddition(tag);

    // reset the state
    this.setState({
      query: "",
      selectionMode: false,
      selectedIndex: -1,
    });

    this.resetAndFocusInput();
  }

  handleSuggestionClick(i, e) {
    this.addTag(this.state.suggestions[i]);
  }

  handleSuggestionHover(i, e) {
    this.setState({
      selectedIndex: i,
      selectionMode: true,
    });
  }

  moveTag(dragIndex, hoverIndex) {
    const tags = this.props.tags;

    // locate tags
    const dragTag = tags[dragIndex];

    // call handler with the index of the dragged tag
    // and the tag that is hovered
    this.props.handleDrag(dragTag, dragIndex, hoverIndex);
  }

  render() {
    const moveTag = this.props.handleDrag ? this.moveTag : null;

    const tagItems = this.props.tags.map(
      function(tag, i) {
        return (
          <Tag
            key={tag.id}
            index={i}
            tag={tag}
            labelField={this.props.labelField}
            onDelete={this.handleDelete.bind(this, i)}
            moveTag={moveTag}
            removeComponent={this.props.removeComponent}
            readOnly={this.props.readOnly}
            classNames={this.state.classNames}
          />
        );
      }.bind(this)
    );

    // get the suggestions for the given query
    const query = this.state.query.trim(),
      selectedIndex = this.state.selectedIndex,
      suggestions = this.state.suggestions,
      placeholder = this.props.placeholder,
      inputName = this.props.name,
      inputId = this.props.id,
      maxLength = this.props.maxLength;

    const tagInput = !this.props.readOnly
      ? <div className={this.state.classNames.tagInput}>
          <input
            ref={input => {
              this.textInput = input;
            }}
            className={this.state.classNames.tagInputField}
            type="text"
            placeholder={placeholder}
            aria-label={placeholder}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onPaste={this.handlePaste}
            name={inputName}
            id={inputId}
            maxLength={maxLength}
          />

          <Suggestions
            query={query}
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            handleClick={this.handleSuggestionClick}
            handleHover={this.handleSuggestionHover}
            minQueryLength={this.props.minQueryLength}
            shouldRenderSuggestions={this.props.shouldRenderSuggestions}
            classNames={this.state.classNames}
          />
        </div>
      : null;

    return (
      <div className={this.state.classNames.tags}>
        <div className={this.state.classNames.selected}>
          {tagItems}
          {this.props.inline && tagInput}
        </div>
        {!this.props.inline && tagInput}
      </div>
    );
  }
}

ReactTags.PropTypes = {
  placeholder: PropTypes.string,
  labelField: PropTypes.string,
  suggestions: PropTypes.array,
  delimiters: PropTypes.array,
  autofocus: PropTypes.bool,
  inline: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
  handleAddition: PropTypes.func.isRequired,
  handleDrag: PropTypes.func,
  handleFilterSuggestions: PropTypes.func,
  allowDeleteFromEmptyInput: PropTypes.bool,
  handleInputChange: PropTypes.func,
  handleInputBlur: PropTypes.func,
  minQueryLength: PropTypes.number,
  shouldRenderSuggestions: PropTypes.func,
  removeComponent: PropTypes.func,
  autocomplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  readOnly: PropTypes.bool,
  classNames: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.string,
};

ReactTags.defaultProps = {
  placeholder: DEFAULT_PLACEHOLDER,
  tags: [],
  suggestions: [],
  delimiters: [Keys.ENTER, Keys.TAB],
  autofocus: true,
  inline: true,
  allowDeleteFromEmptyInput: true,
  minQueryLength: 2,
  autocomplete: false,
  readOnly: false,
};

module.exports = {
  WithContext: DragDropContext(HTML5Backend)(ReactTags),
  WithOutContext: ReactTags,
  Keys: Keys,
};
