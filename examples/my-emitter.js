const PromiseOnceEvents = require('promise-once-events')

class MyEmitter extends PromiseOnceEvents {}

const emitter = new MyEmitter()

// As promise
emitter.once('event').then((result) => {
  // result is object Arguments
  console.log('an event occurred with arguments:', Array.prototype.slice.call(result))
})

emitter.emit('event', 'a', 'b')

// With callback
emitter.once('event', (a, b, resolve) => {
  console.log('an event occurred with arguments:', [a, b])
  // resolve promise
  resolve('passed')
}).then((result) => {
  console.log('promise is fulfilled with result:', result)
})

emitter.emit('event', 'a', 'b')
