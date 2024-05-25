import React from 'react';
import { stub } from 'sinon';

import RemoveComponent, {
  RemoveComponentProps,
} from '../src/components/RemoveComponent';
import { fireEvent, render, screen } from '@testing-library/react';
import { KEYS } from '../src';

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

  afterEach(() => {
    onRemoveStub.resetHistory();
  });

  function mockItem(override?: RemoveComponentProps) {
    const props = Object.assign({}, minProps, override);
    return <RemoveComponent {...props} />;
  }

  it('should render with base structure', () => {
    const { container } = render(<RemoveComponent {...minProps} />);
    jestExpect(container).toMatchSnapshot();
  });

  it('should return empty span tag when readOnly set to true', () => {
    const props = {
      onRemove: stub(),
      index: 0,
      readOnly: true,
      tag: {
        id: 'Tags',
        key: 'Tags',
        className: '',
      },
    };
    const { container } = render(<RemoveComponent {...props} />);
    jestExpect(container).toMatchInlineSnapshot(`
      <div>
        <span />
      </div>
    `);
  });

  it('should run onRemove when remove component is clicked', () => {
    render(mockItem());
    const removeComp = screen.getByTestId('remove');
    fireEvent.click(removeComp);
    expect(onRemoveStub.calledOnce).toBeTruthy();
  });

  it('should run onRemove when backspace is pressed', () => {
    render(mockItem());
    const removeComp = screen.getByTestId('remove');
    fireEvent.keyDown(removeComp, {
      keyCode: KEYS.BACKSPACE,
    });
    expect(onRemoveStub.calledOnce).toBeTruthy();
  });

  it('should not run onRemove when enter or space is pressed', () => {
    render(mockItem());
    const removeComp = screen.getByTestId('remove');
    fireEvent.keyDown(removeComp, {
      keyCode: KEYS.ENTER[0],
    });
    fireEvent.keyDown(removeComp, {
      keyCode: KEYS.ENTER[2],
    });
    fireEvent.keyDown(removeComp, {
      keyCode: KEYS.SPACE,
    });
    expect(onRemoveStub.called).toBeFalsy();
  });

  it('should render passed in remove component', () => {
    const CustomRemoveComponent = () => <a className="remove">delete me</a>;
    const { container } = render(
      mockItem({ removeComponent: CustomRemoveComponent })
    );
    jestExpect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="remove"
        >
          delete me
        </a>
      </div>
    `);
  });
});
