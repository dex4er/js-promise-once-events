'use strict'

const PromiseOnceEvents = require('../lib/promise-once-events')

class MyEmitter extends PromiseOnceEvents {}

const emitter = new MyEmitter()

// With callback
emitter.once('event', (a, b) => {
  console.log('an event occurred with arguments:', [a, b])
})

emitter.emit('event', 'a', 'b')

// As promise
emitter.once('event').then(result => {
  // result is object Arguments
  console.log('an event occurred with arguments:', result)
})

emitter.emit('event', 'a', 'b')
