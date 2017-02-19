## promise-once-events

[![Build Status](https://secure.travis-ci.org/dex4er/js-promise-once-events.svg)](http://travis-ci.org/dex4er/js-promise-once-events) [![Coverage Status](https://coveralls.io/repos/github/dex4er/js-promise-once-events/badge.svg)](https://coveralls.io/github/dex4er/js-promise-once-events) [![npm](https://img.shields.io/npm/v/promise-once-events.svg)](https://www.npmjs.com/package/promise-once-events)

This module provides promisified version of standard `events` class. The API is
the same as for standard event emmiter except `once` method which returns
`Promise` object which is fulfilled when `emit` method is called.

### Requirements

This module requires ES6 with Node >= 4. For Node < 6 `--harmony` flag is
required.

### Installation

```shell
npm install promise-once-events
```

### Usage

`promise-once-events` can be a base class for custom event emitter.

```js
const PromiseOnceEvents = require('promise-once-events')

class MyEmitter extends PromiseOnceEvents {}

const emitter = new MyEmitter()
```

Method `once` returns `Promise` object which is fulfilled when `emit` method is
called and then result is an `Arguments` object which contains arguments from
`emit` method.

```js
// As promise
emitter.once('event').then(result => {
  // result is object Arguments
  console.log('an event occurred with arguments:', result)
})

emitter.emit('event', 'a', 'b')
```

If the last argument for `once` method is a callback then the callback is run
when `emit` method is called. Arguments of callback contain arguments from
`emit` method and additional `resolve` callback which fulfills `Promise`.

```js

// With callback
emitter.once('event', (a, b, resolve) => {
  console.log('an event occurred with arguments:', [a, b])
  // resolve promise
  resolve('passed')
}).then(result => {
  console.log('promise is fulfilled with result:', result)
})

emitter.emit('event', 'a', 'b')
```

### Promise

This module uses [any-promise](https://www.npmjs.com/package/any-promise) and
any ES6 Promise library or polyfill is supported.

Ie. [bluebird](https://www.npmjs.com/package/bluebird) can be used as Promise
library for this module, if it is registered before.

```js
require('any-promise/register/bluebird')
const PromiseOnceEvents = require('promise-once-events')
```

### License

Copyright (c) 2016-2017 Piotr Roszatycki <piotr.roszatycki@gmail.com>

[MIT](https://opensource.org/licenses/MIT)
