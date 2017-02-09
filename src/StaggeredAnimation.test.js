/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import sinon from 'sinon'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { StaggeredAnimation } from './StaggeredAnimation';

describe('StaggeredAnimation', () => {
  it('warns with no items', () => {
    sinon.stub(console, 'error').callsFake((warning) => {
      throw new Error(warning);
    });
    expect(() => shallow(<StaggeredAnimation transitionName="fade" />)).to.throw(Error);
    console.error.restore(); // eslint-disable-line no-console
  });

  it('renders with no items', () => {
    const wrapper = shallow(<StaggeredAnimation transitionName="fade" />);

    // No <style> tag when empty
    expect(wrapper.children().length).to.equal(0);
  });

  it('renders with one child', () => {
    const wrapper = mount(
      <StaggeredAnimation className="foo" transitionName="fade">
        <h1>Hi</h1>
      </StaggeredAnimation>
    );

    // One extra element because of the generated <style> tag.
    expect(wrapper.find('.foo').children().length).to.equal(1 + 1);
  });

  it('renders with multiple children', () => {
    const wrapper = mount(
      <StaggeredAnimation transitionName="fade" className="foo">
        <h1>Hi</h1>
        <h1>Hi</h1>
      </StaggeredAnimation>
    );
    expect(wrapper.find('.foo').children().length).to.equal(2 + 1);
  });


  it('transfers className', () => {
    const wrapper = shallow(<StaggeredAnimation className="foo" transitionName="fade" />);

    expect(wrapper.find('.foo').length).to.equal(1);
  });
});

module.exports = 'StaggeredAnimation';

// TODO: distinguish ENTER/LEAVE/ADDITION states
