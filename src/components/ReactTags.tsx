import React, {
  useEffect,
  ReactNode,
  createRef,
  useRef,
  useState,
  Fragment,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import noop from 'lodash/noop';
import uniq from 'lodash/uniq';
import ClearAllTags from './ClearAllTags';
import Suggestions from './Suggestions';
import ClassNames from 'classnames';
import { SingleTag } from './SingleTag';
import type { Tag } from './SingleTag';

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

/**
 * Props for the ReactTags component.
 */
interface ReactTagsProps {
  /**
   * Placeholder text for the input field.
   */
  placeholder: string;
  /**
   * Field name to use for the label of each tag.
   */
  labelField: string;
  /**
   * Array of suggestions to display in the dropdown.
   */
  suggestions: Array<Tag>;
  /**
   * Array of key codes that will trigger a tag addition.
   */
  delimiters: Array<number>;
  /**
   * Whether the input field should automatically focus on mount.
   */
  autofocus: boolean;
  /**
   * Whether the input field should automatically focus on mount.
   */
  autoFocus: boolean;
  /**
   * Whether the input field should be read-only.
   */
  readOnly: boolean;
  /**
   * Whether the input field should be displayed inline.
   * TODO: Remove in v7.x.x
   */
  inline: boolean;
  /**
   * Position of the input field relative to the tags.
   */
  inputFieldPosition: keyof typeof INPUT_FIELD_POSITIONS;
  /**
   * Handler for tag deletion.
   */
  handleDelete: (
    i: number,
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => void;
  /**
   * Handler for tag addition.
   */
  handleAddition: (tag: { id: string }) => void;
  /**
   * Handler for tag updates.
   */
  onTagUpdate: (i: number, tag: { id: string }) => void;
  /**
   * Handler for tag drag and drop.
   */
  handleDrag: (tag: { id: string }, currPos: number, newPos: number) => void;
  /**
   * Handler for filtering suggestions.
   */
  handleFilterSuggestions: (
    query: string,
    suggestions: Array<Tag>
  ) => Array<Tag>;
  /**
   * Handler for tag click events.
   */
  handleTagClick?: (
    i: number,
    e: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) => void;
  /**
   * Whether to allow deletion from an empty input field.
   */
  allowDeleteFromEmptyInput: boolean;
  /**
   * Whether to allow addition from pasted text.
   */
  allowAdditionFromPaste: boolean;
  /**
   * Whether to allow drag and drop of tags.
   */
  allowDragDrop: boolean;
  /**
   * Handler for input field changes.
   */
  handleInputChange: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /**
   * Handler for input field focus events.
   */
  handleInputFocus: (
    value: string,
    e: React.FocusEvent<HTMLInputElement>
  ) => void;
  /**
   * Handler for input field blur events.
   */
  handleInputBlur: (
    value: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => void;
  /**
   * Minimum length of the query to trigger suggestions.
   */
  minQueryLength: number;
  /**
   * Function to determine whether to render suggestions.
   */
  shouldRenderSuggestions: (query: string) => boolean;
  /**
   * Component to be rendered for removing tags.
   */
  removeComponent: React.ComponentType<any>;
  /**
   * Whether to enable autocomplete when typing for suggestions
   */
  autocomplete: boolean | number;
  /**
   * CSS class names for the component.
   */
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
  /**
   * Name attribute for the input field.
   */
  name: string;
  /**
   * ID attribute for the input field.
   */
  id: string;
  /**
   * Maximum length of the input field.
   */
  maxLength: number;
  /**
   * Value of the input field.
   */
  inputValue: string;
  /**
   * Maximum number of tags that can be added.
   */
  maxTags: number;
  /**
   * Array of tags to display.
   */
  tags: Array<Tag>;
  /**
   * Whether to allow unique tags only.
   */
  allowUnique: boolean;
  /**
   * Render function to render each suggestion item.
   */
  renderSuggestion: (item: Tag, query: string) => ReactNode;
  /**
   * Additional props to pass to the input field.
   */
  inputProps: { [key: string]: string };
  /**
   * Whether the tags are editable.
   */
  editable: boolean;
  /**
   * Whether to display a button to clear all the tags.
   */
  clearAll: boolean;
  /**
   * Handler for clearing all the tags.
   */
  onClearAll: () => void;
}

interface ReactTagsState {
  /**
   * Array of suggestions to display in the dropdown.
   */
  suggestions: Array<Tag>;
  /**
   * Query string to filter suggestions.
   */
  query: string;
  /**
   * Whether the input field is focused.
   */
  isFocused: boolean;
  /**
   * Index of the selected suggestion.
   */
  selectedIndex: number;
  /**
   * Whether the input field is in selection mode.
   */
  selectionMode: boolean;
  /**
   * ARIA live status message.
   */
  ariaLiveStatus: string;
  /**
   * Index of the tag currently being edited.
   */
  currentEditIndex: number;
  /**
   * Error message to display.
   */
  error: string;
}

const ReactTags = (props: ReactTagsProps) => {
  const {
    autofocus,
    autoFocus,
    readOnly,
    labelField,

    allowDeleteFromEmptyInput,
    allowAdditionFromPaste,
    allowDragDrop,

    minQueryLength,
    shouldRenderSuggestions,
    removeComponent,
    autocomplete,
    inline,
    maxTags,
    allowUnique,
    editable,

    placeholder,
    delimiters,
    tags,
    inputFieldPosition,
    inputProps,
    classNames,
    maxLength,
    inputValue,
    clearAll,
  } = props;

  const [suggestions, setSuggestions] = useState(props.suggestions);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectionMode, setSelectionMode] = useState(false);
  const [ariaLiveStatus, setAriaLiveStatus] = useState('');
  const [currentEditIndex, setCurrentEditIndex] = useState(-1);
  const [error, setError] = useState('');

  const reactTagsRef = createRef<HTMLDivElement>();
  const textInput = useRef<HTMLInputElement | null>(null);
  const tagInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!inline) {
      console.warn(
        '[Deprecation] The inline attribute is deprecated and will be removed in v7.x.x, please use inputFieldPosition instead.'
      );
    }
  }, [inline]);

  useEffect(() => {
    if (autofocus === false) {
      console.warn(
        '[Deprecated] autofocus prop will be removed in 7.x so please migrate to autoFocus prop.'
      );
    }
    if (autofocus && autoFocus && !readOnly) {
      resetAndFocusInput();
    }
  }, [autoFocus, autoFocus, readOnly]);

  useEffect(() => {
    updateSuggestions();
  }, [query, props.suggestions]);

  // Filter suggestions based on the query and existing tags
  const filteredSuggestions = (query: string) => {
    let updatedSuggestions = props.suggestions.slice();

    // If unique tags are allowed, filter out suggestions that are already in the tags array
    if (allowUnique) {
      const existingTags = tags.map((tag) => tag.id.trim().toLowerCase());
      updatedSuggestions = updatedSuggestions.filter(
        (suggestion) => !existingTags.includes(suggestion.id.toLowerCase())
      );
    }
    // If a custom filter function is provided, use it to filter the suggestions
    if (props.handleFilterSuggestions) {
      return props.handleFilterSuggestions(query, updatedSuggestions);
    }

    // Separate exact matches and partial matches and return them concatenated
    // so that exact matches are always displayed first followed by partial
    const exactSuggestions = updatedSuggestions.filter(
      (item) => getQueryIndex(query, item) === 0
    );
    const partialSuggestions = updatedSuggestions.filter(
      (item) => getQueryIndex(query, item) > 0
    );

    return exactSuggestions.concat(partialSuggestions);
  };

  const getQueryIndex = (query: string, item: Tag) => {
    return item[labelField].toLowerCase().indexOf(query.toLowerCase());
  };

  const resetAndFocusInput = () => {
    setQuery('');
    if (!textInput.current) {
      return;
    }
    textInput.current.value = '';
    textInput.current.focus();
  };

  const handleDelete = (
    index: number,
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const currentTags = tags.slice();
    // Early exit from the function if the array
    // is already empty
    if (currentTags.length === 0) {
      return;
    }
    setError('');
    props.handleDelete(index, event);
    updateAriaLiveStatus(index, currentTags);
  };

  const updateAriaLiveStatus = (index: number, tags: Tag[]) => {
    if (!reactTagsRef?.current) {
      return;
    }
    const tagRemoveButtons: NodeListOf<HTMLButtonElement> =
      reactTagsRef.current.querySelectorAll('.ReactTags__remove');
    let ariaLiveStatus = '';

    if (index === 0 && tags.length > 1) {
      ariaLiveStatus = `Tag at index ${index} with value ${tags[index].id} deleted. Tag at index 0 with value ${tags[1].id} focussed. Press backspace to remove`;
      tagRemoveButtons[0].focus();
    } else if (index > 0) {
      ariaLiveStatus = `Tag at index ${index} with value ${
        tags[index].id
      } deleted. Tag at index ${index - 1} with value ${
        tags[index - 1].id
      } focussed. Press backspace to remove`;
      tagRemoveButtons[index - 1].focus();
    } else {
      ariaLiveStatus = `Tag at index ${index} with value ${tags[index].id} deleted. Input focussed. Press enter to add a new tag`;
      textInput.current?.focus();
    }

    setAriaLiveStatus(ariaLiveStatus);
  };

  const handleTagClick = (
    index: number,
    tag: Tag,
    event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) => {
    if (readOnly) {
      return;
    }
    if (editable) {
      setCurrentEditIndex(index);
      setQuery(tag[labelField]);
      tagInput.current?.focus();
    }
    props.handleTagClick?.(index, event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.handleInputChange) {
      props.handleInputChange(event.target.value, event);
    }

    const query = event.target.value.trim();
    setQuery(query);
  };

  const updateSuggestions = () => {
    const newSuggestions = filteredSuggestions(query);
    setSuggestions(newSuggestions);
    setSelectedIndex(
      selectedIndex >= newSuggestions.length
        ? newSuggestions.length - 1
        : selectedIndex
    );
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (props.handleInputFocus) {
      props.handleInputFocus(value, event);
    }
    setIsFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (props.handleInputBlur) {
      props.handleInputBlur(value, event);
      if (textInput.current) {
        textInput.current.value = '';
      }
    }
    setIsFocused(false);
    setCurrentEditIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // hide suggestions menu on escape
    if (event.keyCode === KEYS.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      setSelectedIndex(-1);
      setSelectionMode(false);
      setSuggestions([]);
      setCurrentEditIndex(-1);
    }

    // When one of the terminating keys is pressed, add current query to the tags.
    // If no text is typed in so far, ignore the action - so we don't end up with a terminating
    // character typed in.
    if (delimiters.indexOf(event.keyCode) !== -1 && !event.shiftKey) {
      if (event.keyCode !== KEYS.TAB || query !== '') {
        event.preventDefault();
      }

      const selectedQuery =
        selectionMode && selectedIndex !== -1
          ? suggestions[selectedIndex]
          : {
              id: query.trim(),
              [labelField]: query.trim(),
              className: '',
            };
      if (Object.keys(selectedQuery)) {
        addTag(selectedQuery);
      }
    }
    // If the backspace key is pressed and the query is empty, delete the last tag if
    // allowDeleteFromEmptyInput is true or if the input field is inline
    if (
      event.key === 'Backspace' &&
      query === '' &&
      (allowDeleteFromEmptyInput ||
        inputFieldPosition === INPUT_FIELD_POSITIONS.INLINE)
    ) {
      handleDelete(tags.length - 1, event);
    }

    // up arrow
    if (event.keyCode === KEYS.UP_ARROW) {
      event.preventDefault();
      setSelectedIndex(
        selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1
      );
      setSelectionMode(true);
    }

    // down arrow
    if (event.keyCode === KEYS.DOWN_ARROW) {
      event.preventDefault();
      setSelectionMode(true);
      suggestions.length === 0
        ? setSelectedIndex(-1)
        : setSelectedIndex((selectedIndex + 1) % suggestions.length);
    }
  };

  const tagLimitReached = () => {
    return maxTags && tags.length >= maxTags;
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (!allowAdditionFromPaste) {
      return;
    }

    if (tagLimitReached()) {
      setError(ERRORS.TAG_LIMIT);
      resetAndFocusInput();
      return;
    }

    setError('');

    event.preventDefault();

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const clipboardText = clipboardData.getData('text');

    const { maxLength = clipboardText.length } = props;

    const maxTextLength = Math.min(maxLength, clipboardText.length);
    const pastedText = clipboardData.getData('text').substr(0, maxTextLength);

    // Used to determine how the pasted content is split.
    const delimiterRegExp = buildRegExpFromDelimiters(delimiters);
    const tags = pastedText.split(delimiterRegExp).map((tag) => tag.trim());

    // Only add unique tags
    uniq(tags).forEach((tag) =>
      addTag({
        id: tag.trim(),
        [labelField]: tag.trim(),
        className: '',
      })
    );
  };

  const addTag = (tag: Tag) => {
    if (!tag.id || !tag[labelField]) {
      return;
    }

    if (currentEditIndex === -1) {
      if (tagLimitReached()) {
        setError(ERRORS.TAG_LIMIT);
        resetAndFocusInput();
        return;
      }
      setError('');
    }

    const existingKeys = tags.map((tag: Tag) => tag.id.toLowerCase());

    // Return if tag has been already added
    if (allowUnique && existingKeys.indexOf(tag.id.trim().toLowerCase()) >= 0) {
      return;
    }
    if (autocomplete) {
      const possibleMatches = filteredSuggestions(tag[labelField]);
      console.warn(
        '[Deprecation] The autocomplete prop will be removed in 7.x to simplify the integration and make it more intutive. If you have any concerns regarding this, please share your thoughts in https://github.com/react-tags/react-tags/issues/949'
      );
      if (
        (autocomplete === 1 && possibleMatches.length === 1) ||
        (autocomplete === true && possibleMatches.length)
      ) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    if (currentEditIndex !== -1 && props.onTagUpdate)
      props.onTagUpdate(currentEditIndex, tag);
    else props.handleAddition(tag);

    // reset the state
    setQuery('');
    setSelectionMode(false);
    setSelectedIndex(-1);
    setCurrentEditIndex(-1);

    resetAndFocusInput();
  };

  const handleSuggestionClick = (index: number) => {
    addTag(suggestions[index]);
  };

  const handleClearAll = () => {
    if (props.onClearAll) {
      props.onClearAll();
    }
    setError('');
    resetAndFocusInput();
  };

  const handleSuggestionHover = (index: number) => {
    setSelectedIndex(index);
    setSelectionMode(true);
  };

  const moveTag = (dragIndex: number, hoverIndex: number) => {
    // locate tags
    const dragTag = tags[dragIndex];

    // call handler with the index of the dragged tag
    // and the tag that is hovered
    props.handleDrag(dragTag, dragIndex, hoverIndex);
  };

  const getTagItems = () => {
    const allClassNames = { ...DEFAULT_CLASSNAMES, ...props.classNames };

    return tags.map((tag, index) => {
      return (
        <Fragment key={index}>
          {currentEditIndex === index ? (
            <div className={allClassNames.editTagInput}>
              <input
                ref={(input: HTMLInputElement) => {
                  tagInput.current = input;
                }}
                onFocus={handleFocus}
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={allClassNames.editTagInputField}
                onPaste={handlePaste}
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
              ) => handleDelete(index, event)}
              moveTag={allowDragDrop ? moveTag : undefined}
              removeComponent={removeComponent}
              onTagClicked={(
                event:
                  | React.MouseEvent<HTMLSpanElement>
                  | React.TouchEvent<HTMLSpanElement>
              ) => handleTagClick(index, tag, event)}
              readOnly={readOnly}
              classNames={allClassNames}
              allowDragDrop={allowDragDrop}
            />
          )}
        </Fragment>
      );
    });
  };

  const tagItems = getTagItems();
  const allClassNames = { ...DEFAULT_CLASSNAMES, ...classNames };

  const { name: inputName, id: inputId } = props;

  const position = !inline ? INPUT_FIELD_POSITIONS.BOTTOM : inputFieldPosition;

  const tagsComponent = !readOnly ? (
    <div className={allClassNames.tagInput}>
      <input
        {...inputProps}
        ref={(input) => {
          textInput.current = input;
        }}
        className={allClassNames.tagInputField}
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        name={inputName}
        id={inputId}
        maxLength={maxLength}
        value={inputValue}
        data-automation="input"
        data-testid="input"
      />

      <Suggestions
        query={query.trim()}
        suggestions={suggestions}
        labelField={labelField}
        selectedIndex={selectedIndex}
        handleClick={handleSuggestionClick}
        handleHover={handleSuggestionHover}
        minQueryLength={minQueryLength}
        shouldRenderSuggestions={shouldRenderSuggestions}
        isFocused={isFocused}
        classNames={allClassNames}
        renderSuggestion={props.renderSuggestion}
      />
      {clearAll && tags.length > 0 && (
        <ClearAllTags classNames={allClassNames} onClick={handleClearAll} />
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
      className={ClassNames(allClassNames.tags, 'react-tags-wrapper')}
      ref={reactTagsRef}>
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
        {ariaLiveStatus}
      </p>
      {position === INPUT_FIELD_POSITIONS.TOP && tagsComponent}
      <div className={allClassNames.selected}>
        {tagItems}
        {position === INPUT_FIELD_POSITIONS.INLINE && tagsComponent}
      </div>
      {position === INPUT_FIELD_POSITIONS.BOTTOM && tagsComponent}
    </div>
  );
};

ReactTags.defaultProps = {
  placeholder: DEFAULT_PLACEHOLDER,
  labelField: DEFAULT_LABEL_FIELD,
  suggestions: [],
  delimiters: [...KEYS.ENTER, KEYS.TAB],
  autofocus: true,
  autoFocus: true,
  inline: true, // TODO: Remove in v7.x.x
  inputFieldPosition: INPUT_FIELD_POSITIONS.INLINE,
  handleDelete: noop,
  handleAddition: noop,
  allowDeleteFromEmptyInput: false,
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
const WithContext = ({ ...props }: ReactTagsProps) => (
  // @ts-ignore
  <DndProvider backend={HTML5Backend}>
    <ReactTags {...props} />
  </DndProvider>
);
export { WithContext };
export { ReactTags as WithOutContext };
export { KEYS };
