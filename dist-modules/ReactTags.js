"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Suggestions = require("./Suggestions");

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tag = require("./Tag");

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Constants
var Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27
};

var DEFAULT_PLACEHOLDER = "Add new tag";

var DefaultClassNames = {
  tags: "ReactTags__tags",
  tagInput: "ReactTags__tagInput",
  tagInputField: "ReactTags__tagInputField",
  selected: "ReactTags__selected",
  tag: "ReactTags__tag",
  remove: "ReactTags__remove",
  suggestions: "ReactTags__suggestions",
  activeSuggestion: "ReactTags__activeSuggestion"
};

var ReactTags = function (_Component) {
  _inherits(ReactTags, _Component);

  function ReactTags(props) {
    _classCallCheck(this, ReactTags);

    var _this = _possibleConstructorReturn(this, (ReactTags.__proto__ || Object.getPrototypeOf(ReactTags)).call(this, props));

    _this.state = {
      suggestions: _this.props.suggestions,
      query: "",
      selectedIndex: -1,
      selectionMode: false
    };

    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.moveTag = _this.moveTag.bind(_this);
    _this.handlePaste = _this.handlePaste.bind(_this);
    _this.resetAndFocusInput = _this.resetAndFocusInput.bind(_this);
    _this.handleSuggestionHover = _this.handleSuggestionHover.bind(_this);
    _this.handleSuggestionClick = _this.handleSuggestionClick.bind(_this);
    return _this;
  }

  _createClass(ReactTags, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        classNames: _extends({}, DefaultClassNames, this.props.classNames)
      });
    }
  }, {
    key: "resetAndFocusInput",
    value: function resetAndFocusInput() {
      this.textInput.value = "";
      this.textInput.focus();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          autofocus = _props.autofocus,
          readOnly = _props.readOnly;

      if (autofocus && !readOnly) {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: "filteredSuggestions",
    value: function filteredSuggestions(query, suggestions) {
      if (this.props.handleFilterSuggestions) {
        return this.props.handleFilterSuggestions(query, suggestions);
      }

      return suggestions.filter(function (item) {
        return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
      this.setState({
        suggestions: suggestions,
        classNames: _extends({}, DefaultClassNames, props.classNames)
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(i, e) {
      this.props.handleDelete(i);
      this.setState({ query: "" });
      this.resetAndFocusInput();
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (this.props.handleInputChange) {
        this.props.handleInputChange(e.target.value.trim());
      }

      var query = e.target.value.trim();
      var suggestions = this.filteredSuggestions(query, this.props.suggestions);

      var selectedIndex = this.state.selectedIndex;
      if (selectedIndex >= suggestions.length) {
        selectedIndex = suggestions.length - 1;
      }

      this.setState({
        query: query,
        suggestions: suggestions,
        selectedIndex: selectedIndex
      });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      var value = e.target.value.trim();
      if (this.props.handleInputBlur) {
        this.props.handleInputBlur(value);
        this.textInput.value = "";
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _state = this.state,
          query = _state.query,
          selectedIndex = _state.selectedIndex,
          suggestions = _state.suggestions;

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

        var _state2 = this.state,
            _selectedIndex = _state2.selectedIndex,
            _suggestions = _state2.suggestions;


        _selectedIndex = _selectedIndex <= 0 ? _suggestions.length - 1 : _selectedIndex - 1;

        this.setState({
          selectedIndex: _selectedIndex,
          selectionMode: true
        });
      }

      // down arrow
      if (e.keyCode === Keys.DOWN_ARROW) {
        e.preventDefault();
        this.setState({
          selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
          selectionMode: true
        });
      }
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(e) {
      var _this2 = this;

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
      }).join(""));

      var clipboardData = e.clipboardData || window.clipboardData;
      var string = clipboardData.getData("text");
      var regExp = new RegExp("[" + delimiterChars + "]+");
      string.split(regExp).forEach(function (tag) {
        return _this2.props.handleAddition(tag);
      });
    }
  }, {
    key: "addTag",
    value: function addTag(tag) {
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

      this.resetAndFocusInput();
    }
  }, {
    key: "handleSuggestionClick",
    value: function handleSuggestionClick(i, e) {
      this.addTag(this.state.suggestions[i]);
    }
  }, {
    key: "handleSuggestionHover",
    value: function handleSuggestionHover(i, e) {
      this.setState({
        selectedIndex: i,
        selectionMode: true
      });
    }
  }, {
    key: "moveTag",
    value: function moveTag(dragIndex, hoverIndex) {
      var tags = this.props.tags;

      // locate tags
      var dragTag = tags[dragIndex];

      // call handler with the index of the dragged tag
      // and the tag that is hovered
      this.props.handleDrag(dragTag, dragIndex, hoverIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var moveTag = this.props.handleDrag ? this.moveTag : null;

      var tagItems = this.props.tags.map(function (tag, i) {
        return _react2.default.createElement(_Tag2.default, {
          key: tag.id,
          index: i,
          tag: tag,
          labelField: this.props.labelField,
          onDelete: this.handleDelete.bind(this, i),
          moveTag: moveTag,
          removeComponent: this.props.removeComponent,
          readOnly: this.props.readOnly,
          classNames: this.state.classNames
        });
      }.bind(this));

      // get the suggestions for the given query
      var query = this.state.query.trim(),
          selectedIndex = this.state.selectedIndex,
          suggestions = this.state.suggestions,
          placeholder = this.props.placeholder,
          inputName = this.props.name,
          inputId = this.props.id,
          maxLength = this.props.maxLength;

      var tagInput = !this.props.readOnly ? _react2.default.createElement(
        "div",
        { className: this.state.classNames.tagInput },
        _react2.default.createElement("input", {
          ref: function ref(input) {
            _this3.textInput = input;
          },
          className: this.state.classNames.tagInputField,
          type: "text",
          placeholder: placeholder,
          "aria-label": placeholder,
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          onPaste: this.handlePaste,
          name: inputName,
          id: inputId,
          maxLength: maxLength
        }),
        _react2.default.createElement(_Suggestions2.default, {
          query: query,
          suggestions: suggestions,
          selectedIndex: selectedIndex,
          handleClick: this.handleSuggestionClick,
          handleHover: this.handleSuggestionHover,
          minQueryLength: this.props.minQueryLength,
          shouldRenderSuggestions: this.props.shouldRenderSuggestions,
          classNames: this.state.classNames
        })
      ) : null;

      return _react2.default.createElement(
        "div",
        { className: this.state.classNames.tags },
        _react2.default.createElement(
          "div",
          { className: this.state.classNames.selected },
          tagItems,
          this.props.inline && tagInput
        ),
        !this.props.inline && tagInput
      );
    }
  }]);

  return ReactTags;
}(_react.Component);

ReactTags.PropTypes = {
  placeholder: _propTypes2.default.string,
  labelField: _propTypes2.default.string,
  suggestions: _propTypes2.default.array,
  delimiters: _propTypes2.default.array,
  autofocus: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  handleDelete: _propTypes2.default.func.isRequired,
  handleAddition: _propTypes2.default.func.isRequired,
  handleDrag: _propTypes2.default.func,
  handleFilterSuggestions: _propTypes2.default.func,
  allowDeleteFromEmptyInput: _propTypes2.default.bool,
  handleInputChange: _propTypes2.default.func,
  handleInputBlur: _propTypes2.default.func,
  minQueryLength: _propTypes2.default.number,
  shouldRenderSuggestions: _propTypes2.default.func,
  removeComponent: _propTypes2.default.func,
  autocomplete: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  readOnly: _propTypes2.default.bool,
  classNames: _propTypes2.default.object,
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  maxLength: _propTypes2.default.string
};

ReactTags.defaultProps = {
  placeholder: DEFAULT_PLACEHOLDER,
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

module.exports = {
  WithContext: (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ReactTags),
  WithOutContext: ReactTags,
  Keys: Keys
};