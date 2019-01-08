import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import ClassNames from 'classnames';
import {
  tagSource,
  tagTarget,
  dragSource,
  dropCollect,
} from './DragAndDropHelper';
import { canDrag } from './utils';

import RemoveComponent from './RemoveComponent';

const ItemTypes = { TAG: 'tag' };

class Tag extends Component {
  render() {
    const { props } = this;
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      labelField,
      readOnly,
      tag,
      classNames,
      renderTag,
    } = props;
    const { className = '' } = tag;
    const label = renderTag ? renderTag(tag) : tag[labelField];
    const tagComponent = ( <span
      className={ClassNames('tag-wrapper', classNames.tag, {'opacity-none' : isDragging}, {'cursor-move': canDrag(props)}, className)}
      onClick={props.onTagClicked}
      onKeyDown={props.onTagClicked}>
      {label}
      <RemoveComponent
        tag={props.tag}
        className={classNames.remove}
        removeComponent={props.removeComponent}
        onClick={props.onDelete}
        readOnly={readOnly}
      />
    </span>
    );
    return connectDragSource(connectDropTarget(tagComponent));
  }
}

Tag.propTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
  }),
  moveTag: PropTypes.func,
  removeComponent: PropTypes.func,
  onTagClicked: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  renderTag: PropTypes.func,
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
};

export default flow(
  DragSource(ItemTypes.TAG, tagSource, dragSource),
  DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Tag);
