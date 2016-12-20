import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

const maybeScrollSuggestionIntoView  = (suggestionEl, suggestionsContainer) => {
  const containerHeight = suggestionsContainer.offsetHeight
  const suggestionHeight = suggestionEl.offsetHeight
  const relativeSuggestionTop = suggestionEl.offsetTop - suggestionsContainer.scrollTop

  if (relativeSuggestionTop + suggestionHeight  >= containerHeight) {
    suggestionsContainer.scrollTop += (relativeSuggestionTop - containerHeight) + suggestionHeight
  }
  else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop
  }
}

class Suggestions extends Component {
  static propTypes = {
    query: React.PropTypes.string.isRequired,
    selectedIndex: React.PropTypes.number.isRequired,
    suggestions: React.PropTypes.array.isRequired,
    handleClick: React.PropTypes.func.isRequired,
    handleHover: React.PropTypes.func.isRequired,
    minQueryLength: React.PropTypes.number,
    shouldRenderSuggestions: React.PropTypes.func,
    classNames: React.PropTypes.object
  }

  shouldComponentUpdate = nextProps => {
    const { props } = this;
    const shouldRenderSuggestions = props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    return !isEqual(this.props.suggestions, nextProps.suggestions) || shouldRenderSuggestions(props.query);
  }

  componentDidUpdate = prevProps => {
    const suggestionsContainer = this.refs.suggestionsContainer
    if (suggestionsContainer && prevProps.selectedIndex !== this.props.selectedIndex) {
      const activeSuggestion = suggestionsContainer.querySelector('.active')

      if (activeSuggestion) {
        maybeScrollSuggestionIntoView(activeSuggestion, suggestionsContainer)
      }
    }
  }

  markIt = (input, query) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    return {
      __html: input.replace(RegExp(escapedRegex, "gi"), "<mark>$&</mark>")
    }
  }

  shouldRenderSuggestions = (query) => {
    const { props } = this;
    const minQueryLength = props.minQueryLength || 2;
    return (props.query.length >= minQueryLength);
  }

  render = () => {
    const { props } = this;
    const suggestions = props.suggestions.map(function (item, i) {
      return (
          <li key={i}
              onMouseDown={props.handleClick.bind(null, i) }
              onMouseOver={props.handleHover.bind(null, i) }
              className={i == props.selectedIndex ? "active" : ""}>
            <span dangerouslySetInnerHTML={this.markIt(item, props.query) } />
          </li>
      )
    }.bind(this));

    // use the override, if provided
    const shouldRenderSuggestions = props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
      return null;
    }

    return (
        <div ref="suggestionsContainer" className={this.props.classNames.suggestions}>
          <ul> { suggestions } </ul>
        </div>
    )
  }
}

export default Suggestions;
