"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Suggestions = function (_Component) {
  _inherits(Suggestions, _Component);

  function Suggestions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Suggestions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = function (nextProps) {
      var _this2 = _this,
          props = _this2.props;

      var shouldRenderSuggestions = props.shouldRenderSuggestions || _this.shouldRenderSuggestions;
      return !(0, _isEqual2.default)(props.suggestions, nextProps.suggestions) || shouldRenderSuggestions(nextProps.query) || shouldRenderSuggestions(nextProps.query) != shouldRenderSuggestions(props.query);
    }, _this.componentDidUpdate = function (prevProps) {
      var suggestionsContainer = _this.refs.suggestionsContainer;
      var _this$props = _this.props,
          selectedIndex = _this$props.selectedIndex,
          classNames = _this$props.classNames;


      if (suggestionsContainer && prevProps.selectedIndex !== selectedIndex) {
        var activeSuggestion = suggestionsContainer.querySelector(classNames.activeSuggestion);

        if (activeSuggestion) {
          maybeScrollSuggestionIntoView(activeSuggestion, suggestionsContainer);
        }
      }
    }, _this.markIt = function (input, query) {
      var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
      return {
        __html: input.replace(RegExp(escapedRegex, "gi"), "<mark>$&</mark>")
      };
    }, _this.shouldRenderSuggestions = function (query) {
      var _this3 = _this,
          props = _this3.props;

      var minQueryLength = props.minQueryLength || 2;
      return query.length >= minQueryLength;
    }, _this.render = function () {
      var _this4 = _this,
          props = _this4.props;

      var suggestions = props.suggestions.map(function (item, i) {
        return _react2.default.createElement(
          "li",
          {
            key: i,
            onMouseDown: props.handleClick.bind(null, i),
            onMouseOver: props.handleHover.bind(null, i),
            className: i == props.selectedIndex ? props.classNames.activeSuggestion : "" },
          _react2.default.createElement("span", { dangerouslySetInnerHTML: this.markIt(item, props.query) })
        );
      }.bind(_this));

      // use the override, if provided
      var shouldRenderSuggestions = props.shouldRenderSuggestions || _this.shouldRenderSuggestions;
      if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
        return null;
      }

      return _react2.default.createElement(
        "div",
        {
          ref: "suggestionsContainer",
          className: _this.props.classNames.suggestions },
        _react2.default.createElement(
          "ul",
          null,
          " ",
          suggestions,
          " "
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Suggestions;
}(_react.Component);

Suggestions.propTypes = {
  query: _propTypes2.default.string.isRequired,
  selectedIndex: _propTypes2.default.number.isRequired,
  suggestions: _propTypes2.default.array.isRequired,
  handleClick: _propTypes2.default.func.isRequired,
  handleHover: _propTypes2.default.func.isRequired,
  minQueryLength: _propTypes2.default.number,
  shouldRenderSuggestions: _propTypes2.default.func,
  classNames: _propTypes2.default.object
};
exports.default = Suggestions;