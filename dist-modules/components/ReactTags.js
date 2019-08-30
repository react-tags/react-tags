'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _memoizeOne = require('memoize-one');

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var updateClassNames = (0, _memoizeOne2.default)(function (classNames) {
  return {
    classNames: _extends({}, _constants.DEFAULT_CLASSNAMES, classNames)
  };
});

var ReactTags = function (_Component) {
  _inherits(ReactTags, _Component);

  function ReactTags(props) {
    _classCallCheck(this, ReactTags);

    var _this = _possibleConstructorReturn(this, (ReactTags.__proto__ || Object.getPrototypeOf(ReactTags)).call(this, props));

    _initialiseProps.call(_this);

    if (!props.inline) {
      /* eslint-disable no-console */
      console.warn('[Deprecation] The inline attribute is deprecated and will be removed in v7.x.x, please use inputFieldPosition instead.');
      /* eslint-enable no-console */
    }

    var suggestions = props.suggestions,
        classNames = props.classNames;

    _this.state = {
      suggestions: suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false,
      classNames: _extends({}, _constants.DEFAULT_CLASSNAMES, classNames)
    };
    // TODO : remove classNames from state and change updateClassNames to instance function
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
      var _this2 = this;

      if (this.props.handleFilterSuggestions) {
        return this.props.handleFilterSuggestions(query, suggestions);
      }

      var exactSuggestions = suggestions.filter(function (item) {
        return _this2.getQueryIndex(query, item) === 0;
      });
      var partialSuggestions = suggestions.filter(function (item) {
        return _this2.getQueryIndex(query, item) > 0;
      });
      return exactSuggestions.concat(partialSuggestions);
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
        this.props.handleInputChange(e.target.value);
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
      var value = e.target.value;
      if (this.props.handleInputFocus) {
        this.props.handleInputFocus(value);
      }
      this.setState({ isFocused: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      var value = e.target.value;
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

        var selectedQuery = selectionMode && selectedIndex !== -1 ? suggestions[selectedIndex] : _defineProperty({ id: query }, this.props.labelField, query);

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
      var _this3 = this;

      if (!this.props.allowAdditionFromPaste) {
        return;
      }

      e.preventDefault();

      var clipboardData = e.clipboardData || window.clipboardData;
      var clipboardText = clipboardData.getData('text');

      var _props$maxLength = this.props.maxLength,
          maxLength = _props$maxLength === undefined ? clipboardText.length : _props$maxLength;


      var maxTextLength = Math.min(maxLength, clipboardText.length);
      var pastedText = clipboardData.getData('text').substr(0, maxTextLength);

      // Used to determine how the pasted content is split.
      var delimiterRegExp = (0, _utils.buildRegExpFromDelimiters)(this.props.delimiters);
      var tags = pastedText.split(delimiterRegExp);

      // Only add unique tags
      (0, _uniq2.default)(tags).forEach(function (tag) {
        return _this3.addTag(_defineProperty({ id: tag }, _this3.props.labelField, tag));
      });
    }
  }, {
    key: 'handleSuggestionClick',
    value: function handleSuggestionClick(i) {
      this.addTag(this.state.suggestions[i]);
    }
  }, {
    key: 'handleSuggestionHover',
    value: function handleSuggestionHover(i) {
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
      var _this4 = this;

      var tagItems = this.getTagItems();

      // get the suggestions for the given query
      var query = this.state.query.trim(),
          selectedIndex = this.state.selectedIndex,
          suggestions = this.state.suggestions;

      var _props2 = this.props,
          placeholder = _props2.placeholder,
          inputName = _props2.name,
          inputId = _props2.id,
          maxLength = _props2.maxLength,
          inline = _props2.inline,
          inputFieldPosition = _props2.inputFieldPosition;


      var position = !inline ? _constants.INPUT_FIELD_POSITIONS.BOTTOM : inputFieldPosition;
      var InputHtmlTag = this.props.inputType;
      var tagInput = !this.props.readOnly ? _react2.default.createElement(
        'div',
        { className: this.state.classNames.tagInput },
        _react2.default.createElement(InputHtmlTag, {
          ref: function ref(input) {
            _this4.textInput = input;
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
          labelField: this.props.labelField,
          selectedIndex: selectedIndex,
          handleClick: this.handleSuggestionClick,
          handleHover: this.handleSuggestionHover,
          minQueryLength: this.props.minQueryLength,
          shouldRenderSuggestions: this.props.shouldRenderSuggestions,
          isFocused: this.state.isFocused,
          classNames: this.state.classNames,
          renderSuggestion: this.props.renderSuggestion
        })
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.state.classNames.tags, 'react-tags-wrapper') },
        position === _constants.INPUT_FIELD_POSITIONS.TOP && tagInput,
        _react2.default.createElement(
          'div',
          { className: this.state.classNames.selected },
          tagItems,
          position === _constants.INPUT_FIELD_POSITIONS.INLINE && tagInput
        ),
        position === _constants.INPUT_FIELD_POSITIONS.BOTTOM && tagInput
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      var classNames = props.classNames;

      return updateClassNames(classNames);
    }
  }]);

  return ReactTags;
}(_react.Component);

ReactTags.propTypes = {
  placeholder: _propTypes2.default.string,
  labelField: _propTypes2.default.string,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired
  })),
  delimiters: _propTypes2.default.arrayOf(_propTypes2.default.number),
  autofocus: _propTypes2.default.bool,
  inline: _propTypes2.default.bool, // TODO: Remove in v7.x.x
  inputFieldPosition: _propTypes2.default.oneOf([_constants.INPUT_FIELD_POSITIONS.INLINE, _constants.INPUT_FIELD_POSITIONS.TOP, _constants.INPUT_FIELD_POSITIONS.BOTTOM]),
  handleDelete: _propTypes2.default.func,
  handleAddition: _propTypes2.default.func,
  handleDrag: _propTypes2.default.func,
  handleFilterSuggestions: _propTypes2.default.func,
  handleTagClick: _propTypes2.default.func,
  allowDeleteFromEmptyInput: _propTypes2.default.bool,
  allowAdditionFromPaste: _propTypes2.default.bool,
  allowDragDrop: _propTypes2.default.bool,
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
  maxLength: _propTypes2.default.number,
  inputValue: _propTypes2.default.string,
  tags: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string
  })),
  allowUnique: _propTypes2.default.bool,
  renderSuggestion: _propTypes2.default.func,
  inputType: _propTypes2.default.oneOf(["input", "textarea"])
};
ReactTags.defaultProps = {
  placeholder: _constants.DEFAULT_PLACEHOLDER,
  labelField: _constants.DEFAULT_LABEL_FIELD,
  suggestions: [],
  delimiters: [_constants.KEYS.ENTER, _constants.KEYS.TAB],
  autofocus: true,
  inline: true, // TODO: Remove in v7.x.x
  inputFieldPosition: _constants.INPUT_FIELD_POSITIONS.INLINE,
  handleDelete: _noop2.default,
  handleAddition: _noop2.default,
  allowDeleteFromEmptyInput: true,
  allowAdditionFromPaste: true,
  resetInputOnDelete: true,
  autocomplete: false,
  readOnly: false,
  allowUnique: true,
  allowDragDrop: true,
  tags: [],
  inputType: "input"
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.getQueryIndex = function (query, item) {
    return item[_this5.props.labelField].toLowerCase().indexOf(query.toLowerCase());
  };

  this.addTag = function (tag) {
    var _props3 = _this5.props,
        tags = _props3.tags,
        labelField = _props3.labelField,
        allowUnique = _props3.allowUnique;

    if (!tag.id || !tag[labelField]) {
      return;
    }
    var existingKeys = tags.map(function (tag) {
      return tag.id.toLowerCase();
    });

    // Return if tag has been already added
    if (allowUnique && existingKeys.indexOf(tag.id.toLowerCase()) >= 0) {
      return;
    }
    if (_this5.props.autocomplete) {
      var possibleMatches = _this5.filteredSuggestions(tag[labelField], _this5.props.suggestions);

      if (_this5.props.autocomplete === 1 && possibleMatches.length === 1 || _this5.props.autocomplete === true && possibleMatches.length) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    _this5.props.handleAddition(tag);

    // reset the state
    _this5.setState({
      query: '',
      selectionMode: false,
      selectedIndex: -1
    });

    _this5.resetAndFocusInput();
  };

  this.getTagItems = function () {
    var _props4 = _this5.props,
        tags = _props4.tags,
        labelField = _props4.labelField,
        removeComponent = _props4.removeComponent,
        readOnly = _props4.readOnly,
        allowDragDrop = _props4.allowDragDrop;
    var classNames = _this5.state.classNames;

    var moveTag = allowDragDrop ? _this5.moveTag : null;
    return tags.map(function (tag, index) {
      return _react2.default.createElement(_Tag2.default, {
        key: tag.id + '-' + index,
        index: index,
        tag: tag,
        labelField: labelField,
        onDelete: _this5.handleDelete.bind(_this5, index),
        moveTag: moveTag,
        removeComponent: removeComponent,
        onTagClicked: _this5.handleTagClick.bind(_this5, index),
        readOnly: readOnly,
        classNames: classNames,
        allowDragDrop: allowDragDrop
      });
    });
  };
};

module.exports = {
  WithContext: (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ReactTags),
  WithOutContext: ReactTags,
  KEYS: _constants.KEYS
};