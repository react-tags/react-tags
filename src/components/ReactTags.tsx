import React, { Component, ReactNode, createRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import uniq from 'lodash/uniq';
import ClearAllTags from './ClearAllTags';
import Suggestions from './Suggestions';
import ClassNames from 'classnames';
import { SingleTag } from './Tag';
import type { Tag } from './Tag';

import { buildRegExpFromDelimiters } from './utils';

//Constants
import {
  KEYS,
  DEFAULT_PLACEHOLDER,
  DEFAULT_CLASSNAMES,
  DEFAULT_LABEL_FIELD,
  INPUT_FIELD_POSITIONS,
  ERRORS,
} from './constants';

interface ReactTagsProps {
  placeholder: string;
  labelField: string;
  suggestions: Array<Tag>;
  delimiters: Array<number>;
  autofocus: boolean;
  readonly: boolean;
  inline: boolean;
  inputFieldPosition: string;
  handleDelete: (
    i: number,
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => void;
  handleAddition: (tag: { id: string }) => void;
  onTagUpdate: (i: number, tag: { id: string }) => void;
  handleDrag: (tag: { id: string }, currPos: number, newPos: number) => void;
  handleFilterSuggestions: (
    query: string,
    suggestions: Array<Tag>
  ) => Array<Tag>;
  handleTagClick: (
    i: number,
    e: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) => void;
  allowDeleteFromEmptyInput: boolean;
  allowAdditionFromPaste: boolean;
  allowDragDrop: boolean;
  handleInputChange: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleInputFocus: (
    value: string,
    e: React.FocusEvent<HTMLInputElement>
  ) => void;
  handleInputBlur: (
    value: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => void;
  minQueryLength: number;
  shouldRenderSuggestions: (query: string) => boolean;
  removeComponent: React.ComponentType<any>;
  autocomplete: boolean | number;
  readOnly: boolean;
  classNames: {
    root: string;
    rootFocused: string;
    selected: string;
    selectedTag: string;
    selectedTagName: string;
    search: string;
    searchInput: string;
    suggestions: string;
    suggestionActive: string;
    suggestionDisabled: string;
  };
  name: string;
  id: string;
  maxLength: number;
  inputValue: string;
  maxTags: number;
  tags: Array<Tag>;
  allowUnique: boolean;
  renderSuggestion: (item: Tag, query: string) => ReactNode;
  inputProps: { [key: string]: string };
  editable: boolean;
  clearAll: boolean;
  onClearAll: () => void;
}

interface ReactTagsState {
  suggestions: Array<Tag>;
  query: string;
  isFocused: boolean;
  selectedIndex: number;
  selectionMode: boolean;
  ariaLiveStatus: string;
  currentEditIndex: number;
  error: string;
}

class ReactTags extends Component<ReactTagsProps, ReactTagsState> {
  static defaultProps = {
    placeholder: DEFAULT_PLACEHOLDER,
    labelField: DEFAULT_LABEL_FIELD,
    suggestions: [],
    delimiters: [...KEYS.ENTER, KEYS.TAB],
    autofocus: true,
    inline: true, // TODO: Remove in v7.x.x
    inputFieldPosition: INPUT_FIELD_POSITIONS.INLINE,
    handleDelete: noop,
    handleAddition: noop,
    allowDeleteFromEmptyInput: true,
    allowAdditionFromPaste: true,
    autocomplete: false,
    readOnly: false,
    allowUnique: true,
    allowDragDrop: true,
    tags: [],
    inputProps: {},
    onTagUpdate: noop,
    editable: false,
    clearAll: false,
    handleClearAll: noop,
  };

  private textInput: HTMLInputElement | null = null;
  private tagInput: HTMLInputElement | null = null;
  private reactTagsRef: React.RefObject<HTMLDivElement> | null = null;

  constructor(props: ReactTagsProps) {
    super(props);

    if (!props.inline) {
      console.warn(
        '[Deprecation] The inline attribute is deprecated and will be removed in v7.x.x, please use inputFieldPosition instead.'
      );
    }

    const { suggestions } = props;
    this.state = {
      suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false,
      ariaLiveStatus: '',
      currentEditIndex: -1,
      error: '',
    };
    this.reactTagsRef = createRef<HTMLDivElement>();
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.moveTag = this.moveTag.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleSuggestionHover = this.handleSuggestionHover.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
  }

  componentDidMount() {
    const { autofocus, readOnly } = this.props;

    if (autofocus && !readOnly) {
      this.resetAndFocusInput();
    }
  }

  componentDidUpdate(prevProps: ReactTagsProps) {
    if (!isEqual(prevProps.suggestions, this.props.suggestions)) {
      this.updateSuggestions();
    }
  }

  filteredSuggestions = (query: string) => {
    let { suggestions } = this.props;
    if (this.props.allowUnique) {
      const existingTags = this.props.tags.map((tag) =>
        tag.id.trim().toLowerCase()
      );
      suggestions = suggestions.filter(
        (suggestion) => !existingTags.includes(suggestion.id.toLowerCase())
      );
    }
    if (this.props.handleFilterSuggestions) {
      return this.props.handleFilterSuggestions(query, suggestions);
    }

    const exactSuggestions = suggestions.filter((item) => {
      return this.getQueryIndex(query, item) === 0;
    });
    const partialSuggestions = suggestions.filter((item) => {
      return this.getQueryIndex(query, item) > 0;
    });
    return exactSuggestions.concat(partialSuggestions);
  };

  getQueryIndex = (query: string, item: { [key: string]: string }) => {
    return item[this.props.labelField]
      .toLowerCase()
      .indexOf(query.toLowerCase());
  };

  resetAndFocusInput = () => {
    this.setState({ query: '' });
    if (this.textInput) {
      this.textInput.value = '';
      this.textInput.focus();
    }
  };

  handleDelete(
    index: number,
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) {
    event.preventDefault();
    event.stopPropagation();
    const currentTags = this.props.tags.slice();
    // Early exit from the function if the array
    // is already empty
    if (currentTags.length === 0 || !this.reactTagsRef?.current) {
      return;
    }
    this.setState({ error: '' });
    let ariaLiveStatus = `Tag at index ${index} with value ${currentTags[index].id} deleted.`;
    this.props.handleDelete(index, event);
    const allTags: NodeListOf<HTMLButtonElement> =
      this.reactTagsRef.current.querySelectorAll('.ReactTags__remove');

    let nextElementToFocus: HTMLButtonElement | HTMLInputElement | null;
    let nextIndex: number;
    let nextTag: { id: string; [key: string]: string };

    if (index === 0 && currentTags.length > 1) {
      nextElementToFocus = allTags[0];
      nextIndex = 0;
      nextTag = currentTags[1];
    } else {
      nextElementToFocus = allTags[index - 1];
      nextIndex = index - 1;
      nextTag = currentTags[nextIndex];
    }
    if (!nextElementToFocus) {
      nextIndex = -1;
      nextElementToFocus = this.textInput;
    }
    if (nextIndex >= 0) {
      ariaLiveStatus += ` Tag at index ${nextIndex} with value ${nextTag.id} focussed. Press backspace to remove`;
    } else {
      ariaLiveStatus += 'Input focussed. Press enter to add a new tag';
    }
    nextElementToFocus?.focus();
    this.setState({
      ariaLiveStatus,
    });
  }

  handleTagClick(
    i: number,
    tag: Tag,
    event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) {
    const { editable, handleTagClick, labelField } = this.props;
    if (editable) {
      this.setState({ currentEditIndex: i, query: tag[labelField] }, () => {
        this.tagInput?.focus();
      });
    }
    if (handleTagClick) {
      handleTagClick(i, event);
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.handleInputChange) {
      this.props.handleInputChange(event.target.value, event);
    }

    const query = event.target.value.trim();

    this.setState({ query }, this.updateSuggestions);
  }

  updateSuggestions = () => {
    const { query, selectedIndex } = this.state;
    const suggestions = this.filteredSuggestions(query);

    this.setState({
      suggestions: suggestions,
      selectedIndex:
        selectedIndex >= suggestions.length
          ? suggestions.length - 1
          : selectedIndex,
    });
  };

  handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (this.props.handleInputFocus) {
      this.props.handleInputFocus(value, event);
    }
    this.setState({ isFocused: true });
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (this.props.handleInputBlur) {
      this.props.handleInputBlur(value, event);
      if (this.textInput) {
        this.textInput.value = '';
      }
    }
    this.setState({ isFocused: false, currentEditIndex: -1 });
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const { query, selectedIndex, suggestions, selectionMode } = this.state;

    // hide suggestions menu on escape
    if (event.keyCode === KEYS.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        selectedIndex: -1,
        selectionMode: false,
        suggestions: [],
        currentEditIndex: -1,
      });
    }

    // When one of the terminating keys is pressed, add current query to the tags.
    // If no text is typed in so far, ignore the action - so we don't end up with a terminating
    // character typed in.
    if (
      this.props.delimiters.indexOf(event.keyCode) !== -1 &&
      !event.shiftKey
    ) {
      if (event.keyCode !== KEYS.TAB || query !== '') {
        event.preventDefault();
      }

      const selectedQuery =
        selectionMode && selectedIndex !== -1
          ? suggestions[selectedIndex]
          : {
              id: query.trim(),
              [this.props.labelField]: query.trim(),
              className: '',
            };

      if (Object.keys(selectedQuery)) {
        this.addTag(selectedQuery);
      }
    }

    // when backspace key is pressed and query is blank, delete tag
    if (
      event.keyCode === KEYS.BACKSPACE &&
      query === '' &&
      this.props.allowDeleteFromEmptyInput
    ) {
      this.handleDelete(this.props.tags.length - 1, event);
    }

    // up arrow
    if (event.keyCode === KEYS.UP_ARROW) {
      event.preventDefault();
      this.setState({
        selectedIndex:
          selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1,
        selectionMode: true,
      });
    }

    // down arrow
    if (event.keyCode === KEYS.DOWN_ARROW) {
      event.preventDefault();
      this.setState({
        selectedIndex:
          suggestions.length === 0
            ? -1
            : (selectedIndex + 1) % suggestions.length,
        selectionMode: true,
      });
    }
  }

  tagLimitReached() {
    const { tags, maxTags } = this.props;
    return maxTags && tags.length >= maxTags;
  }

  handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    if (!this.props.allowAdditionFromPaste) {
      return;
    }

    if (this.tagLimitReached()) {
      this.setState({ error: ERRORS.TAG_LIMIT });
      this.resetAndFocusInput();
      return;
    }

    this.setState({ error: '' });

    event.preventDefault();

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const clipboardText = clipboardData.getData('text');

    const { maxLength = clipboardText.length } = this.props;

    const maxTextLength = Math.min(maxLength, clipboardText.length);
    const pastedText = clipboardData.getData('text').substr(0, maxTextLength);

    // Used to determine how the pasted content is split.
    const delimiterRegExp = buildRegExpFromDelimiters(this.props.delimiters);
    const tags = pastedText.split(delimiterRegExp).map((tag) => tag.trim());

    // Only add unique tags
    uniq(tags).forEach((tag) =>
      this.addTag({
        id: tag.trim(),
        [this.props.labelField]: tag.trim(),
        className: '',
      })
    );
  }

  addTag = (tag: Tag) => {
    const { tags, labelField, allowUnique } = this.props;
    const { currentEditIndex } = this.state;
    if (!tag.id || !tag[labelField]) {
      return;
    }

    if (currentEditIndex === -1) {
      if (this.tagLimitReached()) {
        this.setState({ error: ERRORS.TAG_LIMIT });
        this.resetAndFocusInput();
        return;
      }
      this.setState({ error: '' });
    }

    const existingKeys = tags.map((tag) => tag.id.toLowerCase());

    // Return if tag has been already added
    if (allowUnique && existingKeys.indexOf(tag.id.trim().toLowerCase()) >= 0) {
      return;
    }
    if (this.props.autocomplete) {
      const possibleMatches = this.filteredSuggestions(tag[labelField]);

      if (
        (this.props.autocomplete === 1 && possibleMatches.length === 1) ||
        (this.props.autocomplete === true && possibleMatches.length)
      ) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    if (currentEditIndex !== -1 && this.props.onTagUpdate)
      this.props.onTagUpdate(currentEditIndex, tag);
    else this.props.handleAddition(tag);

    // reset the state
    this.setState({
      query: '',
      selectionMode: false,
      selectedIndex: -1,
      currentEditIndex: -1,
    });

    this.resetAndFocusInput();
  };

  handleSuggestionClick(index: number) {
    this.addTag(this.state.suggestions[index]);
  }

  clearAll = () => {
    if (this.props.onClearAll) {
      this.props.onClearAll();
    }
    this.setState({ error: '' });
  };

  handleSuggestionHover(index: number) {
    this.setState({
      selectedIndex: index,
      selectionMode: true,
    });
  }

  moveTag(dragIndex: number, hoverIndex: number) {
    const tags = this.props.tags;

    // locate tags
    const dragTag = tags[dragIndex];

    // call handler with the index of the dragged tag
    // and the tag that is hovered
    this.props.handleDrag(dragTag, dragIndex, hoverIndex);
  }

  getTagItems = () => {
    const { tags, labelField, removeComponent, readOnly, allowDragDrop } =
      this.props;
    const classNames = { ...DEFAULT_CLASSNAMES, ...this.props.classNames };

    const { currentEditIndex, query } = this.state;
    const moveTag = allowDragDrop ? this.moveTag : undefined;
    return tags.map((tag, index) => {
      return (
        <React.Fragment key={index}>
          {currentEditIndex === index ? (
            <div className={classNames.editTagInput}>
              <input
                ref={(input: HTMLInputElement) => {
                  this.tagInput = input;
                }}
                onFocus={this.handleFocus}
                value={query}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
                className={classNames.editTagInputField}
                onPaste={this.handlePaste}
                data-testid="tag-edit"
              />
            </div>
          ) : (
            <SingleTag
              index={index}
              tag={tag}
              labelField={labelField}
              onDelete={(
                event:
                  | React.MouseEvent<HTMLSpanElement>
                  | React.KeyboardEvent<HTMLSpanElement>
              ) => this.handleDelete(index, event)}
              moveTag={moveTag}
              removeComponent={removeComponent}
              onTagClicked={(
                event:
                  | React.MouseEvent<HTMLSpanElement>
                  | React.TouchEvent<HTMLSpanElement>
              ) => this.handleTagClick(index, tag, event)}
              readOnly={readOnly}
              classNames={classNames}
              allowDragDrop={allowDragDrop}
            />
          )}
        </React.Fragment>
      );
    });
  };

  render() {
    const tagItems = this.getTagItems();
    const classNames = { ...DEFAULT_CLASSNAMES, ...this.props.classNames };

    // get the suggestions for the given query
    const query = this.state.query.trim(),
      selectedIndex = this.state.selectedIndex,
      suggestions = this.state.suggestions,
      error = this.state.error;

    const {
      placeholder,
      name: inputName,
      id: inputId,
      maxLength,
      inline,
      inputFieldPosition,
      inputValue,
      inputProps,
      clearAll,
      tags,
    } = this.props;

    const position = !inline
      ? INPUT_FIELD_POSITIONS.BOTTOM
      : inputFieldPosition;

    const tagInput = !this.props.readOnly ? (
      <div className={classNames.tagInput}>
        <input
          {...inputProps}
          ref={(input) => {
            this.textInput = input;
          }}
          className={classNames.tagInputField}
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
          data-automation="input"
          data-testid="input"
        />

        <Suggestions
          query={query}
          suggestions={suggestions}
          labelField={this.props.labelField}
          selectedIndex={selectedIndex}
          handleClick={this.handleSuggestionClick}
          handleHover={this.handleSuggestionHover}
          minQueryLength={this.props.minQueryLength}
          shouldRenderSuggestions={this.props.shouldRenderSuggestions}
          isFocused={this.state.isFocused}
          classNames={classNames}
          renderSuggestion={this.props.renderSuggestion}
        />
        {clearAll && tags.length > 0 && (
          <ClearAllTags classNames={classNames} onClick={this.clearAll} />
        )}
        {error && (
          <div data-testid="error" className="ReactTags__error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="24"
              width="24"
              fill="#e03131">
              <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
            </svg>
            {error}
          </div>
        )}
      </div>
    ) : null;

    return (
      <div
        className={ClassNames(classNames.tags, 'react-tags-wrapper')}
        ref={this.reactTagsRef}>
        <p
          role="alert"
          className="sr-only"
          style={{
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            margin: '-1px',
            padding: 0,
            width: '1px',
            height: '1px',
            border: 0,
          }}>
          {this.state.ariaLiveStatus}
        </p>
        {position === INPUT_FIELD_POSITIONS.TOP && tagInput}
        <div className={classNames.selected}>
          {tagItems}
          {position === INPUT_FIELD_POSITIONS.INLINE && tagInput}
        </div>
        {position === INPUT_FIELD_POSITIONS.BOTTOM && tagInput}
      </div>
    );
  }
}

const WithContext = ({ ...props }: ReactTagsProps) => (
  // @ts-ignore
  <DndProvider backend={HTML5Backend}>
    <ReactTags {...props} />
  </DndProvider>
);
export { WithContext };
export { ReactTags as WithOutContext };
export { KEYS };
