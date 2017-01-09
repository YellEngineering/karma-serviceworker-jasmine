var path = require('path');

var createPattern = function(path, included) {
	return {pattern: path, included: included, served: true, watched: false};
};

var initJasmine = function(files) {
	var jasminePath = path.dirname(require.resolve('jasmine-core'));

	files.unshift(createPattern(__dirname + '/adapter.js', true));
	files.unshift(createPattern(__dirname + '/jasmine-1.3.js'));
	// This will come back when I have a Jasmine 2.x version
	// files.unshift(createPattern(jasminePath + '/jasmine-core/jasmine.js'));
	files.unshift(createPattern(__dirname + '/testrunner.sw.js'));
	files.unshift(createPattern(__dirname + '/index.html'));
};

initJasmine.$inject = ['config.files'];

module.exports = {
	'framework:serviceworker-jasmine': ['factory', initJasmine]
};
