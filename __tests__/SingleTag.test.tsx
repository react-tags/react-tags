import React from 'react';
import { expect } from 'chai';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import sinon from 'sinon';
import { noop } from 'lodash-es';
import { SingleTag, TagProps } from '../src/components/SingleTag';
import { fireEvent, render, screen } from '@testing-library/react';

function mockItem(overrides?: TagProps) {
  const props = Object.assign(
    {},
    {
      tag: { id: '1', text: 'FooBar', className: 'action' },
      onDelete: noop,
      readOnly: false,
      allowDragDrop: true,
      moveTag: noop,
      classNames: {
        tag: 'tag',
        remove: 'remove',
      },
      index: 0,
    },
    overrides
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <SingleTag {...props} />
    </DndProvider>
  );
}

describe('Tag', () => {
  it('shows the classnames of children properly', () => {
    const { container } = render(mockItem());
    jestExpect(container).toMatchSnapshot();
  });

  it('calls the tag click handler correctly', () => {
    const spy = sinon.spy();
    render(mockItem({ onTagClicked: spy }));
    const tag = screen.getByTestId('tag');
    fireEvent.click(tag);
    expect(spy.calledOnce).to.be.true;
    spy.resetHistory();
  });

  it('should trigger the tag click handler on touchStart', () => {
    const onTagClickedStub = sinon.stub();
    render(mockItem({ onTagClicked: onTagClickedStub }));
    const tag = screen.getByTestId('tag');
    fireEvent.touchStart(tag);
    expect(onTagClickedStub.calledOnce).to.be.true;
  });
});
