import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import escape from 'lodash/escape';

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
  renderSuggestion?: (item: any, query: string) => void;
  minQueryLength?: number;
}

class Suggestions extends Component<SuggestionsProps> {
  

  private suggestionsContainer: HTMLDivElement;


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

  renderSuggestion = (item: { [key: string]: string }, query: string) => {
    const { renderSuggestion } = this.props;
    if (typeof renderSuggestion === 'function') {
      return renderSuggestion(item, query);
    }
    return <span dangerouslySetInnerHTML={this.markIt(item, query)} />;
  };

  render() {
    const { props } = this;

    const suggestions = props.suggestions.map(
      (item: { [key: string]: string }, i: number) => {
        return (
          <li
            key={i}
            onMouseDown={props.handleClick.bind(null, i)}
            onTouchStart={props.handleClick.bind(null, i)}
            onMouseOver={props.handleHover.bind(null, i)}
            className={
              i === props.selectedIndex ? props.classNames.activeSuggestion : ''
            }>
            {this.renderSuggestion(item, props.query)}
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
