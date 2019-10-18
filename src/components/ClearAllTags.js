import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClearAllTags extends Component {
  static propTypes = {
    classNames: PropTypes.object,
    handleClick: PropTypes.func,
  };

  render() {
    const { props } = this;
    return (
      <span className={this.props.classNames.clearAll} onMouseDown={props.handleClick}>clear tags</span>
    );
  }
}

export default ClearAllTags;
