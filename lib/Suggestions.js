import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Polyfills
import Number from 'core-js/library/fn/number';

const maybeScrollSuggestionIntoView = (suggestionEl, suggestionsContainer) => {
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

class Suggestions extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    suggestions: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleHover: PropTypes.func.isRequired,
    minQueryLength: PropTypes.number,
    shouldRenderSuggestions: PropTypes.func,
    isFocused: PropTypes.bool.isRequired,
    classNames: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const shouldRenderSuggestions =
      props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    return (
      props.isFocused !== nextProps.isFocused ||
      !isEqual(props.suggestions, nextProps.suggestions) ||
      shouldRenderSuggestions(nextProps.query) ||
      shouldRenderSuggestions(nextProps.query) !=
        shouldRenderSuggestions(props.query)
    );
  }

  componentDidUpdate(prevProps) {
    const { selectedIndex, classNames } = this.props;

    if (
      this.suggestionsContainer &&
      prevProps.selectedIndex !== selectedIndex
    ) {
      const activeSuggestion = this.suggestionsContainer.querySelector(
        classNames.activeSuggestion
      );

      if (activeSuggestion) {
        maybeScrollSuggestionIntoView(
          activeSuggestion,
          this.suggestionsContainer
        );
      }
    }
  }

  markIt = (input, query) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    return {
      __html: input.text.replace(RegExp(escapedRegex, 'gi'), '<mark>$&</mark>'),
    };
  };

  shouldRenderSuggestions = (query) => {
    const { props } = this;
    const minQueryLength = Number.isInteger(props.minQueryLength)
      ? props.minQueryLength
      : 2;
    return query.length >= minQueryLength && props.isFocused;
  };

  render() {
    const { props } = this;
    const suggestions = props.suggestions.map(
      function(item, i) {
        return (
          <li
            key={i}
            onMouseDown={props.handleClick.bind(null, i)}
            onMouseOver={props.handleHover.bind(null, i)}
            className={
              i == props.selectedIndex ? props.classNames.activeSuggestion : ''
            }>
            <span dangerouslySetInnerHTML={this.markIt(item, props.query)} />
          </li>
        );
      }.bind(this)
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
