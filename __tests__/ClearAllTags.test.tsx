import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';
import ClearAllTags from '../src/components/ClearAllTags';

const defaults = {
  classNames: {
    clearAll: 'ReactTags__clearAll',
  },
  onClick: stub(),
};

function mockItem(overrides?: Partial<typeof defaults & { 'aria-label': string }>) {
  const props = Object.assign({}, defaults, overrides);
  return <ClearAllTags {...props} />;
}

describe('ClearAllTags', () => {
  afterEach(() => {
    defaults.onClick.resetHistory();
  });

  it('should render with base structure', () => {
    const { container } = render(mockItem());
    jestExpect(container).toMatchSnapshot();
  });

  it('should render a button with "Clear all" text', () => {
    render(mockItem());
    const button = screen.getByRole('button', { name: /clear all/i });
    expect(button).to.exist;
    expect(button.textContent).to.equal('Clear all');
  });

  it('should apply the correct className from classNames prop', () => {
    const { container } = render(mockItem());
    const button = container.querySelector('button');
    expect(button?.className).to.equal('ReactTags__clearAll');
  });

  it('should apply a custom className', () => {
    render(mockItem({ classNames: { clearAll: 'custom-clear-class' } }));
    const button = screen.getByRole('button');
    expect(button.className).to.equal('custom-clear-class');
  });

  it('should call onClick handler when button is clicked', () => {
    render(mockItem());
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaults.onClick.calledOnce).to.be.true;
  });

  it('should not have an aria-label by default', () => {
    render(mockItem());
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).to.be.null;
  });

  it('should apply aria-label when provided', () => {
    render(mockItem({ 'aria-label': 'Remove all tags' }));
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).to.equal('Remove all tags');
  });

  it('should call onClick multiple times on multiple clicks', () => {
    render(mockItem());
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(defaults.onClick.callCount).to.equal(3);
  });
});
