(function (window) {
	'use strict';

	// This is run when Karma start sup
	// It creates an iframe in which the service worker is going to be loaded and executed
	// This appears to be the only way to test within a service worker context
	function createServiceWorkerJasmineStartFn() {
		return function () {
			var iframe = document.createElement('IFRAME');
			iframe.id = 'serviceworker-jasmine-iframe';
			iframe.src = '/base/node_modules/karma-serviceworker-jasmine/lib/index.html';
			iframe.setAttribute('hidden', 'hidden');
			document.body.appendChild(iframe);
		};
	}

	window.__karma__.start = createServiceWorkerJasmineStartFn();
}(window));