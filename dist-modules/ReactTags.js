'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _lodash = require('lodash');

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Constants


var ReactTags = function (_Component) {
  _inherits(ReactTags, _Component);

  function ReactTags(props) {
    _classCallCheck(this, ReactTags);

    var _this = _possibleConstructorReturn(this, (ReactTags.__proto__ || Object.getPrototypeOf(ReactTags)).call(this, props));

    _this.getTagItems = function () {
      var _this$props = _this.props,
          tags = _this$props.tags,
          labelField = _this$props.labelField,
          removeComponent = _this$props.removeComponent,
          readOnly = _this$props.readOnly,
          handleDrag = _this$props.handleDrag;
      var classNames = _this.state.classNames;

      var moveTag = handleDrag ? _this.moveTag : null;
      return tags.map(function (tag, index) {
        return _react2.default.createElement(_Tag2.default, {
          key: tag.id,
          index: index,
          tag: tag,
          labelField: labelField,
          onDelete: _this.handleDelete.bind(_this, index),
          moveTag: moveTag,
          removeComponent: removeComponent,
          onTagClicked: _this.handleTagClick.bind(_this, index),
          readOnly: readOnly,
          classNames: classNames
        });
      });
    };

    _this.state = {
      suggestions: _this.props.suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false
    };

    _this.handleFocus = _this.handleFocus.bind(_this);
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        classNames: _extends({}, _constants.DEFAULT_CLASSNAMES, this.props.classNames)
      });
    }
  }, {
    key: 'resetAndFocusInput',
    value: function resetAndFocusInput() {
      this.setState({ query: '' });
      if (this.textInput) {
        this.textInput.value = '';
        this.textInput.focus();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          autofocus = _props.autofocus,
          readOnly = _props.readOnly;

      if (autofocus && !readOnly) {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: 'filteredSuggestions',
    value: function filteredSuggestions(query, suggestions) {
      if (this.props.handleFilterSuggestions) {
        return this.props.handleFilterSuggestions(query, suggestions);
      }

      return suggestions.filter(function (item) {
        return item.text.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
      this.setState({
        suggestions: suggestions,
        classNames: _extends({}, _constants.DEFAULT_CLASSNAMES, props.classNames)
      });
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(i, e) {
      this.props.handleDelete(i, e);
      if (!this.props.resetInputOnDelete) {
        this.textInput && this.textInput.focus();
      } else {
        this.resetAndFocusInput();
      }
      e.stopPropagation();
    }
  }, {
    key: 'handleTagClick',
    value: function handleTagClick(i, e) {
      if (this.props.handleTagClick) {
        this.props.handleTagClick(i, e);
      }
      if (!this.props.resetInputOnDelete) {
        this.textInput && this.textInput.focus();
      } else {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      if (this.props.handleInputChange) {
        this.props.handleInputChange(e.target.value.trim());
      }

      var query = e.target.value.trim();
      var suggestions = this.filteredSuggestions(query, this.props.suggestions);

      var selectedIndex = this.state.selectedIndex;


      this.setState({
        query: query,
        suggestions: suggestions,
        selectedIndex: selectedIndex >= suggestions.length ? suggestions.length - 1 : selectedIndex
      });
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      var value = e.target.value.trim();
      if (this.props.handleInputFocus) {
        this.props.handleInputFocus(value);
      }
      this.setState({ isFocused: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      var value = e.target.value.trim();
      if (this.props.handleInputBlur) {
        this.props.handleInputBlur(value);
        if (this.textInput) {
          this.textInput.value = '';
        }
      }
      this.setState({ isFocused: false });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var _state = this.state,
          query = _state.query,
          selectedIndex = _state.selectedIndex,
          suggestions = _state.suggestions,
          selectionMode = _state.selectionMode;

      // hide suggestions menu on escape

      if (e.keyCode === _constants.KEYS.ESCAPE) {
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
        if (e.keyCode !== _constants.KEYS.TAB || query !== '') {
          e.preventDefault();
        }

        var selectedQuery = selectionMode && selectedIndex !== -1 ? suggestions[selectedIndex] : { id: query, text: query };

        if (selectedQuery !== '') {
          this.addTag(selectedQuery);
        }
      }

      // when backspace key is pressed and query is blank, delete tag
      if (e.keyCode === _constants.KEYS.BACKSPACE && query === '' && this.props.allowDeleteFromEmptyInput) {
        this.handleDelete(this.props.tags.length - 1, e);
      }

      // up arrow
      if (e.keyCode === _constants.KEYS.UP_ARROW) {
        e.preventDefault();
        this.setState({
          selectedIndex: selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1,
          selectionMode: true
        });
      }

      // down arrow
      if (e.keyCode === _constants.KEYS.DOWN_ARROW) {
        e.preventDefault();
        this.setState({
          selectedIndex: suggestions.length === 0 ? -1 : (selectedIndex + 1) % suggestions.length,
          selectionMode: true
        });
      }
    }
  }, {
    key: 'handlePaste',
    value: function handlePaste(e) {
      var _this2 = this;

      if (!this.props.allowAdditionFromPaste) {
        return;
      }

      e.preventDefault();

      var clipboardData = e.clipboardData || window.clipboardData;
      var pastedText = clipboardData.getData('text');

      // Used to determine how the pasted content is split.
      var delimiterRegExp = (0, _utils.buildRegExpFromDelimiters)(this.props.delimiters);
      var tags = pastedText.split(delimiterRegExp);

      // Only add unique tags
      (0, _lodash.uniq)(tags).forEach(function (tag) {
        return _this2.addTag({ id: tag, text: tag });
      });
    }
  }, {
    key: 'addTag',
    value: function addTag(tag) {
      if (!tag.id && !tag.text) {
        return;
      }
      var tags = this.props.tags;

      var existingKeys = tags.map(function (tag) {
        return tag.id.toLowerCase();
      });
      // Return if tag has been already added
      if (existingKeys.indexOf(tag.id.toLowerCase()) >= 0) {
        return;
      }
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
        query: '',
        selectionMode: false,
        selectedIndex: -1
      });

      this.resetAndFocusInput();
    }
  }, {
    key: 'handleSuggestionClick',
    value: function handleSuggestionClick(i, e) {
      this.addTag(this.state.suggestions[i]);
    }
  }, {
    key: 'handleSuggestionHover',
    value: function handleSuggestionHover(i, e) {
      this.setState({
        selectedIndex: i,
        selectionMode: true
      });
    }
  }, {
    key: 'moveTag',
    value: function moveTag(dragIndex, hoverIndex) {
      var tags = this.props.tags;

      // locate tags
      var dragTag = tags[dragIndex];

      // call handler with the index of the dragged tag
      // and the tag that is hovered
      this.props.handleDrag(dragTag, dragIndex, hoverIndex);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var tagItems = this.getTagItems();

      // get the suggestions for the given query
      var query = this.state.query.trim(),
          selectedIndex = this.state.selectedIndex,
          suggestions = this.state.suggestions,
          placeholder = this.props.placeholder,
          inputName = this.props.name,
          inputId = this.props.id,
          maxLength = this.props.maxLength;

      var tagInput = !this.props.readOnly ? _react2.default.createElement(
        'div',
        { className: this.state.classNames.tagInput },
        _react2.default.createElement('input', {
          ref: function ref(input) {
            _this3.textInput = input;
          },
          className: this.state.classNames.tagInputField,
          type: 'text',
          placeholder: placeholder,
          'aria-label': placeholder,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          onPaste: this.handlePaste,
          name: inputName,
          id: inputId,
          maxLength: maxLength,
          value: this.props.inputValue
        }),
        _react2.default.createElement(_Suggestions2.default, {
          query: query,
          suggestions: suggestions,
          selectedIndex: selectedIndex,
          handleClick: this.handleSuggestionClick,
          handleHover: this.handleSuggestionHover,
          minQueryLength: this.props.minQueryLength,
          shouldRenderSuggestions: this.props.shouldRenderSuggestions,
          isFocused: this.state.isFocused,
          classNames: this.state.classNames
        })
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
  }]);

  return ReactTags;
}(_react.Component);

ReactTags.propTypes = {
  placeholder: _propTypes2.default.string,
  labelField: _propTypes2.default.string,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.string.isRequired
  })),
  delimiters: _propTypes2.default.arrayOf(_propTypes2.default.number),
  autofocus: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  handleDelete: _propTypes2.default.func,
  handleAddition: _propTypes2.default.func,
  handleDrag: _propTypes2.default.func,
  handleFilterSuggestions: _propTypes2.default.func,
  handleTagClick: _propTypes2.default.func,
  allowDeleteFromEmptyInput: _propTypes2.default.bool,
  allowAdditionFromPaste: _propTypes2.default.bool,
  resetInputOnDelete: _propTypes2.default.bool,
  handleInputChange: _propTypes2.default.func,
  handleInputFocus: _propTypes2.default.func,
  handleInputBlur: _propTypes2.default.func,
  minQueryLength: _propTypes2.default.number,
  shouldRenderSuggestions: _propTypes2.default.func,
  removeComponent: _propTypes2.default.func,
  autocomplete: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  readOnly: _propTypes2.default.bool,
  classNames: _propTypes2.default.object,
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  maxLength: _propTypes2.default.string,
  inputValue: _propTypes2.default.string,
  tags: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.any.isRequired
  }))
};
ReactTags.defaultProps = {
  placeholder: _constants.DEFAULT_PLACEHOLDER,
  suggestions: [],
  delimiters: [_constants.KEYS.ENTER, _constants.KEYS.TAB],
  autofocus: true,
  inline: true,
  handleDelete: _lodash.noop,
  handleAddition: _lodash.noop,
  allowDeleteFromEmptyInput: true,
  allowAdditionFromPaste: true,
  resetInputOnDelete: true,
  minQueryLength: 2,
  autocomplete: false,
  readOnly: false
};


module.exports = {
  WithContext: (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ReactTags),
  WithOutContext: ReactTags,
  KEYS: _constants.KEYS
};