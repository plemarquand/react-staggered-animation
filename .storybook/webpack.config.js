const argv = require('minimist')(process.argv.slice(2));
const config = require('../webpack.config.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = function(storybookBaseConfig) {
  storybookBaseConfig.module.loaders = storybookBaseConfig.module.loaders.concat([config.module.loaders]);

  // These externals are required to get mocha integration to work.
  storybookBaseConfig.externals = {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
    'colors': 'window'
  };

  // storybookBaseConfig.plugins = storybookBaseConfig.plugins.concat([new OpenBrowserPlugin({ url: `http://localhost:${argv.p || 9001}/` })]);

  return storybookBaseConfig;
};
