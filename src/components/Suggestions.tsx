import  { Component, ReactNode } from 'react';
import isEqual from 'lodash/isEqual';
import escape from 'lodash/escape';
import { Tag } from './Tag';

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

interface SuggestionsProps {
  query: string;
  suggestions: Array<any>; // eslint-disable-line
  labelField: string;
  selectedIndex: number;
  isFocused: boolean;
  handleClick: (i: number) => void;
  handleHover: (i: number) => void;
  classNames: {
    suggestions: string,
    activeSuggestion: string,
  };
  shouldRenderSuggestions?: (query: string) => boolean;
  renderSuggestion?: (item: Tag, query: string) => ReactNode;
  minQueryLength?: number;
}

class Suggestions extends Component<SuggestionsProps> {
  

  private suggestionsContainer: HTMLDivElement | null = null;


  shouldComponentUpdate(nextProps: SuggestionsProps) {
    const { props } = this;
    const shouldRenderSuggestions =
      props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    return (  
      props.isFocused !== nextProps.isFocused ||
      !isEqual(props.suggestions, nextProps.suggestions) ||
      shouldRenderSuggestions(nextProps.query) ||
      shouldRenderSuggestions(nextProps.query) !==
        shouldRenderSuggestions(props.query)
    );
  }

  componentDidUpdate(prevProps: SuggestionsProps) {
    const { selectedIndex, classNames } = this.props;

    if (
      this.suggestionsContainer &&
      prevProps.selectedIndex !== selectedIndex
    ) {
      const activeSuggestion = this.suggestionsContainer.querySelector(
        `.${classNames.activeSuggestion}`
      ) as HTMLElement;

      if (activeSuggestion) {
        maybeScrollSuggestionIntoView(
          activeSuggestion,
          this.suggestionsContainer
        );
      }
    }
  }

  markIt = (tag: { [key: string]: string }, query: string) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

    const { [this.props.labelField]: labelValue } = tag;

    return {
      __html: labelValue.replace(RegExp(escapedRegex, 'gi'), (x: string) => {
        return `<mark>${escape(x)}</mark>`;
      }),
    };
  };

  shouldRenderSuggestions = (query: string) => {
   
    const { minQueryLength = 2, isFocused } = this.props;
    return query.length >= minQueryLength && isFocused;
  };

  renderSuggestion = (tag: Tag, query: string): ReactNode => {
    const { renderSuggestion } = this.props;
    if (typeof renderSuggestion === 'function') {
      return renderSuggestion(tag, query);
    }
    return <span dangerouslySetInnerHTML={this.markIt(tag, query)} />;
  };

  render() {
    const { props } = this;

    const suggestions = props.suggestions.map(
      (tag: Tag, index: number) => {
        return (
          <li
            key={index}
            onMouseDown={props.handleClick.bind(null, index)}
            onTouchStart={props.handleClick.bind(null, index)}
            onMouseOver={props.handleHover.bind(null, index)}
            className={
              index === props.selectedIndex ? props.classNames.activeSuggestion : ''
            }>
            {this.renderSuggestion(tag, props.query)}
          </li>
        );
      }
    );

    // use the override, if provided
    const shouldRenderSuggestions =
      props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
      return null;
    }

    return (
      <div
        ref={(elem) => {
          this.suggestionsContainer = elem;
        }}
        className={this.props.classNames.suggestions}>
        <ul> {suggestions} </ul>
      </div>
    );
  }
}

export default Suggestions;
