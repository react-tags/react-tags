import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Suggestions from './Suggestions';
import Tag from './Tag';

// Constants
const Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27
};

const DefaultClassNames = {
  tags: 'ReactTags__tags',
  tagInput: 'ReactTags__tagInput',
  tagInputField: 'ReactTags__tagInputField',
  selected: 'ReactTags__selected',
  tag: 'ReactTags__tag',
  remove: 'ReactTags__remove',
  suggestions: 'ReactTags__suggestions'
};

var ReactTags = React.createClass({
  propTypes: {
    tags: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    labelField: React.PropTypes.string,
    suggestions: React.PropTypes.array,
    delimiters: React.PropTypes.array,
    autofocus: React.PropTypes.bool,
    inline: React.PropTypes.bool,
    handleDelete: React.PropTypes.func.isRequired,
    handleAddition: React.PropTypes.func.isRequired,
    handleDrag: React.PropTypes.func,
    handleFilterSuggestions: React.PropTypes.func,
    allowDeleteFromEmptyInput: React.PropTypes.bool,
    handleInputChange: React.PropTypes.func,
    handleInputBlur: React.PropTypes.func,
    minQueryLength: React.PropTypes.number,
    shouldRenderSuggestions: React.PropTypes.func,
    removeComponent: React.PropTypes.func,
    autocomplete: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
    readOnly: React.PropTypes.bool,
    classNames: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      placeholder: 'Add new tag',
      tags: [],
      suggestions: [],
      delimiters: [Keys.ENTER, Keys.TAB],
      autofocus: true,
      inline: true,
      allowDeleteFromEmptyInput: true,
      minQueryLength: 2,
      autocomplete: false,
      readOnly: false,
    }
  },
  componentWillMount: function() {
    this.setState({
      classNames: {...DefaultClassNames, ...this.props.classNames}
    });
  },
  componentDidMount: function() {
    if (this.props.autofocus && !this.props.readOnly) {
      this.refs.input.focus();
    }
  },
  getInitialState: function() {
    return {
      suggestions: this.props.suggestions,
      query: "",
      selectedIndex: -1,
      selectionMode: false
    }
  },
  filteredSuggestions(query, suggestions) {
    if (this.props.handleFilterSuggestions) {
      return this.props.handleFilterSuggestions(query, suggestions)
    }

    return suggestions.filter(function(item) {
      return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
    });
  },
  componentWillReceiveProps(props) {
    var suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
    this.setState({
      suggestions: suggestions,
      classNames: {...DefaultClassNames, ...props.classNames}
    });
  },
  handleDelete: function(i, e) {
    this.props.handleDelete(i);
    this.setState({ query: "" });
  },
  handleChange: function(e) {
    if (this.props.handleInputChange){
      this.props.handleInputChange(e.target.value.trim())
    }

    var query = e.target.value.trim();
    var suggestions = this.filteredSuggestions(query, this.props.suggestions);
    var selectedIndex = this.state.selectedIndex;
    // if our selected entry is gonna disappear, select the last entry we will have
    if ( selectedIndex >= suggestions.length ) {
      selectedIndex = suggestions.length - 1;
    }
    this.setState({
      query: query,
      suggestions: suggestions,
      selectedIndex: selectedIndex
    });
  },
  handleBlur: function(e) {
    var value = e.target.value.trim();
    if (this.props.handleInputBlur){
      this.props.handleInputBlur(value);
      this.refs.input.value = "";
    }
  },
  handleKeyDown: function(e) {
    var { query, selectedIndex, suggestions } = this.state;

    // hide suggestions menu on escape
    if (e.keyCode === Keys.ESCAPE) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        selectedIndex: -1,
        selectionMode: false,
        suggestions: []
      });
    }

    // When one of the terminating keys is pressed, add current query to the tags.
    // If no text is typed in so far, ignore the action - so we don't end up with a terminating
    // character typed in.
    if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
      if (e.keyCode !== Keys.TAB || query !== "") {
        e.preventDefault();
      }

      if (query !== "") {
        if (this.state.selectionMode && this.state.selectedIndex != -1) {
          query = this.state.suggestions[this.state.selectedIndex];
        }
        this.addTag(query);
      }
    }

    // when backspace key is pressed and query is blank, delete tag
    if (e.keyCode === Keys.BACKSPACE && query == "" && this.props.allowDeleteFromEmptyInput) {
      this.handleDelete(this.props.tags.length - 1);
    }

    // up arrow
    if (e.keyCode === Keys.UP_ARROW) {
      e.preventDefault();
      var selectedIndex = this.state.selectedIndex;
      // last item, cycle to the top
      if (selectedIndex <= 0) {
        this.setState({
          selectedIndex: this.state.suggestions.length - 1,
          selectionMode: true
        });
      } else {
        this.setState({
          selectedIndex: selectedIndex - 1,
          selectionMode: true
        });
      }
    }

    // down arrow
    if (e.keyCode === Keys.DOWN_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
        selectionMode: true
      });
    }
  },
  handlePaste: function (e) {
    e.preventDefault()

    // See: http://stackoverflow.com/a/6969486/1463681
    const escapeRegex = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    // Used to determine how the pasted content is split.
    const delimiterChars = escapeRegex(this.props.delimiters.map(delimiter => {
      // See: http://stackoverflow.com/a/34711175/1463681
      const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
      return String.fromCharCode((96 <= delimiter) ? chrCode: delimiter)
    }).join(''))

    const clipboardData = e.clipboardData || window.clipboardData
    const string = clipboardData.getData('text')
    const regExp = new RegExp(`[${delimiterChars}]+`)
    string.split(regExp).forEach((tag) => this.props.handleAddition(tag))
  },
  addTag: function(tag) {
    var input = this.refs.input;

    if (this.props.autocomplete) {
      var possibleMatches = this.filteredSuggestions(tag, this.props.suggestions);

      if ( (this.props.autocomplete === 1 && possibleMatches.length === 1) ||
      this.props.autocomplete === true && possibleMatches.length)  {
        tag = possibleMatches[0]
      }
    }

    // call method to add
    this.props.handleAddition(tag);

    // reset the state
    this.setState({
      query: "",
      selectionMode: false,
      selectedIndex: -1
    });

    // focus back on the input box
    input.value = "";
    input.focus();
  },
  handleSuggestionClick: function(i, e) {
    this.addTag(this.state.suggestions[i]);
  },
  handleSuggestionHover: function(i, e) {
    this.setState({
      selectedIndex: i,
      selectionMode: true
    });
  },
  moveTag: function(id, afterId) {
    var tags = this.props.tags;

    // locate tags
    var tag = tags.filter(t => t.id === id)[0];
    var afterTag = tags.filter(t => t.id === afterId)[0];

    // find their position in the array
    var tagIndex = tags.indexOf(tag);
    var afterTagIndex = tags.indexOf(afterTag);

    // call handler with current position and after position
    this.props.handleDrag(tag, tagIndex, afterTagIndex);
  },
  render: function() {
    var moveTag = this.props.handleDrag ? this.moveTag : null;
    var tagItems = this.props.tags.map(function(tag, i) {
      return <Tag key={i}
                tag={tag}
                labelField={this.props.labelField}
                onDelete={this.handleDelete.bind(this, i)}
                moveTag={moveTag}
                removeComponent={this.props.removeComponent}
                readOnly={this.props.readOnly}
                classNames={this.state.classNames}/>}.bind(this));

    // get the suggestions for the given query
    var query = this.state.query.trim(),
    selectedIndex = this.state.selectedIndex,
    suggestions = this.state.suggestions,
    placeholder = this.props.placeholder;

    const tagInput =  !this.props.readOnly ? (
      <div className={this.state.classNames.tagInput}>

        <input ref="input"
          className={this.state.classNames.tagInputField}
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onPaste={this.handlePaste}/>

        <Suggestions query={query}
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          handleClick={this.handleSuggestionClick}
          handleHover={this.handleSuggestionHover}
          minQueryLength={this.props.minQueryLength}
          shouldRenderSuggestions={this.props.shouldRenderSuggestions}
          classNames={this.state.classNames}/>
      </div>
    ) : null;

    return (
      <div className={this.state.classNames.tags}>
        <div className={this.state.classNames.selected}>
          {tagItems}
          {this.props.inline && tagInput}
        </div>
        {!this.props.inline && tagInput}
      </div>
    )
  }
});

module.exports = {
  WithContext: DragDropContext(HTML5Backend)(ReactTags),
  WithOutContext: ReactTags,
  Keys: Keys
};
