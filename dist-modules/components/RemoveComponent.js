"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("./constants");
var _close = _interopRequireDefault(require("../assets/close.svg"));
var _protected_close = _interopRequireDefault(require("../assets/protected_close.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var crossStr = String.fromCharCode(215);
var RemoveComponent = function RemoveComponent(props) {
  var readOnly = props.readOnly,
    removeComponent = props.removeComponent,
    onRemove = props.onRemove,
    className = props.className,
    tag = props.tag,
    index = props.index,
    useIcon = props.useIcon,
    isProtected = props.isProtected;
  var onKeydown = function onKeydown(event) {
    if (_constants.KEYS.ENTER.includes(event.keyCode) || event.keyCode === _constants.KEYS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.keyCode === _constants.KEYS.BACKSPACE) {
      onRemove(event);
    }
  };
  if (readOnly) {
    return /*#__PURE__*/_react["default"].createElement("span", null);
  }
  var ariaLabel = "Tag at index ".concat(index, " with value ").concat(tag.id, " focussed. Press backspace to remove");
  if (removeComponent) {
    var Component = removeComponent;
    return /*#__PURE__*/_react["default"].createElement(Component, {
      onRemove: onRemove,
      onKeyDown: onKeydown,
      className: className,
      "aria-label": ariaLabel,
      tag: tag,
      index: index,
      useIcon: useIcon,
      isProtected: isProtected
    });
  }
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onRemove,
    onKeyDown: onKeydown,
    className: className,
    type: "button",
    "aria-label": ariaLabel
  }, useIcon ? isProtected ? /*#__PURE__*/_react["default"].createElement("img", {
    src: _protected_close["default"]
  }) : /*#__PURE__*/_react["default"].createElement("img", {
    src: _close["default"]
  }) : crossStr);
};
RemoveComponent.propTypes = {
  className: _propTypes["default"].string,
  onRemove: _propTypes["default"].func.isRequired,
  readOnly: _propTypes["default"].bool,
  removeComponent: _propTypes["default"].func,
  tag: _propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    className: _propTypes["default"].string,
    key: _propTypes["default"].string
  }),
  index: _propTypes["default"].number.isRequired,
  useIcon: _propTypes["default"].bool.isRequired,
  isProtected: _propTypes["default"].bool.isRequired
};
var _default = exports["default"] = RemoveComponent;