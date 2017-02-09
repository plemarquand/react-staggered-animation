import React from 'react';
import cx from 'classnames';
import { storiesOf } from '@kadira/storybook';
import StaggeredAnimation from './StaggeredAnimation.js'; // eslint-disable-line import/no-named-as-default
import animations from 'animate.css'

const CustomComponent = ({ className }) => (
  <div className={className} style={{background: 'blue'}}>
    <h1>Hello</h1>
  </div>
);

class PropChanger extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => this.setState({
      val: this.state.val + 1
    }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <StaggeredAnimation delay={100} className="faderow" transitionName="fade">
        <div className="blue box">{this.state.val}</div>
      </StaggeredAnimation>
    );
  }
}

class AnimationExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      animation: animations.fadeIn,
      render: true
    };
  }

  render() {
    const transition = {
      enter: 'hidden',
      enterActive: this.state.animation,
      appear: 'any',
      appearActive: this.state.animation
    };

    return (
      <div>
        <select value={this.state.animation} onChange={(e) => this.setState({animation: e.target.value, render: false}, () => this.setState({render: true}))}>
          {Object.keys(animations).filter(key => ['animated', 'infinite'].indexOf(key) === -1).map(key => <option key={key} value={animations[key]}>{animations[key].replace('animate_', '')}</option>)}
        </select>
        {this.state.render && <StaggeredAnimation delay={100} className="faderow" transitionName={transition}>
          {Array.from(Array(10)).map((_, i) => <div key={i} className={cx('blue box', animations.animated)} />)}
        </StaggeredAnimation>}
      </div>
    )
  }
}

class ComponentAdder extends React.Component {
  constructor(props) {
    super();
    this.state = {
      count: props.count || 1
    }
  }

  componentDidMount() {
    this.timeout = setInterval(() => this.setState({
      count: this.props.onTick(this.state.count)
    }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <StaggeredAnimation delay={100} className="faderow" transitionName="slide-fade">
        {Array.from(Array(this.state.count)).map((_, i) => <div key={i} className="blue box" />)}
      </StaggeredAnimation>
    )
  }
}

storiesOf('StaggeredAnimation', module)
  .addStyles(`
    .box { width: 64px; height: 64px; margin: 5px; border-radius: 5px; display: flex; justify-content: center; align-items:center; font-size: 3em; }
    .faderow { display: flex; flex-direction: row; }
    .fadecol { display: flex; flex-direction: column; }
    .blue { background: blue; }
    .red { background: red; }
    .hidden { opacity: 0; }

    .slide-fade-enter {
      opacity: 0.01;
      transform: translateY(50px);
    }

    .slide-fade-enter.slide-fade-enter-active {
      transition: opacity 250ms ease-in, transform 250ms ease-out;
      opacity: 1;
      transform: translateY(0px);
    }

    .slide-fade-appear { opacity: 0.01; transform: translateY(50px); }
    .slide-fade-appear.slide-fade-appear-active { opacity: 1; transform: translateY(0px); transition: opacity 250ms ease-in, transform 250ms ease-out; }

    .slide-fade-leave {
      opacity: 1;
      transform: translateY(0px);
    }

    .slide-fade-leave.slide-fade-leave-active {
      opacity: 0.01;
      transform: translateY(50px);
      transition: opacity 100ms ease-in, transform 250ms ease-out;
    }
  `)
  .add('with divs', () => (
    <StaggeredAnimation delay={100} className="faderow" transitionName="slide-fade">
      {Array.from(Array(10)).map((_, i) => <div key={i} className="blue box" />)}
    </StaggeredAnimation>
  ))
  .add('with multiple instances', () => (
    <div>
      {Array.from(Array(5)).map((_, i) => (
        <StaggeredAnimation key={i} delay={(i + 1) * 100} className="faderow" transitionName="slide-fade">
          {Array.from(Array(10)).map((_, j) => <div key={j} className="box" style={{ background: '#0000ff' }} />)}
        </StaggeredAnimation>
      ))}
    </div>
  ))
  .add('with custom components', () => (
    <StaggeredAnimation delay={100} className="fadecol" transitionName="slide-fade">
      {Array.from(Array(10)).map((_, i) => <CustomComponent key={i} />)}
    </StaggeredAnimation>
  ))
  .add('with a single child', () => (
    <StaggeredAnimation delay={100} className="faderow" transitionName="slide-fade">
      <div className="blue box" />
    </StaggeredAnimation>
  ))
  .add('changing properties over time', () => (
    <PropChanger />
  ))
  .add('custom animations', () => (
    <AnimationExplorer />
  ))
  .add('adding elements over time', () => (
    <ComponentAdder count={1} onTick={(count) => count < 10 ? count + 1 : count} />
  ))
  .add('removing elements over time', () => (
    <ComponentAdder count={10} onTick={(count) => count > 0 ? count - 1 : count} />
  ))
  .add('demo', () => (
    <StaggeredAnimation delay={100} className="faderow" transitionName="slide-fade">
      {Array.from(Array(10)).map((_, i) => {
        const perc = i / 10;
        return <div key={i} className="box" style={{backgroundColor: `rgb(${(122 * perc) | 0}, ${(122 * (1 - perc)) | 0}, 122)`}} />;
      })}
    </StaggeredAnimation>
  ))
  .add('custom animation docs', () => (
    <StaggeredAnimation delay={100} className="faderow" transitionName={{
      appear: 'animate_animated',
      appearActive: 'animate_bounceInUp'
    }}>
      <h1>One</h1>
      <h1>Two</h1>
      <h1>Three</h1>
    </StaggeredAnimation>
  )).autoTest(() => require('./StaggeredAnimation.test.js'));
