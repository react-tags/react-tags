import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import RemoveComponent from '../src/components/RemoveComponent';

describe('Test <RemoveComponent/>', () => {
  let minProps, onRemoveStub;
  beforeAll(() => {
    onRemoveStub = stub();
    minProps = {
      onRemove: onRemoveStub,
      index: 0,
      tag: {
        id: 'Tags',
        key: 'Tags',
      },
    };
  });

  function mockItem(override) {
    const props = Object.assign({}, minProps, override);
    return <RemoveComponent {...props} />;
  }

  it('should render with base structure', () => {
    const wrapper = shallow(<RemoveComponent {...minProps} />);
    jestExpect(wrapper).toMatchSnapshot();
  });

  it('should return empty span tag when readOnly set to true', () => {
    const props = {
      onRemove: stub(),
      index: 0,
      readOnly: true,
      tag: {
        id: 'Tags',
        key: 'Tags',
      },
    };
    const wrapper = shallow(<RemoveComponent {...props} />);
    expect(wrapper.html()).toBe('<span></span>');
  });

  it('should run onRemove when backspace is pressed', () => {
    const $el = mount(mockItem());
    $el
      .find('button')
      .simulate('keyDown', { keyCode: 8, which: 8, key: 'Backspace' });
    expect(onRemoveStub.calledOnce).toBeTruthy();
  });
});
