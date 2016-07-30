## promise-once-events

[![Build Status](https://secure.travis-ci.org/dex4er/js-promise-once-events.svg)](http://travis-ci.org/dex4er/js-promise-once-events) [![Coverage Status](https://coveralls.io/repos/github/dex4er/js-promise-once-events/badge.svg)](https://coveralls.io/github/dex4er/js-promise-once-events) [![npm](https://img.shields.io/npm/v/promise-once-events.svg?maxAge=2592000)](https://www.npmjs.com/package/promise-once-events)

This library provides promisified version of standard `events` class. The API is
the same as for standard event emmiter except `once` method which returns
`Promise` object which is fulfilled when `emit` method is called.

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
emitter.once('event').then((result) => {
  // result is object Arguments
  console.log('an event occurred with arguments:', Array.prototype.slice.call(result))
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
}).then((result) => {
  // result is object Arguments
  console.log('promise is fulfilled with result:', result)
})

emitter.emit('event', 'a', 'b')
```
