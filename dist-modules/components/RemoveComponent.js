'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crossStr = String.fromCharCode(215);
var RemoveComponent = function RemoveComponent(props) {
  var readOnly = props.readOnly,
      removeComponent = props.removeComponent,
      onClick = props.onClick,
      className = props.className;

  if (readOnly) {
    return _react2.default.createElement('span', null);
  }

  if (removeComponent) {
    var Component = removeComponent;
    return _react2.default.createElement(Component, props);
  }

  return _react2.default.createElement(
    'a',
    { onClick: onClick, className: className, onKeyDown: onClick },
    crossStr
  );
};

RemoveComponent.propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  readOnly: _propTypes2.default.bool,
  removeComponent: _propTypes2.default.func
};

exports.default = RemoveComponent;