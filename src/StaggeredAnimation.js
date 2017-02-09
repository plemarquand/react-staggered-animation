import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { PropTypes } from 'react';
import kebabCase from 'lodash.kebabcase';
import cx from 'classnames';

const arraify = (arr) => (Array.isArray(arr) ? arr : [arr]);
const generateStyles = (id, start, delay, children) => arraify(children).reduce((item, _, i) => ({
  ...item,
  [`${id}_a${i}`]: {
    // ReactCSSTransitionGroup uses `transition` which has no
    // transitionDelay included, so it defaults to 0 unless we use !important.
    transitionDelay: `${start + (delay * i)}ms !important`,
    animationDelay: `${start + (delay * i)}ms !important`
  }
}), {});

const styleChildren = (children, id) => React.Children.map(children, (child, i) => React.cloneElement(child, {
  className: cx(child.props.className, `${id}_a${i}`)
}));

const css = (() => {
  const generateStyle = (selectorContents) => Object.keys(selectorContents).map(key => `${kebabCase(key)}: ${selectorContents[key]};`).join('\n');
  return (styles) => Object.keys(styles).reduce((memo, key) => `${memo}\n.${key} { ${generateStyle(styles[key])} }`, '');
})();

let counter = 0;
export class StaggeredAnimation extends React.Component {
  constructor() {
    super();
    counter += 1;
    this.id = counter;
  }

  render() {
    const { transitionName, children, delay, duration, start, className } = this.props;

    const arrChildren = arraify(children || []);
    const id = `StaggeredAnimation_${this.id}`;
    const styles = generateStyles(id, start, delay, arrChildren);

    // Dynamically generate injectable styles, and then assign those classes
    // to the children of the component.
    const styledChildren = styleChildren(arrChildren, id);

    const totalTime = duration ? start + (arrChildren.length * delay) + duration : 0;

    // TODO: Remove the class we injected when the transition in is complete....
    // This is a complicated task as the transition complete handler is accessible,
    // but buried deep in ReactCSSTransitionGroupChild. Getting at it involves creating
    // a new class to replace ReactCSSTransitionGroup, having that class wrap the
    // child element with a new version of ReactCSSTransitionGroupChild which in turn
    // has a componentDidAppear method. Then when that is called change state so the className
    // is not added for that specific child.

    // Injects the styles alongside the child elements in a <style> tag.
    return (
      <ReactCSSTransitionGroup className={className} transitionName={transitionName} transitionAppear transitionAppearTimeout={totalTime} transitionEnterTimeout={totalTime} transitionLeaveTimeout={totalTime}>
        {arrChildren.length && <style dangerouslySetInnerHTML={{ __html: css(styles) }} />}
        {styledChildren}
      </ReactCSSTransitionGroup>
    );
  }
}

StaggeredAnimation.propTypes = Object.assign({}, ReactCSSTransitionGroup.propTypes, {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  delay: PropTypes.number,
  start: PropTypes.number,
  className: PropTypes.string
});

StaggeredAnimation.defaultProps = {
  delay: 100,
  duration: 0,
  start: 0,
  once: true
};

export default StaggeredAnimation;
