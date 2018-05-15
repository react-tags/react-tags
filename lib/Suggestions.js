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
    renderSuggestions: PropTypes.func,
  };

  static defaultProps = {
    minQueryLength: 2,
  };

  shouldComponentUpdate(nextProps) {
    const {
      isFocused,
      query,
      shouldRenderSuggestions,
      suggestions,
    } = this.props;

    // use the override, if provided
    const shouldRenderSuggestionsFn =
      shouldRenderSuggestions || this.shouldRenderSuggestions;

    return (
      isFocused !== nextProps.isFocused ||
      !isEqual(suggestions, nextProps.suggestions) ||
      shouldRenderSuggestionsFn(nextProps.query) ||
      shouldRenderSuggestionsFn(nextProps.query) !==
        shouldRenderSuggestionsFn(query)
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
    const { minQueryLength, isFocused } = this.props;
    return query.length >= minQueryLength && isFocused;
  };

  renderSuggestions = () => {
    const {
      classNames: { suggestionLabel, activeSuggestion, suggestionContent },
      handleClick,
      handleHover,
      query,
      selectedIndex,
      suggestions,
      renderSuggestions,
    } = this.props;

    return suggestions.map((item, i) => {
      const suggestionLabelElement = (
        <span
          className={suggestionLabel}
          dangerouslySetInnerHTML={this.markIt(item, query)}
        />
      );

      const content = renderSuggestions
        ? renderSuggestions(suggestionLabelElement)
        : suggestionLabelElement;

      return (
        <li
          key={i}
          onMouseDown={handleClick.bind(null, i)}
          onMouseOver={handleHover.bind(null, i)}
          className={i === selectedIndex ? activeSuggestion : ''}>
          <span className={suggestionContent}>{content}</span>
        </li>
      );
    });
  };

  render() {
    const {
      classNames: { suggestions: suggestionsClass },
      query,
      suggestions,
      shouldRenderSuggestions,
    } = this.props;

    // use the override, if provided
    const shouldRenderSuggestionsFn =
      shouldRenderSuggestions || this.shouldRenderSuggestions;

    if (suggestions.length === 0 || !shouldRenderSuggestionsFn(query)) {
      return null;
    }

    return (
      <div
        ref={(elem) => {
          this.suggestionsContainer = elem;
        }}
        className={suggestionsClass}>
        <ul>{this.renderSuggestions()}</ul>
      </div>
    );
  }
}

export default Suggestions;
