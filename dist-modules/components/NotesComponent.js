"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("./constants");
var _sticky_note = _interopRequireDefault(require("../assets/sticky_note.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var crossStr = String.fromCharCode(215);
var NotesComponent = function NotesComponent(props) {
  var readOnly = props.readOnly,
    notesComponent = props.notesComponent,
    onClick = props.onClick,
    className = props.className,
    tag = props.tag,
    index = props.index,
    useIcon = props.useIcon;
  var onKeydown = function onKeydown(event) {
    if (_constants.KEYS.ENTER.includes(event.keyCode) || event.keyCode === _constants.KEYS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.keyCode === _constants.KEYS.BACKSPACE) {
      onClick(event);
    }
  };
  if (readOnly) {
    return /*#__PURE__*/_react["default"].createElement("span", null);
  }
  var ariaLabel = "Tag at index ".concat(index, " with value ").concat(tag.id, " focussed. Press backspace to remove");
  if (notesComponent) {
    var Component = notesComponent;
    return /*#__PURE__*/_react["default"].createElement(Component, {
      onClick: onClick,
      onKeyDown: onKeydown,
      className: className,
      "aria-label": ariaLabel,
      tag: tag,
      index: index,
      useIcon: useIcon
    });
  }
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClick,
    onKeyDown: onKeydown,
    className: className,
    type: "button",
    "aria-label": ariaLabel
  }, useIcon ? /*#__PURE__*/_react["default"].createElement("img", {
    src: _sticky_note["default"]
  }) : crossStr);
};
NotesComponent.propTypes = {
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  readOnly: _propTypes["default"].bool,
  notesComponent: _propTypes["default"].func,
  tag: _propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    className: _propTypes["default"].string,
    key: _propTypes["default"].string
  }),
  index: _propTypes["default"].number.isRequired,
  useIcon: _propTypes["default"].bool.isRequired
};
var _default = exports["default"] = NotesComponent;