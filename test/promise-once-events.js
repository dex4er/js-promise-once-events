'use strict'

const t = require('tap')
const PromiseOnceEvents = require('../lib/promise-once-events')

const TIMEOUT = 10000

t.plan(2)

t.test('On event with callback', {timeout: TIMEOUT}, t => {
  t.plan(4)

  const ev = new PromiseOnceEvents()

  const promise = ev.once('event', (arg1, arg2, resolve) => {
    t.equal(arg1, 'arg1', 'Received event with correct arg1')
    t.equal(arg2, 'arg2', 'Received event with correct arg2')
    t.type(resolve, 'function', 'Received event with resolve callback')
    resolve('result')
  })

  promise.then(result => {
    t.equal(result, 'result', 'Fulfilled promise with correct result')
  }).then(() => {
    t.end()
  })

  ev.emit('event', 'arg1', 'arg2')
})

t.test('On event without callback', {timeout: TIMEOUT}, t => {
  t.plan(1)

  const ev = new PromiseOnceEvents()

  const promise = ev.once('event')

  promise.then(result => {
    t.same(result, ['arg1', 'arg2'], 'Fulfilled promise with correct result')
  }).then(() => {
    t.end()
  })

  ev.emit('event', 'arg1', 'arg2')
})
