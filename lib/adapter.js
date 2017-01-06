(function (window) {
  'use strict';

  function createSWMochaStartFn() {
    return function () {
      var iframe = document.createElement('IFRAME');
      iframe.id = 'sw-mocha-iframe';
      iframe.src = '/base/node_modules/karma-sw-mocha/lib/index.html';
      iframe.setAttribute('hidden', 'hidden');
      iframe.setAttribute('data-testsToLoad', JSON.stringify(window.__karma__.config['sw-mocha'].SW_TESTS));
      document.body.appendChild(iframe);
    };
  }

  window.__karma__.start = createSWMochaStartFn();
}(window));
