import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { noop, uniq } from 'lodash';
import Suggestions from './Suggestions';
import PropTypes from 'prop-types';
import Tag from './Tag';
import { buildRegExpFromDelimiters } from './utils';
//Constants
import { DEFAULT_CLASSNAMES, DEFAULT_PLACEHOLDER, KEYS } from './constants';

class ReactTags extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    labelField: PropTypes.string,
    suggestions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    delimiters: PropTypes.arrayOf(PropTypes.number),
    autofocus: PropTypes.bool,
    inline: PropTypes.bool,
    handleDelete: PropTypes.func,
    handleAddition: PropTypes.func,
    handleDrag: PropTypes.func,
    handleFilterSuggestions: PropTypes.func,
    handleTagClick: PropTypes.func,
    allowDeleteFromEmptyInput: PropTypes.bool,
    allowAdditionFromPaste: PropTypes.bool,
    resetInputOnDelete: PropTypes.bool,
    handleInputChange: PropTypes.func,
    handleInputFocus: PropTypes.func,
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
    inputValue: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.any.isRequired,
      })
    ),
    renderTag: PropTypes.func,
    renderSuggestions: PropTypes.func,
  };

  static defaultProps = {
    placeholder: DEFAULT_PLACEHOLDER,
    suggestions: [],
    delimiters: [KEYS.ENTER, KEYS.TAB],
    autofocus: true,
    inline: true,
    handleDelete: noop,
    handleAddition: noop,
    allowDeleteFromEmptyInput: true,
    allowAdditionFromPaste: true,
    resetInputOnDelete: true,
    autocomplete: false,
    readOnly: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      suggestions: this.props.suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false,
    };

    this.handleFocus = this.handleFocus.bind(this);
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
      classNames: { ...DEFAULT_CLASSNAMES, ...this.props.classNames },
    });
  }

  resetAndFocusInput() {
    this.setState({ query: '' });

    if (this.textInput) {
      this.textInput.value = '';
      this.textInput.focus();
    }
  }

  componentDidMount() {
    const { autofocus, readOnly } = this.props;

    if (autofocus && !readOnly) {
      this.resetAndFocusInput();
    }
  }

  filteredSuggestions(query, suggestions) {
    const { handleFilterSuggestions } = this.props;

    if (handleFilterSuggestions) {
      return handleFilterSuggestions(query, suggestions);
    }

    return suggestions.filter(function(item) {
      return item.text.toLowerCase().indexOf(query.toLowerCase()) === 0;
    });
  }

  componentWillReceiveProps(props) {
    const suggestions = this.filteredSuggestions(
      this.state.query,
      props.suggestions
    );

    this.setState({
      suggestions,
      classNames: { ...DEFAULT_CLASSNAMES, ...props.classNames },
    });
  }

  handleDelete(i, e) {
    this.props.handleDelete(i, e);

    this.resetInput();

    e.stopPropagation();
  }

  handleTagClick(i, e) {
    const { handleTagClick } = this.props;

    if (handleTagClick) {
      handleTagClick(i, e);
    }

    this.resetInput();
  }

  resetInput = () => {
    const { resetInputOnDelete } = this.props;

    if (!resetInputOnDelete) {
      this.textInput && this.textInput.focus();
    } else {
      this.resetAndFocusInput();
    }
  };

  handleChange(e) {
    const { handleInputChange, suggestions } = this.props;

    if (handleInputChange) {
      handleInputChange(e.target.value.trim());
    }

    const query = e.target.value.trim();
    const filteredSuggestions = this.filteredSuggestions(query, suggestions);

    const { selectedIndex } = this.state;

    this.setState({
      query: query,
      suggestions: filteredSuggestions,
      selectedIndex:
        selectedIndex >= filteredSuggestions.length
          ? filteredSuggestions.length - 1
          : selectedIndex,
    });
  }

  handleFocus(e) {
    const { handleInputFocus } = this.props;
    const value = e.target.value.trim();

    if (handleInputFocus) {
      handleInputFocus(value);
    }

    this.setState({ isFocused: true });
  }

  handleBlur(e) {
    const { handleInputBlur } = this.props;
    const value = e.target.value.trim();

    if (handleInputBlur) {
      handleInputBlur(value);
      if (this.textInput) {
        this.textInput.value = '';
      }
    }

    this.setState({ isFocused: false });
  }

  handleKeyDown(e) {
    const { allowDeleteFromEmptyInput, delimiters, tags } = this.props;
    const { query, selectedIndex, suggestions, selectionMode } = this.state;

    // hide suggestions menu on escape
    if (e.keyCode === KEYS.ESCAPE) {
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
    if (delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
      if (e.keyCode !== KEYS.TAB || query !== '') {
        e.preventDefault();
      }

      const selectedQuery =
        selectionMode && selectedIndex !== -1
          ? suggestions[selectedIndex]
          : { id: query, text: query };

      if (selectedQuery !== '') {
        this.addTag(selectedQuery);
      }
    }

    // when backspace key is pressed and query is blank, delete tag
    if (
      e.keyCode === KEYS.BACKSPACE &&
      query === '' &&
      allowDeleteFromEmptyInput
    ) {
      this.handleDelete(tags.length - 1, e);
    }

    // up arrow
    if (e.keyCode === KEYS.UP_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex:
          selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1,
        selectionMode: true,
      });
    }

    // down arrow
    if (e.keyCode === KEYS.DOWN_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex:
          suggestions.length === 0
            ? -1
            : (selectedIndex + 1) % suggestions.length,
        selectionMode: true,
      });
    }
  }

  handlePaste(e) {
    const { allowAdditionFromPaste, delimiters } = this.props;

    if (!allowAdditionFromPaste) {
      return;
    }

    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');

    // Used to determine how the pasted content is split.
    const delimiterRegExp = buildRegExpFromDelimiters(delimiters);
    const tags = pastedText.split(delimiterRegExp);

    // Only add unique tags
    uniq(tags).forEach((tag) => this.addTag({ id: tag, text: tag }));
  }

  addTag(tag) {
    if (!tag.id && !tag.text) {
      return;
    }

    const { autocomplete, handleAddition, suggestions, tags } = this.props;
    const existingKeys = tags.map((tag) => tag.id.toLowerCase());

    // Return if tag has been already added
    if (existingKeys.indexOf(tag.id.toLowerCase()) >= 0) {
      return;
    }

    if (autocomplete) {
      const possibleMatches = this.filteredSuggestions(tag, suggestions);

      if (
        (autocomplete === 1 && possibleMatches.length === 1) ||
        (autocomplete === true && possibleMatches.length)
      ) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    handleAddition(tag);

    // reset the state
    this.setState({
      query: '',
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
    const { handleDrag, tags } = this.props;

    // locate tags
    const dragTag = tags[dragIndex];

    // call handler with the index of the dragged tag
    // and the tag that is hovered
    handleDrag(dragTag, dragIndex, hoverIndex);
  }

  getTagItems = () => {
    const {
      tags,
      labelField,
      removeComponent,
      readOnly,
      handleDrag,
      renderTag,
    } = this.props;
    const { classNames } = this.state;
    const moveTag = handleDrag ? this.moveTag : null;

    return tags.map((tag, index) => {
      return (
        <Tag
          key={tag.id}
          index={index}
          tag={tag}
          labelField={labelField}
          onDelete={this.handleDelete.bind(this, index)}
          moveTag={moveTag}
          removeComponent={removeComponent}
          onTagClicked={this.handleTagClick.bind(this, index)}
          readOnly={readOnly}
          classNames={classNames}
          renderTag={renderTag}
        />
      );
    });
  };

  render() {
    const {
      id: inputId,
      inline,
      inputValue,
      maxLength,
      minQueryLength,
      name: inputName,
      placeholder,
      readOnly,
      shouldRenderSuggestions,
      renderSuggestions,
    } = this.props;
    const {
      classNames,
      isFocused,
      query,
      selectedIndex,
      suggestions,
    } = this.state;
    const { selected, tagInput, tagInputField, tags } = classNames;
    const tagItems = this.getTagItems();

    const tagInputElement = !readOnly ? (
      <div className={tagInput}>
        <input
          ref={(input) => {
            this.textInput = input;
          }}
          className={tagInputField}
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onPaste={this.handlePaste}
          name={inputName}
          id={inputId}
          maxLength={maxLength}
          value={inputValue}
        />

        <Suggestions
          query={query.trim()}
          suggestions={suggestions}
          renderSuggestions={renderSuggestions}
          selectedIndex={selectedIndex}
          handleClick={this.handleSuggestionClick}
          handleHover={this.handleSuggestionHover}
          minQueryLength={minQueryLength}
          shouldRenderSuggestions={shouldRenderSuggestions}
          isFocused={isFocused}
          classNames={classNames}
        />
      </div>
    ) : null;

    return (
      <div className={tags}>
        <div className={selected}>
          {tagItems}
          {inline && tagInputElement}
        </div>
        {!inline && tagInputElement}
      </div>
    );
  }
}

module.exports = {
  WithContext: DragDropContext(HTML5Backend)(ReactTags),
  WithOutContext: ReactTags,
  KEYS: KEYS,
};
