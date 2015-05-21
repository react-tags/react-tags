'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ReactDND = require('react-dnd');
var React = require('react');

var ItemTypes = { TAG: 'tag' };

var Tag = React.createClass({
    displayName: 'Tag',

    mixins: [ReactDND.DragDropMixin],
    propTypes: {
        labelField: React.PropTypes.string,
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveTag: React.PropTypes.func.isRequired
    },
    getDefaultProps: function getDefaultProps() {
        return {
            labelField: 'text'
        };
    },
    statics: {
        configureDragDrop: function configureDragDrop(register) {
            register(ItemTypes.TAG, {
                dragSource: {
                    beginDrag: function beginDrag(component) {
                        return {
                            item: {
                                id: component.props.tag.id
                            }
                        };
                    }
                },
                dropTarget: {
                    over: function over(component, item) {
                        component.props.moveTag(item.id, component.props.tag.id);
                    }
                }
            });
        }
    },
    render: function render() {
        var label = this.props.tag[this.props.labelField];
        return React.createElement(
            'span',
            _extends({ className: 'ReactTags__tag'
            }, this.dragSourceFor(ItemTypes.TAG), this.dropTargetFor(ItemTypes.TAG)),
            label,
            React.createElement(
                'a',
                { className: 'ReactTags__remove',
                    onClick: this.props.onDelete },
                'x'
            )
        );
    }
});

module.exports = Tag;