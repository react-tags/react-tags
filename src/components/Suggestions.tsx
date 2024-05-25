import { ReactNode, createRef, memo, useEffect } from 'react';
import { isEqual, escape } from 'lodash-es';
import { Tag } from './SingleTag';

const maybeScrollSuggestionIntoView = (
  suggestionEl: HTMLElement,
  suggestionsContainer: HTMLElement
) => {
  const containerHeight = suggestionsContainer.offsetHeight;
  const suggestionHeight = suggestionEl.offsetHeight;
  const relativeSuggestionTop =
    suggestionEl.offsetTop - suggestionsContainer.scrollTop;
  if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
    suggestionsContainer.scrollTop +=
      relativeSuggestionTop - containerHeight + suggestionHeight;
  } else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop;
  }
};

const shouldRenderSuggestions = (
  query: string,
  minQueryLength: number,
  isFocused: boolean,
  shouldRenderSuggestionsCb?: (query: string) => boolean
) => {
  if (typeof shouldRenderSuggestionsCb === 'function') {
    return shouldRenderSuggestionsCb(query);
  }
  return query.length >= minQueryLength && isFocused;
};

interface SuggestionsProps {
  /**
   * The current query string.
   */
  query: string;
  /**
   * The array of suggestions to display.
   */
  suggestions: Array<any>; // eslint-disable-line
  /**
   * The field to use for the label of each suggestion.
   */
  labelField: string;
  /**
   * The index of the currently selected suggestion.
   */
  selectedIndex: number;
  /**
   * Whether the input field is currently focused.
   */
  isFocused: boolean;
  /**
   * Handler for click events on suggestions.
   * @param {number} index - The index of the clicked suggestion.
   */
  handleClick: (index: number) => void;
  /**
   * Handler for hover events on suggestions.
   * @param {number} index - The index of the hovered suggestion.
   */
  handleHover: (index: number) => void;
  /**
   * CSS class names to apply to the suggestions container and active suggestion.
   */
  classNames: {
    suggestions: string;
    activeSuggestion: string;
  };
  /**
   * Optional function to determine whether to render suggestions.
   * @param {string} query - The current query string.
   * @returns {boolean} - Whether to render suggestions.
   */
  shouldRenderSuggestions?: (query: string) => boolean;
  /**
   * Optional function to render a custom suggestion.
   * @param {Tag} item - The suggestion to render.
   * @param {string} query - The current query string.
   * @returns {ReactNode} - The rendered suggestion.
   */
  renderSuggestion?: (tag: Tag, query: string) => ReactNode;
  /**
   * The minimum length of the query string required to render suggestions.
   */
  minQueryLength?: number;
}

const SuggestionsComp = (props: SuggestionsProps) => {
  const suggestionsContainerRef = createRef<HTMLDivElement>();
  const {
    labelField,
    minQueryLength,
    isFocused,
    classNames,
    selectedIndex,
    query,
  } = props;

  useEffect(() => {
    if (!suggestionsContainerRef.current) {
      return;
    }
    const activeSuggestion = suggestionsContainerRef.current.querySelector(
      `.${classNames.activeSuggestion}`
    ) as HTMLElement;

    if (activeSuggestion) {
      maybeScrollSuggestionIntoView(
        activeSuggestion,
        suggestionsContainerRef.current
      );
    }
  }, [selectedIndex]);

  const markIt = (tag: { [key: string]: string }, query: string) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

    const { [labelField]: labelValue } = tag;

    return {
      __html: labelValue.replace(RegExp(escapedRegex, 'gi'), (x: string) => {
        return `<mark>${escape(x)}</mark>`;
      }),
    };
  };

  const renderSuggestion = (tag: Tag, query: string): ReactNode => {
    if (typeof props.renderSuggestion === 'function') {
      return props.renderSuggestion(tag, query);
    }
    return <span dangerouslySetInnerHTML={markIt(tag, query)} />;
  };

  const suggestions = props.suggestions.map((tag: Tag, index: number) => {
    return (
      <li
        key={index}
        onMouseDown={props.handleClick.bind(null, index)}
        onTouchStart={props.handleClick.bind(null, index)}
        onMouseOver={props.handleHover.bind(null, index)}
        className={
          index === props.selectedIndex ? props.classNames.activeSuggestion : ''
        }>
        {renderSuggestion(tag, props.query)}
      </li>
    );
  });

  // use the override, if provided
  if (
    suggestions.length === 0 ||
    !shouldRenderSuggestions(
      query,
      minQueryLength || 2,
      isFocused,
      props.shouldRenderSuggestions
    )
  ) {
    return null;
  }

  return (
    <div
      ref={suggestionsContainerRef}
      className={classNames.suggestions}
      data-testid="suggestions">
      <ul> {suggestions} </ul>
    </div>
  );
};

export const arePropsEqual = (
  prevProps: SuggestionsProps,
  nextProps: SuggestionsProps
) => {
  const { query, minQueryLength = 2, isFocused, suggestions } = nextProps;

  if (
    prevProps.isFocused === isFocused &&
    isEqual(prevProps.suggestions, suggestions) &&
    shouldRenderSuggestions(
      query,
      minQueryLength,
      isFocused,
      nextProps.shouldRenderSuggestions
    ) ===
      shouldRenderSuggestions(
        prevProps.query,
        prevProps.minQueryLength ?? 2,
        prevProps.isFocused,
        prevProps.shouldRenderSuggestions
      ) &&
    prevProps.selectedIndex === nextProps.selectedIndex
  ) {
    return true;
  }
  return false;
};

const Suggestions = memo(SuggestionsComp, arePropsEqual);

export default Suggestions;
