var path = require('path');

var createPattern = function(path, included) {
  return {pattern: path, included: included, served: true, watched: false};
};

var initMocha = function(files, mochaConfig) {
  var mochaPath = path.dirname(require.resolve('mocha'));
  files.unshift(createPattern(__dirname + '/testrunner.sw.js'));
  files.unshift(createPattern(__dirname + '/index.html'));
  files.unshift(createPattern(mochaPath + '/mocha.js'));
  files.unshift(createPattern(__dirname + '/adapter.js', true));

  if (mochaConfig && mochaConfig.reporter) {
    files.unshift(createPattern(mochaPath + '/mocha.css'));
  }
};

initMocha.$inject = ['config.files', 'config.client.mocha'];

module.exports = {
  'framework:sw-mocha': ['factory', initMocha]
};
