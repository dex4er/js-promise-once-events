'use strict'

var events = require('events')

function promiseOnceEvents () {
  events.call(this)
}

promiseOnceEvents.prototype = Object.create(events.prototype)

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
