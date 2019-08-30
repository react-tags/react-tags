'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DragAndDropHelper = require('./DragAndDropHelper');

var _utils = require('./utils');

var _RemoveComponent = require('./RemoveComponent');

var _RemoveComponent2 = _interopRequireDefault(_RemoveComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemTypes = { TAG: 'tag' };

var Tag = function (_Component) {
  _inherits(Tag, _Component);

  function Tag() {
    _classCallCheck(this, Tag);

    return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));
  }

  _createClass(Tag, [{
    key: 'render',
    value: function render() {
      var props = this.props;

      var label = props.tag[props.labelField];
      var connectDragSource = props.connectDragSource,
          isDragging = props.isDragging,
          connectDropTarget = props.connectDropTarget,
          readOnly = props.readOnly,
          tag = props.tag,
          classNames = props.classNames;
      var _tag$className = tag.className,
          className = _tag$className === undefined ? '' : _tag$className;

      var tagComponent = _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)('tag-wrapper', classNames.tag, className),
          style: { opacity: isDragging ? 0 : 1, 'cursor': (0, _utils.canDrag)(props) ? 'move' : 'auto' },
          onClick: props.onTagClicked,
          onKeyDown: props.onTagClicked,
          onTouchStart: props.onTagClicked },
        label,
        _react2.default.createElement(_RemoveComponent2.default, {
          tag: props.tag,
          className: classNames.remove,
          removeComponent: props.removeComponent,
          onClick: props.onDelete,
          readOnly: readOnly
        })
      );
      return connectDragSource(connectDropTarget(tagComponent));
    }
  }]);

  return Tag;
}(_react.Component);

Tag.propTypes = {
  labelField: _propTypes2.default.string,
  onDelete: _propTypes2.default.func.isRequired,
  tag: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string
  }),
  moveTag: _propTypes2.default.func,
  removeComponent: _propTypes2.default.func,
  onTagClicked: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  readOnly: _propTypes2.default.bool,
  connectDragSource: _propTypes2.default.func.isRequired,
  isDragging: _propTypes2.default.bool.isRequired,
  connectDropTarget: _propTypes2.default.func.isRequired
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false
};

exports.default = (0, _flow2.default)((0, _reactDnd.DragSource)(ItemTypes.TAG, _DragAndDropHelper.tagSource, _DragAndDropHelper.dragSource), (0, _reactDnd.DropTarget)(ItemTypes.TAG, _DragAndDropHelper.tagTarget, _DragAndDropHelper.dropCollect))(Tag);