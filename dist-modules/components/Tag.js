"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("./utils");
var _RemoveComponent = _interopRequireDefault(require("./RemoveComponent"));
var _NotesComponent = _interopRequireDefault(require("./NotesComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ItemTypes = {
  TAG: 'tag'
};
var Tag = function Tag(props) {
  var tagRef = (0, _react.useRef)(null);
  var readOnly = props.readOnly,
    tag = props.tag,
    classNames = props.classNames,
    index = props.index;
  var _useDrag = (0, _reactDnd.useDrag)(function () {
      return {
        type: ItemTypes.TAG,
        collect: function collect(monitor) {
          return {
            isDragging: !!monitor.isDragging()
          };
        },
        item: props,
        canDrag: function canDrag() {
          return (0, _utils.canDrag)(props);
        }
      };
    }),
    _useDrag2 = _slicedToArray(_useDrag, 2),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1];
  var _useDrop = (0, _reactDnd.useDrop)(function () {
      return {
        accept: ItemTypes.TAG,
        drop: function drop(item, monitor) {
          var dragIndex = item.index;
          var hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }
          props.moveTag(dragIndex, hoverIndex);
        },
        canDrop: function canDrop(item) {
          return (0, _utils.canDrop)(item);
        }
      };
    }),
    _useDrop2 = _slicedToArray(_useDrop, 2),
    drop = _useDrop2[1];
  drag(drop(tagRef));
  var label = props.tag[props.labelField];
  var _tag$className = tag.className,
    className = _tag$className === void 0 ? '' : _tag$className;
  /* istanbul ignore next */
  var opacity = isDragging ? 0 : 1;
  var hasNotes = props.tag[props.hasNotesField] == true;
  var isProtected = props.tag[props.isProtectedField] == true;
  var tagComponent = /*#__PURE__*/_react["default"].createElement("span", {
    ref: tagRef,
    className: (0, _classnames["default"])('tag-wrapper', classNames.tag, className),
    style: {
      opacity: opacity,
      cursor: (0, _utils.canDrag)(props) ? 'move' : 'auto'
    },
    onClick: props.onTagClicked,
    onTouchStart: props.onTagClicked
  }, hasNotes ? /*#__PURE__*/_react["default"].createElement(_NotesComponent["default"], {
    tag: props.tag,
    className: classNames.notes,
    notesComponent: props.notesComponent,
    onClick: props.onNotesClicked,
    readOnly: readOnly,
    index: index,
    useIcon: hasNotes
  }) : null, /*#__PURE__*/_react["default"].createElement("span", null, label), /*#__PURE__*/_react["default"].createElement(_RemoveComponent["default"], {
    tag: props.tag,
    className: classNames.remove,
    removeComponent: props.removeComponent,
    onRemove: props.onDelete,
    readOnly: readOnly,
    index: index,
    useIcon: props.useRemoveIcon,
    isProtected: isProtected
  }));
  return tagComponent;
};
Tag.propTypes = {
  labelField: _propTypes["default"].string,
  onDelete: _propTypes["default"].func.isRequired,
  hasNotesField: _propTypes["default"].string,
  isProtectedField: _propTypes["default"].string,
  tag: _propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    className: _propTypes["default"].string,
    key: _propTypes["default"].string
  }),
  moveTag: _propTypes["default"].func,
  removeComponent: _propTypes["default"].func,
  onTagClicked: _propTypes["default"].func,
  onNotesClicked: _propTypes["default"].func,
  classNames: _propTypes["default"].object,
  readOnly: _propTypes["default"].bool,
  index: _propTypes["default"].number.isRequired,
  useRemoveIcon: _propTypes["default"].bool
};
Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
  hasNotesField: 'hasNotes',
  isProtectedField: 'isProtected',
  useRemoveIcon: true
};
var _default = exports["default"] = Tag;