# karma-sw-mocha
A Karma plug-in, framework for Mocha testing when running inside a ServiceWorker.

## What is Karma SW Mocha for?
Karma SW Mocha should be employed for performing tests in a [ServiceWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope) and not in a window environment. It is not to test interceptions, nor performing integration tests between your client code and your service worker. It will simply run your code inside a special service worker and will warry about comunicating the results of the testing to the Karma reporter.

## Installation
Install karma-sw-mocha from npm:

```bash
$ npm install --save karma-sw-mocha
```

And add it as the first item of your framework list in the Karma configuration file...

```js
{
  frameworks: ['sw-mocha', /* other frameworks... */],
}
```

Notice the name of the framework is **`sw-mocha`** and not `karma-sw-mocha`.

### Adding tests
For the service worker to know which test files should load, you need to add them to a special file `sw-tests.js` in the root of your project:

```js
// sw-tests.js
var SW_TESTS = [
  '/base/path/to/your/tests/myTest.sw-spec.js'
];
```

Karma will serve all your files under the `/base/` path. So if your tests are in `test/test1.sw-spec.js` and `test/test2.sw-spec.js` they should be added as:

```js
// sw-tests.js
var SW_TESTS = [
  '/base/test/test1.sw-spec.js',
  '/base/test/test2.sw-spec.js'
];
```

### Loading other libraries
A testing framework is usually insufficient to provide an efficient testing environment. You usually will need an assertion library like [Chai](http://chaijs.com/) and a spy / mock library as [Sinon](http://sinonjs.org/). You can install Karma versions of these libraries with:

```bash
$ npm install --save karma-sinon karma-chai
```

To include them in your service worker setup, edit `sw-tests.js` and import the proper scripts there:

```js
// sw-tests.js
var SW_TESTS = [ /* your test files... */ ];
importScripts('/base/node_modules/chai/chai.js');
importScripts('/base/node_modules/sinon/pkg/sinon.js');
```

Don't forget to add these frameworks to your Karma configuration, **after `sw-mocha`**:

```js
{
  frameworks: ['sw-mocha', 'sinon', 'chai']
}
```

### Configuring mocha and running custom setup code
The file `sw-tests.js` will be load before executing any test so you can add there the code for [loading custom scripts](#loading-other-libraries) and your own custom synchronous setup code. For instance, you could instruct mocha to enable `BDD` API and make [Chai's `expect()`](http://chaijs.com/api/bdd/) globally available:

```js
// sw-tests.js
var SW_TESTS = [ /* your test files... */ ];

importScripts('/base/node_modules/chai/chai.js');
// your other imports...

mocha.setup({ ui: 'bdd' });
self.expect = chai.expect;
```

## Configuration example

In [`samples/mocha-sinon-chai-bdd`](https://github.com/delapuente/karma-sw-mocha/tree/master/samples/mocha-sinon-chai-bdd) you will find sample files for the Karma configuration file and `sw-tests.js` to set and Mocha BDD + Chai + Sinon environment up.

## Enabling tests of Firefox
Currently only Firefox Nightly has support for Service Workers and only after turning on certain flags. You will need a custom launcher to enable SW on Nightly. Do it by replacing the `Firefox` launcher in your config file with some similar to this:

```js
{
  browsers: ['NightlySW'],

  customLaunchers: {
    'NightlySW': {
      base: 'FirefoxNightly',
      prefs: {
        'devtools.serviceWorkers.testing.enabled': true,
        'dom.serviceWorkers.enabled': true
      }
    }
  }
}
```
