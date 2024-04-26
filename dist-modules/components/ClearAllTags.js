"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ClearAllTags = function ClearAllTags(props) {
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: props.classNames.clearAll,
    onClick: props.onClick
  }, "Clear all");
};
ClearAllTags.propTypes = {
  classNames: _propTypes["default"].object,
  onClick: _propTypes["default"].func
};
var _default = exports["default"] = ClearAllTags;