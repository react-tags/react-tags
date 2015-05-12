var ReactDND = require('react-dnd');
var React = require('react');

const ItemTypes = { TAG: 'tag' };

var Tag = React.createClass({
    mixins: [ReactDND.DragDropMixin],
    propTypes: {
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveCard: React.PropTypes.func.isRequired
    },
    statics: {
        configureDragDrop: function(register) {
            register(ItemTypes.TAG, {
                dragSource: {
                    beginDrag: function(component) {
                        return {
                            item: {
                                id: component.props.tag.id
                            }
                        }
                    }
                },
                dropTarget: {
                    over(component, item) {
                        component.props.moveTag(item.id, component.props.tag.id);
                    }
                }
            });
        }
    },
    render: function(){
        var isDragging = this.getDragState(ItemTypes.TAG).isDragging;
        return (
            <span className="tag"
                  {...this.dragSourceFor(ItemTypes.TAG)}
                  {...this.dropTargetFor(ItemTypes.TAG)}>{this.props.tag.text}
                <a className="remove" onClick={this.props.onDelete}>x</a>
            </span>
        )
    }
});

module.exports = Tag;
