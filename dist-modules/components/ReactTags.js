"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "KEYS", {
  enumerable: true,
  get: function get() {
    return _constants.KEYS;
  }
});
exports.WithOutContext = exports.WithContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _noop = _interopRequireDefault(require("lodash/noop"));
var _uniq = _interopRequireDefault(require("lodash/uniq"));
var _ClearAllTags = _interopRequireDefault(require("./ClearAllTags"));
var _Suggestions = _interopRequireDefault(require("./Suggestions"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Tag = _interopRequireDefault(require("./Tag"));
var _utils = require("./utils");
var _constants = require("./constants");
var _defineProperty2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } //Constants
var ReactTags = exports.WithOutContext = /*#__PURE__*/function (_Component) {
  _inherits(ReactTags, _Component);
  var _super = _createSuper(ReactTags);
  function ReactTags(props) {
    var _this;
    _classCallCheck(this, ReactTags);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "filteredSuggestions", function (query) {
      var suggestions = _this.props.suggestions;
      if (_this.props.allowUnique) {
        var existingTags = _this.props.tags.map(function (tag) {
          return tag.id.trim().toLowerCase();
        });
        suggestions = suggestions.filter(function (suggestion) {
          return !existingTags.includes(suggestion.id.toLowerCase());
        });
      }
      if (_this.props.handleFilterSuggestions) {
        return _this.props.handleFilterSuggestions(query, suggestions);
      }
      var exactSuggestions = suggestions.filter(function (item) {
        return _this.getQueryIndex(query, item) === 0;
      });
      var partialSuggestions = suggestions.filter(function (item) {
        return _this.getQueryIndex(query, item) > 0;
      });
      return exactSuggestions.concat(partialSuggestions);
    });
    _defineProperty(_assertThisInitialized(_this), "getQueryIndex", function (query, item) {
      return item[_this.props.labelField].toLowerCase().indexOf(query.toLowerCase());
    });
    _defineProperty(_assertThisInitialized(_this), "resetAndFocusInput", function () {
      _this.setState({
        query: ''
      });
      if (_this.textInput) {
        _this.textInput.value = '';
        _this.textInput.focus();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "updateSuggestions", function () {
      var _this$state = _this.state,
        query = _this$state.query,
        selectedIndex = _this$state.selectedIndex;
      var suggestions = _this.filteredSuggestions(query);
      _this.setState({
        suggestions: suggestions,
        selectedIndex: selectedIndex >= suggestions.length ? suggestions.length - 1 : selectedIndex
      });
    });
    _defineProperty(_assertThisInitialized(_this), "addTag", function (tag) {
      var _this$props = _this.props,
        tags = _this$props.tags,
        labelField = _this$props.labelField,
        allowUnique = _this$props.allowUnique;
      var currentEditIndex = _this.state.currentEditIndex;
      if (!tag.id || !tag[labelField]) {
        return;
      }
      if (currentEditIndex === -1) {
        if (_this.tagLimitReached()) {
          _this.setState({
            error: _constants.ERRORS.TAG_LIMIT
          });
          _this.resetAndFocusInput();
          return;
        }
        _this.setState({
          error: ''
        });
      }
      var existingKeys = tags.map(function (tag) {
        return tag.id.toLowerCase();
      });

      // Return if tag has been already added
      if (allowUnique && existingKeys.indexOf(tag.id.trim().toLowerCase()) >= 0) {
        return;
      }
      if (_this.props.autocomplete) {
        var possibleMatches = _this.filteredSuggestions(tag[labelField]);
        if (_this.props.autocomplete === 1 && possibleMatches.length === 1 || _this.props.autocomplete === true && possibleMatches.length) {
          tag = possibleMatches[0];
        }
      }

      // call method to add
      if (currentEditIndex !== -1 && _this.props.onTagUpdate) _this.props.onTagUpdate(currentEditIndex, tag);else _this.props.handleAddition(tag);

      // reset the state
      _this.setState({
        query: '',
        selectionMode: false,
        selectedIndex: -1,
        currentEditIndex: -1
      });
      _this.resetAndFocusInput();
    });
    _defineProperty(_assertThisInitialized(_this), "clearAll", function () {
      if (_this.props.onClearAll) {
        _this.props.onClearAll();
      }
      _this.setState({
        error: ''
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getTagItems", function () {
      var _this$props2 = _this.props,
        tags = _this$props2.tags,
        labelField = _this$props2.labelField,
        removeComponent = _this$props2.removeComponent,
        readOnly = _this$props2.readOnly,
        allowDragDrop = _this$props2.allowDragDrop,
        hasNotesField = _this$props2.hasNotesField,
        isProtectedField = _this$props2.isProtectedField;
      var classNames = _objectSpread(_objectSpread({}, _constants.DEFAULT_CLASSNAMES), _this.props.classNames);
      var _this$state2 = _this.state,
        currentEditIndex = _this$state2.currentEditIndex,
        query = _this$state2.query;
      var moveTag = allowDragDrop ? _this.moveTag : null;
      return tags.map(function (tag, index) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
          key: index
        }, currentEditIndex === index ? /*#__PURE__*/_react["default"].createElement("div", {
          className: classNames.editTagInput
        }, /*#__PURE__*/_react["default"].createElement("input", {
          ref: function ref(input) {
            _this.tagInput = input;
          },
          onFocus: _this.handleFocus,
          value: query,
          onChange: _this.handleChange,
          onKeyDown: _this.handleKeyDown,
          onBlur: _this.handleBlur,
          className: classNames.editTagInputField,
          onPaste: _this.handlePaste,
          "data-testid": "tag-edit"
        })) : /*#__PURE__*/_react["default"].createElement(_Tag["default"], {
          index: index,
          tag: tag,
          labelField: labelField,
          onDelete: _this.handleDelete.bind(_assertThisInitialized(_this), index),
          moveTag: moveTag,
          removeComponent: removeComponent,
          onTagClicked: _this.handleTagClick.bind(_assertThisInitialized(_this), index, tag),
          readOnly: readOnly,
          classNames: classNames,
          allowDragDrop: allowDragDrop,
          hasNotesField: hasNotesField,
          isProtectedField: isProtectedField,
          onNotesClicked: _this.handleNotesClick.bind(_assertThisInitialized(_this), index, tag)
        }));
      });
    });
    if (!props.inline) {
      /* eslint-disable no-console */
      console.warn('[Deprecation] The inline attribute is deprecated and will be removed in v7.x.x, please use inputFieldPosition instead.');
      /* eslint-enable no-console */
    }

    var _suggestions = props.suggestions;
    _this.state = {
      suggestions: _suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false,
      ariaLiveStatus: '',
      currentEditIndex: -1,
      error: ''
    };
    _this.reactTagsRef = /*#__PURE__*/(0, _react.createRef)();
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.moveTag = _this.moveTag.bind(_assertThisInitialized(_this));
    _this.handlePaste = _this.handlePaste.bind(_assertThisInitialized(_this));
    _this.handleSuggestionHover = _this.handleSuggestionHover.bind(_assertThisInitialized(_this));
    _this.handleSuggestionClick = _this.handleSuggestionClick.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ReactTags, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
        autofocus = _this$props3.autofocus,
        readOnly = _this$props3.readOnly;
      if (autofocus && !readOnly) {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!(0, _isEqual["default"])(prevProps.suggestions, this.props.suggestions)) {
        this.updateSuggestions();
      }
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(index, event) {
      event.preventDefault();
      event.stopPropagation();
      var currentTags = this.props.tags.slice();
      // Early exit from the function if the array
      // is already empty
      if (currentTags.length === 0) {
        return;
      }
      this.setState({
        error: ''
      });
      var ariaLiveStatus = "Tag at index ".concat(index, " with value ").concat(currentTags[index].id, " deleted.");
      this.props.handleDelete(index, event);
      var allTags = this.reactTagsRef.current.querySelectorAll('.ReactTags__remove');
      var nextElementToFocus, nextIndex, nextTag;
      if (index === 0 && currentTags.length > 1) {
        nextElementToFocus = allTags[0];
        nextIndex = 0;
        nextTag = currentTags[1];
      } else {
        nextElementToFocus = allTags[index - 1];
        nextIndex = index - 1;
        nextTag = currentTags[nextIndex];
      }
      if (!nextElementToFocus) {
        nextIndex = -1;
        nextElementToFocus = this.textInput;
      }
      if (nextIndex >= 0) {
        ariaLiveStatus += " Tag at index ".concat(nextIndex, " with value ").concat(nextTag.id, " focussed. Press backspace to remove");
      } else {
        ariaLiveStatus += 'Input focussed. Press enter to add a new tag';
      }
      nextElementToFocus.focus();
      this.setState({
        ariaLiveStatus: ariaLiveStatus
      });
    }
  }, {
    key: "handleTagClick",
    value: function handleTagClick(i, tag, e) {
      var _this2 = this;
      var _this$props4 = this.props,
        editable = _this$props4.editable,
        handleTagClick = _this$props4.handleTagClick,
        labelField = _this$props4.labelField;
      if (editable) {
        this.setState({
          currentEditIndex: i,
          query: tag[labelField]
        }, function () {
          _this2.tagInput.focus();
        });
      }
      if (handleTagClick) {
        handleTagClick(i, e);
      }
    }
  }, {
    key: "handleNotesClick",
    value: function handleNotesClick(i, tag, e) {
      var _this$props5 = this.props,
        editable = _this$props5.editable,
        handleNotesClick = _this$props5.handleNotesClick,
        labelField = _this$props5.labelField;
      // if (editable) {
      //   this.setState({ currentEditIndex: i, query: tag[labelField] }, () => {
      //     this.tagInput.focus();
      //   });
      // }
      console.warn('ON NOTES CLICK');
      if (handleNotesClick) {
        handleNotesClick(i, e);
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (this.props.handleInputChange) {
        this.props.handleInputChange(e.target.value, e);
      }
      var query = e.target.value.trim();
      this.setState({
        query: query
      }, this.updateSuggestions);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(event) {
      var value = event.target.value;
      if (this.props.handleInputFocus) {
        this.props.handleInputFocus(value, event);
      }
      this.setState({
        isFocused: true
      });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(event) {
      var value = event.target.value;
      if (this.props.handleInputBlur) {
        this.props.handleInputBlur(value, event);
        if (this.textInput) {
          this.textInput.value = '';
        }
      }
      this.setState({
        isFocused: false,
        currentEditIndex: -1
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this$state3 = this.state,
        query = _this$state3.query,
        selectedIndex = _this$state3.selectedIndex,
        suggestions = _this$state3.suggestions,
        selectionMode = _this$state3.selectionMode;

      // hide suggestions menu on escape
      if (e.keyCode === _constants.KEYS.ESCAPE) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          selectedIndex: -1,
          selectionMode: false,
          suggestions: [],
          currentEditIndex: -1
        });
      }

      // When one of the terminating keys is pressed, add current query to the tags.
      // If no text is typed in so far, ignore the action - so we don't end up with a terminating
      // character typed in.
      if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
        if (e.keyCode !== _constants.KEYS.TAB || query !== '') {
          e.preventDefault();
        }
        var selectedQuery = selectionMode && selectedIndex !== -1 ? suggestions[selectedIndex] : _defineProperty({
          id: query.trim()
        }, this.props.labelField, query.trim());
        if (Object.keys(selectedQuery)) {
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
    key: "tagLimitReached",
    value: function tagLimitReached() {
      var _this$props6 = this.props,
        tags = _this$props6.tags,
        maxTags = _this$props6.maxTags;
      return maxTags && tags.length >= maxTags;
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(e) {
      var _this3 = this;
      if (!this.props.allowAdditionFromPaste) {
        return;
      }
      if (this.tagLimitReached()) {
        this.setState({
          error: _constants.ERRORS.TAG_LIMIT
        });
        this.resetAndFocusInput();
        return;
      }
      this.setState({
        error: ''
      });
      e.preventDefault();
      var clipboardData = e.clipboardData || window.clipboardData;
      var clipboardText = clipboardData.getData('text');
      var _this$props$maxLength = this.props.maxLength,
        maxLength = _this$props$maxLength === void 0 ? clipboardText.length : _this$props$maxLength;
      var maxTextLength = Math.min(maxLength, clipboardText.length);
      var pastedText = clipboardData.getData('text').substr(0, maxTextLength);

      // Used to determine how the pasted content is split.
      var delimiterRegExp = (0, _utils.buildRegExpFromDelimiters)(this.props.delimiters);
      var tags = pastedText.split(delimiterRegExp).map(function (tag) {
        return tag.trim();
      });

      // Only add unique tags
      (0, _uniq["default"])(tags).forEach(function (tag) {
        return _this3.addTag(_defineProperty({
          id: tag.trim()
        }, _this3.props.labelField, tag.trim()));
      });
    }
  }, {
    key: "handleSuggestionClick",
    value: function handleSuggestionClick(i) {
      this.addTag(this.state.suggestions[i]);
    }
  }, {
    key: "handleSuggestionHover",
    value: function handleSuggestionHover(i) {
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
      var _this4 = this;
      var tagItems = this.getTagItems();
      var classNames = _objectSpread(_objectSpread({}, _constants.DEFAULT_CLASSNAMES), this.props.classNames);

      // get the suggestions for the given query
      var query = this.state.query.trim(),
        selectedIndex = this.state.selectedIndex,
        suggestions = this.state.suggestions,
        error = this.state.error;
      var _this$props7 = this.props,
        placeholder = _this$props7.placeholder,
        inputName = _this$props7.name,
        inputId = _this$props7.id,
        maxLength = _this$props7.maxLength,
        inline = _this$props7.inline,
        inputFieldPosition = _this$props7.inputFieldPosition,
        inputValue = _this$props7.inputValue,
        inputProps = _this$props7.inputProps,
        clearAll = _this$props7.clearAll,
        tags = _this$props7.tags;
      var position = !inline ? _constants.INPUT_FIELD_POSITIONS.BOTTOM : inputFieldPosition;
      var tagInput = !this.props.readOnly ? /*#__PURE__*/_react["default"].createElement("div", {
        className: classNames.tagInput
      }, /*#__PURE__*/_react["default"].createElement("input", _extends({}, inputProps, {
        ref: function ref(input) {
          _this4.textInput = input;
        },
        className: classNames.tagInputField,
        type: "text",
        placeholder: placeholder,
        "aria-label": placeholder,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        onPaste: this.handlePaste,
        name: inputName,
        id: inputId,
        maxLength: maxLength,
        value: inputValue,
        "data-automation": "input",
        "data-testid": "input"
      })), /*#__PURE__*/_react["default"].createElement(_Suggestions["default"], {
        query: query,
        suggestions: suggestions,
        labelField: this.props.labelField,
        selectedIndex: selectedIndex,
        handleClick: this.handleSuggestionClick,
        handleHover: this.handleSuggestionHover,
        minQueryLength: this.props.minQueryLength,
        shouldRenderSuggestions: this.props.shouldRenderSuggestions,
        isFocused: this.state.isFocused,
        classNames: classNames,
        renderSuggestion: this.props.renderSuggestion
      }), clearAll && tags.length > 0 && /*#__PURE__*/_react["default"].createElement(_ClearAllTags["default"], {
        classNames: classNames,
        onClick: this.clearAll
      }), error && /*#__PURE__*/_react["default"].createElement("div", {
        "data-testid": "error",
        className: "ReactTags__error"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: "24",
        width: "24",
        fill: "#e03131"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
      })), error)) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(classNames.tags, 'react-tags-wrapper'),
        ref: this.reactTagsRef
      }, /*#__PURE__*/_react["default"].createElement("p", {
        role: "alert",
        className: "sr-only",
        style: {
          position: 'absolute',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          margin: '-1px',
          padding: 0,
          width: '1px',
          height: '1px',
          border: 0
        }
      }, this.state.ariaLiveStatus), position === _constants.INPUT_FIELD_POSITIONS.TOP && tagInput, /*#__PURE__*/_react["default"].createElement("div", {
        className: classNames.selected
      }, tagItems, position === _constants.INPUT_FIELD_POSITIONS.INLINE && tagInput), position === _constants.INPUT_FIELD_POSITIONS.BOTTOM && tagInput);
    }
  }]);
  return ReactTags;
}(_react.Component);
_defineProperty(ReactTags, "propTypes", (_defineProperty2 = {
  placeholder: _propTypes["default"].string,
  labelField: _propTypes["default"].string,
  hasNotesField: _propTypes["default"].string,
  isProtectedField: _propTypes["default"].string,
  suggestions: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired
  })),
  delimiters: _propTypes["default"].arrayOf(_propTypes["default"].number),
  autofocus: _propTypes["default"].bool,
  inline: _propTypes["default"].bool,
  // TODO: Remove in v7.x.x
  inputFieldPosition: _propTypes["default"].oneOf([_constants.INPUT_FIELD_POSITIONS.INLINE, _constants.INPUT_FIELD_POSITIONS.TOP, _constants.INPUT_FIELD_POSITIONS.BOTTOM]),
  handleDelete: _propTypes["default"].func,
  handleAddition: _propTypes["default"].func,
  onTagUpdate: _propTypes["default"].func,
  handleDrag: _propTypes["default"].func,
  handleFilterSuggestions: _propTypes["default"].func,
  handleTagClick: _propTypes["default"].func,
  handleNotesClick: _propTypes["default"].func,
  allowDeleteFromEmptyInput: _propTypes["default"].bool,
  allowAdditionFromPaste: _propTypes["default"].bool,
  allowDragDrop: _propTypes["default"].bool
}, _defineProperty(_defineProperty2, "hasNotesField", _propTypes["default"].string), _defineProperty(_defineProperty2, "isProtectedField", _propTypes["default"].string), _defineProperty(_defineProperty2, "handleInputChange", _propTypes["default"].func), _defineProperty(_defineProperty2, "handleInputFocus", _propTypes["default"].func), _defineProperty(_defineProperty2, "handleInputBlur", _propTypes["default"].func), _defineProperty(_defineProperty2, "minQueryLength", _propTypes["default"].number), _defineProperty(_defineProperty2, "shouldRenderSuggestions", _propTypes["default"].func), _defineProperty(_defineProperty2, "removeComponent", _propTypes["default"].func), _defineProperty(_defineProperty2, "autocomplete", _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].number])), _defineProperty(_defineProperty2, "readOnly", _propTypes["default"].bool), _defineProperty(_defineProperty2, "classNames", _propTypes["default"].object), _defineProperty(_defineProperty2, "name", _propTypes["default"].string), _defineProperty(_defineProperty2, "id", _propTypes["default"].string), _defineProperty(_defineProperty2, "maxLength", _propTypes["default"].number), _defineProperty(_defineProperty2, "inputValue", _propTypes["default"].string), _defineProperty(_defineProperty2, "maxTags", _propTypes["default"].number), _defineProperty(_defineProperty2, "tags", _propTypes["default"].arrayOf(_propTypes["default"].shape({
  id: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string
}))), _defineProperty(_defineProperty2, "allowUnique", _propTypes["default"].bool), _defineProperty(_defineProperty2, "renderSuggestion", _propTypes["default"].func), _defineProperty(_defineProperty2, "inputProps", _propTypes["default"].object), _defineProperty(_defineProperty2, "editable", _propTypes["default"].bool), _defineProperty(_defineProperty2, "clearAll", _propTypes["default"].bool), _defineProperty(_defineProperty2, "onClearAll", _propTypes["default"].func), _defineProperty2));
_defineProperty(ReactTags, "defaultProps", {
  placeholder: _constants.DEFAULT_PLACEHOLDER,
  labelField: _constants.DEFAULT_LABEL_FIELD,
  hasNotesField: _constants.DEFAULT_HAS_NOTES_FIELD,
  isProtectedField: _constants.DEFAULT_IS_PROTECTED_FIELD,
  suggestions: [],
  delimiters: [].concat(_toConsumableArray(_constants.KEYS.ENTER), [_constants.KEYS.TAB]),
  autofocus: true,
  inline: true,
  // TODO: Remove in v7.x.x
  inputFieldPosition: _constants.INPUT_FIELD_POSITIONS.INLINE,
  handleDelete: _noop["default"],
  handleAddition: _noop["default"],
  allowDeleteFromEmptyInput: true,
  allowAdditionFromPaste: true,
  autocomplete: false,
  readOnly: false,
  allowUnique: true,
  allowDragDrop: true,
  tags: [],
  inputProps: {},
  onTagUpdate: _noop["default"],
  editable: false,
  clearAll: false,
  handleClearAll: _noop["default"]
});
var WithContext = exports.WithContext = function WithContext(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend
  }, /*#__PURE__*/_react["default"].createElement(ReactTags, props));
};