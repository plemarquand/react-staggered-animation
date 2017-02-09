/* Configure Mocha test runner, see package.json/scripts/test */
process.env.NODE_ENV = 'test';

const jsdom = require('jsdom').jsdom;

// Mock out the dom so we can run tests from Node
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
