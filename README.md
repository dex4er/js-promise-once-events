## promise-once-events

[![Build Status](https://secure.travis-ci.org/dex4er/js-promise-once-events.svg)](http://travis-ci.org/dex4er/js-promise-once-events) [![Coverage Status](https://coveralls.io/repos/github/dex4er/js-promise-once-events/badge.svg)](https://coveralls.io/github/dex4er/js-promise-once-events) [![npm](https://img.shields.io/npm/v/promise-once-events.svg)](https://www.npmjs.com/package/promise-once-events)

This module provides promisified version of standard `events` class. The API is
the same as for standard [`EventEmitter`](https://nodejs.org/api/events.html),
except
[`once`](https://nodejs.org/api/events.html#events_emitter_once_eventname_listener)
method returns [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
object which is fulfilled when
[`emit`](https://nodejs.org/api/events.html#events_emitter_emit_eventname_args)
method is called.

### Requirements

This module requires Node >= 4. For Node < 6 `--harmony` flag is required.

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

It also works with `async`/`await` syntax:

```js
// As promise
result = await emitter.once('event')
// result is object Arguments
console.log('an event occurred with arguments:', result)
```

If the last argument for `once` method is a callback then it works as for
original `EventEmitter.once` method.

```js
// With callback
emitter.once('event', (a, b) => {
  console.log('an event occurred with arguments:', [a, b])
})

emitter.emit('event', 'a', 'b')
```

#### Overriding EventEmitter

`PromiseOnceEvents` can be used as a replacement for `EventEmitter` for existing
objects.

**Example:**

```js
const readable = fs.createReadStream(process.argv[2] || __filename)

readable.once = PromiseOnceEvents.prototype.once

readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`)
})

await readable.once('end')
console.log('There will be no more data.')
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
