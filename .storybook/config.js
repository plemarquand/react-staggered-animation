import React, { PropTypes } from 'react';
import { configure, setAddon } from '@kadira/storybook';
import { specs, describe, it, beforeEach, afterEach } from 'storybook-addon-specifications';

global.describe = describe;
global.it = it;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

function CSSInjector({ children, styles }) {
  return (
    <div>
      <style id="css" dangerouslySetInnerHTML={{ __html: styles }} />
      {React.Children.only(children)}
    </div>
  );
}

CSSInjector.propTypes = {
  children: PropTypes.element.isRequired,
  styles: PropTypes.string.isRequired
};

// Custom addon that adds 'autoTest' to the storybook API,
// which hooks storybook files up to their corresponding test file.
setAddon({
  autoTest(testFactory) {
    return this.add(`${this.kind} Tests`, () => {
      specs(testFactory);
      return <div />;
    });
  },
  addStyles(styles) {
    return this.addDecorator((story) => (
      <CSSInjector styles={styles}>
        {story()}
      </CSSInjector>
    ));
  }
});

const req = require.context('../src', true, /\.story\.jsx?$/);
configure(() => req.keys().forEach((filename) => req(filename)), module);
