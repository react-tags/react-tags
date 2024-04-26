"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _escape = _interopRequireDefault(require("lodash/escape"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var maybeScrollSuggestionIntoView = function maybeScrollSuggestionIntoView(suggestionEl, suggestionsContainer) {
  var containerHeight = suggestionsContainer.offsetHeight;
  var suggestionHeight = suggestionEl.offsetHeight;
  var relativeSuggestionTop = suggestionEl.offsetTop - suggestionsContainer.scrollTop;
  if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
    suggestionsContainer.scrollTop += relativeSuggestionTop - containerHeight + suggestionHeight;
  } else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop;
  }
};
var Suggestions = /*#__PURE__*/function (_Component) {
  _inherits(Suggestions, _Component);
  var _super = _createSuper(Suggestions);
  function Suggestions() {
    var _this;
    _classCallCheck(this, Suggestions);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "markIt", function (input, query) {
      var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      var labelValue = input[_this.props.labelField];
      return {
        __html: labelValue.replace(RegExp(escapedRegex, 'gi'), function (x) {
          return "<mark>".concat((0, _escape["default"])(x), "</mark>");
        })
      };
    });
    _defineProperty(_assertThisInitialized(_this), "shouldRenderSuggestions", function (query) {
      var _this$props = _this.props,
        minQueryLength = _this$props.minQueryLength,
        isFocused = _this$props.isFocused;
      return query.length >= minQueryLength && isFocused;
    });
    _defineProperty(_assertThisInitialized(_this), "renderSuggestion", function (item, query) {
      var renderSuggestion = _this.props.renderSuggestion;
      if (typeof renderSuggestion === 'function') {
        return renderSuggestion(item, query);
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        dangerouslySetInnerHTML: _this.markIt(item, query)
      });
    });
    return _this;
  }
  _createClass(Suggestions, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var shouldRenderSuggestions = props.shouldRenderSuggestions || this.shouldRenderSuggestions;
      return props.isFocused !== nextProps.isFocused || !(0, _isEqual["default"])(props.suggestions, nextProps.suggestions) || shouldRenderSuggestions(nextProps.query) || shouldRenderSuggestions(nextProps.query) !== shouldRenderSuggestions(props.query);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
        selectedIndex = _this$props2.selectedIndex,
        classNames = _this$props2.classNames;
      if (this.suggestionsContainer && prevProps.selectedIndex !== selectedIndex) {
        var activeSuggestion = this.suggestionsContainer.querySelector(".".concat(classNames.activeSuggestion));
        if (activeSuggestion) {
          maybeScrollSuggestionIntoView(activeSuggestion, this.suggestionsContainer);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var props = this.props;
      var suggestions = props.suggestions.map(function (item, i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i,
          onMouseDown: props.handleClick.bind(null, i),
          onTouchStart: props.handleClick.bind(null, i),
          onMouseOver: props.handleHover.bind(null, i),
          className: i === props.selectedIndex ? props.classNames.activeSuggestion : ''
        }, this.renderSuggestion(item, props.query));
      }.bind(this));

      // use the override, if provided
      var shouldRenderSuggestions = props.shouldRenderSuggestions || this.shouldRenderSuggestions;
      if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(elem) {
          _this2.suggestionsContainer = elem;
        },
        className: this.props.classNames.suggestions
      }, /*#__PURE__*/_react["default"].createElement("ul", null, " ", suggestions, " "));
    }
  }]);
  return Suggestions;
}(_react.Component);
_defineProperty(Suggestions, "propTypes", {
  query: _propTypes["default"].string.isRequired,
  selectedIndex: _propTypes["default"].number.isRequired,
  suggestions: _propTypes["default"].array.isRequired,
  handleClick: _propTypes["default"].func.isRequired,
  handleHover: _propTypes["default"].func.isRequired,
  minQueryLength: _propTypes["default"].number,
  shouldRenderSuggestions: _propTypes["default"].func,
  isFocused: _propTypes["default"].bool.isRequired,
  classNames: _propTypes["default"].object,
  labelField: _propTypes["default"].string.isRequired,
  renderSuggestion: _propTypes["default"].func
});
_defineProperty(Suggestions, "defaultProps", {
  minQueryLength: 2
});
var _default = exports["default"] = Suggestions;