'use strict'

var t = require('tap')
var PromiseOnceEvents = require('../lib/promise-once-events')

t.plan(2)

t.test('On event with callback', function (t) {
  t.plan(4)

  var ev = new PromiseOnceEvents()

  var promise = ev.once('event', function (arg1, arg2, resolve) {
    t.equal(arg1, 'arg1', 'Received event with correct arg1')
    t.equal(arg2, 'arg2', 'Received event with correct arg2')
    t.type(resolve, 'function', 'Received event with resolve callback')
    resolve('result')
  })

  promise.then(function (result) {
    t.equal(result, 'result', 'Fulfilled promise with correct result')
  }).then(function () {
    t.end()
  })

  ev.emit('event', 'arg1', 'arg2')
})

t.test('On event without callback', function (t) {
  t.plan(1)

  var ev = new PromiseOnceEvents()

  var promise = ev.once('event')

  promise.then(function (result) {
    t.same(result, ['arg1', 'arg2'], 'Fulfilled promise with correct result')
  }).then(function () {
    t.end()
  })

  ev.emit('event', 'arg1', 'arg2')
})
