var React = require('react');
var { DragSource, DropTarget } = require('react-dnd');
var flow = require('lodash/function/flow');

const ItemTypes = { TAG: 'tag' };

var tagSource = {
    beginDrag(props) {
        return { id: props.tag.id }
    }
};

var tagTarget = {
    hover(props, monitor) {
        var draggedId = monitor.getItem().id;
        if (draggedId !== props.id) {
            props.moveTag(draggedId, props.tag.id);
        }
    }
};

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

var Tag = React.createClass({
    propTypes: {
        labelField: React.PropTypes.string,
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveTag: React.PropTypes.func.isRequired,
        removeComponent: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            labelField: 'text'
        };
    },
    render: function(){
        var label = this.props.tag[this.props.labelField];
        var { connectDragSource, isDragging, connectDropTarget } = this.props;
        var CustomRemoveComponent = this.props.removeComponent;
        var RemoveComponent = React.createClass({
          render: function() {
            if (CustomRemoveComponent) {
              return <CustomRemoveComponent {...this.props} />;
            }
            return <a {...this.props}>x</a>;
          }
        });

        return connectDragSource(connectDropTarget(
            <span style={{opacity: isDragging ? 0 : 1}}
                  className="ReactTags__tag">{label}
                <RemoveComponent className="ReactTags__remove"
                       onClick={this.props.onDelete} />
            </span>
        ));
    }
});

module.exports = flow(
    DragSource(ItemTypes.TAG, tagSource, dragCollect),
    DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Tag);
