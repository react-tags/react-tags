'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants
var Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27
};

var DefaultClassNames = {
  tags: 'ReactTags__tags',
  tagInput: 'ReactTags__tagInput',
  tagInputField: 'ReactTags__tagInputField',
  selected: 'ReactTags__selected',
  tag: 'ReactTags__tag',
  remove: 'ReactTags__remove',
  suggestions: 'ReactTags__suggestions'
};

var ReactTags = _react2.default.createClass({
  displayName: 'ReactTags',

  propTypes: {
    tags: _react2.default.PropTypes.array,
    placeholder: _react2.default.PropTypes.string,
    labelField: _react2.default.PropTypes.string,
    suggestions: _react2.default.PropTypes.array,
    delimiters: _react2.default.PropTypes.array,
    autofocus: _react2.default.PropTypes.bool,
    inline: _react2.default.PropTypes.bool,
    handleDelete: _react2.default.PropTypes.func.isRequired,
    handleAddition: _react2.default.PropTypes.func.isRequired,
    handleDrag: _react2.default.PropTypes.func,
    handleFilterSuggestions: _react2.default.PropTypes.func,
    allowDeleteFromEmptyInput: _react2.default.PropTypes.bool,
    handleInputChange: _react2.default.PropTypes.func,
    handleInputBlur: _react2.default.PropTypes.func,
    minQueryLength: _react2.default.PropTypes.number,
    shouldRenderSuggestions: _react2.default.PropTypes.func,
    removeComponent: _react2.default.PropTypes.func,
    autocomplete: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.number]),
    readOnly: _react2.default.PropTypes.bool,
    classNames: _react2.default.PropTypes.object
  },
  getDefaultProps: function getDefaultProps() {
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
      readOnly: false
    };
  },
  componentWillMount: function componentWillMount() {
    this.setState({
      classNames: _extends({}, DefaultClassNames, this.props.classNames)
    });
  },
  componentDidMount: function componentDidMount() {
    if (this.props.autofocus && !this.props.readOnly) {
      this.refs.input.focus();
    }
  },
  getInitialState: function getInitialState() {
    return {
      suggestions: this.props.suggestions,
      query: "",
      selectedIndex: -1,
      selectionMode: false
    };
  },
  filteredSuggestions: function filteredSuggestions(query, suggestions) {
    if (this.props.handleFilterSuggestions) {
      return this.props.handleFilterSuggestions(query, suggestions);
    }

    return suggestions.filter(function (item) {
      return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    var suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
    this.setState({
      suggestions: suggestions,
      classNames: _extends({}, DefaultClassNames, props.classNames)
    });
  },

  handleDelete: function handleDelete(i, e) {
    this.props.handleDelete(i);
    this.setState({ query: "" });
  },
  handleChange: function handleChange(e) {
    if (this.props.handleInputChange) {
      this.props.handleInputChange(e.target.value.trim());
    }

    var query = e.target.value.trim();
    var suggestions = this.filteredSuggestions(query, this.props.suggestions);
    var selectedIndex = this.state.selectedIndex;
    // if our selected entry is gonna disappear, select the last entry we will have
    if (selectedIndex >= suggestions.length) {
      selectedIndex = suggestions.length - 1;
    }
    this.setState({
      query: query,
      suggestions: suggestions,
      selectedIndex: selectedIndex
    });
  },
  handleBlur: function handleBlur(e) {
    var value = e.target.value.trim();
    if (this.props.handleInputBlur) {
      this.props.handleInputBlur(value);
      this.refs.input.value = "";
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var _state = this.state;
    var query = _state.query;
    var selectedIndex = _state.selectedIndex;
    var suggestions = _state.suggestions;

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
  handlePaste: function handlePaste(e) {
    var _this = this;

    e.preventDefault();

    // See: http://stackoverflow.com/a/6969486/1463681
    var escapeRegex = function escapeRegex(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    // Used to determine how the pasted content is split.
    var delimiterChars = escapeRegex(this.props.delimiters.map(function (delimiter) {
      // See: http://stackoverflow.com/a/34711175/1463681
      var chrCode = delimiter - 48 * Math.floor(delimiter / 48);
      return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
    }).join(''));

    var clipboardData = e.clipboardData || window.clipboardData;
    var string = clipboardData.getData('text');
    var regExp = new RegExp('[' + delimiterChars + ']+');
    string.split(regExp).forEach(function (tag) {
      return _this.props.handleAddition(tag);
    });
  },
  addTag: function addTag(tag) {
    var input = this.refs.input;

    if (this.props.autocomplete) {
      var possibleMatches = this.filteredSuggestions(tag, this.props.suggestions);

      if (this.props.autocomplete === 1 && possibleMatches.length === 1 || this.props.autocomplete === true && possibleMatches.length) {
        tag = possibleMatches[0];
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
  handleSuggestionClick: function handleSuggestionClick(i, e) {
    this.addTag(this.state.suggestions[i]);
  },
  handleSuggestionHover: function handleSuggestionHover(i, e) {
    this.setState({
      selectedIndex: i,
      selectionMode: true
    });
  },
  moveTag: function moveTag(id, afterId) {
    var tags = this.props.tags;

    // locate tags
    var tag = tags.filter(function (t) {
      return t.id === id;
    })[0];
    var afterTag = tags.filter(function (t) {
      return t.id === afterId;
    })[0];

    // find their position in the array
    var tagIndex = tags.indexOf(tag);
    var afterTagIndex = tags.indexOf(afterTag);

    // call handler with current position and after position
    this.props.handleDrag(tag, tagIndex, afterTagIndex);
  },
  render: function render() {
    var moveTag = this.props.handleDrag ? this.moveTag : null;
    var tagItems = this.props.tags.map(function (tag, i) {
      return _react2.default.createElement(_Tag2.default, { key: i,
        tag: tag,
        labelField: this.props.labelField,
        onDelete: this.handleDelete.bind(this, i),
        moveTag: moveTag,
        removeComponent: this.props.removeComponent,
        readOnly: this.props.readOnly,
        classNames: this.state.classNames });
    }.bind(this));

    // get the suggestions for the given query
    var query = this.state.query.trim(),
        selectedIndex = this.state.selectedIndex,
        suggestions = this.state.suggestions,
        placeholder = this.props.placeholder;

    var tagInput = !this.props.readOnly ? _react2.default.createElement(
      'div',
      { className: this.state.classNames.tagInput },
      _react2.default.createElement('input', { ref: 'input',
        className: this.state.classNames.tagInputField,
        type: 'text',
        placeholder: placeholder,
        'aria-label': placeholder,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        onPaste: this.handlePaste }),
      _react2.default.createElement(_Suggestions2.default, { query: query,
        suggestions: suggestions,
        selectedIndex: selectedIndex,
        handleClick: this.handleSuggestionClick,
        handleHover: this.handleSuggestionHover,
        minQueryLength: this.props.minQueryLength,
        shouldRenderSuggestions: this.props.shouldRenderSuggestions,
        classNames: this.state.classNames })
    ) : null;

    return _react2.default.createElement(
      'div',
      { className: this.state.classNames.tags },
      _react2.default.createElement(
        'div',
        { className: this.state.classNames.selected },
        tagItems,
        this.props.inline && tagInput
      ),
      !this.props.inline && tagInput
    );
  }
});

module.exports = {
  WithContext: (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ReactTags),
  WithOutContext: ReactTags,
  Keys: Keys
};