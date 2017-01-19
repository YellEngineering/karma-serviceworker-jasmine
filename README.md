# karma-serviceworker-jasmine
A Karma plug-in/framework for Jasmine testing when running inside a ServiceWorker.

[![npm version](https://badge.fury.io/js/karma-serviceworker-jasmine.svg)](https://badge.fury.io/js/karma-serviceworker-jasmine)

## What is karma-serviceworker-jasmine for?
Karma-serviceworker-jasmine should be employed for performing tests in a [ServiceWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope) and not in a window environment. It is not to test interceptions, nor performing integration tests between your client code and your service worker. It will simply run your code inside a special service worker and will warry about comunicating the results of the testing to the Karma reporter.

If you are looking for other methods of testing service workers, try [this article by Matt Gaunt](https://gauntface.com/blog/2015/12/14/unit-testing-service-worker)

## Jasmine version
This framework uses a built-in Jasmine 1.3 library, and not the version of jasmine you may already have installed. This is planned for a future version of this plugin.

## Installation
Install karma-serviceworker-jasmine from npm:

```bash
$ npm install --save karma-serviceworker-jasmine
```

And add it as the first item of your framework list in the Karma configuration file...

```js
{
  frameworks: ['serviceworker-jasmine', /* other frameworks... */],
}
```

Notice the name of the framework is **`serviceworker-jasmine`** and not `karma-serviceworker-jasmine`.

### Adding tests
For the service worker to know which test files should load, you need to add them to the client configuration as well as the files array in the config. This is because the framework loads these files within the service worker directly, and does not have access to the main files list:

**Please remember to include the service worker that you want to test as the first script to be loaded in here.**

```js
client: {
    'serviceworker-jasmine': {
        SW_TESTS: [
            'path/to/your/worker/sw.js',
            'samples/serviceworker.test.js'
        ]
    }
},
```

## Configuration example

In [`samples`](https://github.com/steveworkman/karma-serviceworker-jasmine/tree/master/samples) you will find sample files for the Karma configuration file and `serviceworker.test.js` to set up the environment.

It is really important that the ```basePath``` property is set to the root of the project that you're working on, where your node_modules are stored. If it is not, this framework will not load correctly and this will not work. 

## Browser support
At the time of writing, Chrome, Firefox, Opera and Samsung Internet support service workers. See this [compatibility table](https://jakearchibald.github.io/isserviceworkerready/) for the most up to date information. **PhantomJS** is not supported and is highly unlikely to ever be supported.

For headless support, try [SlimerJS](https://github.com/laurentj/slimerjs) ([runner](https://github.com/karma-runner/karma-slimerjs-launcher)) or, if you're feeling lucky, [Raw Chromium for Linux](https://download-chromium.appspot.com/) with `--headless` and `--disable-gpu` flags set. Track the Chrome Headless project [here](https://bugs.chromium.org/p/chromium/issues/detail?id=546953)

## License

This work is © Yell Limited and is licensed under the [MIT license](https://github.com/YellEngineering/karma-serviceworker-jasmine/blob/master/LICENSE.txt)
