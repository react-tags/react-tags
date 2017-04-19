import React, { Component } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";

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
    classNames: PropTypes.object,
  };

  shouldComponentUpdate = nextProps => {
    const { props } = this;
    const shouldRenderSuggestions =
      props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    return (
      !isEqual(props.suggestions, nextProps.suggestions) ||
      shouldRenderSuggestions(nextProps.query) ||
      shouldRenderSuggestions(nextProps.query) !=
        shouldRenderSuggestions(props.query)
    );
  };

  componentDidUpdate = prevProps => {
    const suggestionsContainer = this.refs.suggestionsContainer;
    const { selectedIndex, classNames } = this.props;

    if (suggestionsContainer && prevProps.selectedIndex !== selectedIndex) {
      const activeSuggestion = suggestionsContainer.querySelector(
        classNames.activeSuggestion
      );

      if (activeSuggestion) {
        maybeScrollSuggestionIntoView(activeSuggestion, suggestionsContainer);
      }
    }
  };

  markIt = (input, query) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    return {
      __html: input.replace(RegExp(escapedRegex, "gi"), "<mark>$&</mark>"),
    };
  };

  shouldRenderSuggestions = query => {
    const { props } = this;
    const minQueryLength = props.minQueryLength || 2;
    return query.length >= minQueryLength;
  };

  render = () => {
    const { props } = this;
    const suggestions = props.suggestions.map(
      function(item, i) {
        return (
          <li
            key={i}
            onMouseDown={props.handleClick.bind(null, i)}
            onMouseOver={props.handleHover.bind(null, i)}
            className={
              i == props.selectedIndex ? props.classNames.activeSuggestion : ""
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
        ref="suggestionsContainer"
        className={this.props.classNames.suggestions}>
        <ul> {suggestions} </ul>
      </div>
    );
  };
}

export default Suggestions;
