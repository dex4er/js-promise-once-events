'use strict'

var events = require('events')
var EventEmitter = events.EventEmitter

function promiseOnceEvents () {
  EventEmitter.call(this)
}

promiseOnceEvents.prototype = Object.create(EventEmitter.prototype)

promiseOnceEvents.prototype.constructor = promiseOnceEvents

promiseOnceEvents.prototype.once = function (event, cb) {
  var this$ = this
  return new Promise(function (resolve) {
    return Object.getPrototypeOf(promiseOnceEvents.prototype).once.call(this$, event, function () {
      if (cb) {
        return cb.apply(cb, Array.prototype.slice.call(arguments).concat(resolve))
      } else {
        return resolve(arguments)
      }
    })
  })
}

module.exports = promiseOnceEvents
