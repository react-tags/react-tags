import React from 'react';
import { shallow } from 'enzyme';
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
  afterAll(() => {
    onRemoveStub.restore();
  });

  it('should render with base structure', () => {
    const wrapper = shallow(<RemoveComponent {...minProps} />);
    jestExpect(wrapper).toMatchSnapshot();
  });
});
