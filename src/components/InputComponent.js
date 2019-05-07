import React from 'react';
import PropTypes from 'prop-types';

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  componentDidUpdate() {
    const el = this.inputRef.current;
    if(this.props.focus && el) {
      el.focus();
    } else if(!this.props.focus && el) {
      el.blur();
    }
  }
  render() {
    const { inputComponent, focus, ...other } = this.props;
    if (inputComponent) {
      const Component = inputComponent;
      return <Component autoFocus={focus} {...other} />;
    }
    return (
      <input
        ref={this.inputRef}
        {...other}
      />
    );
  }
};

InputComponent.propTypes = {
  inputComponent: PropTypes.func,
  focus: PropTypes.bool
};

export default InputComponent;