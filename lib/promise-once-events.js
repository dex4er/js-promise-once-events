'use strict'

const events = require('events')
const EventEmitter = events.EventEmitter

const Promise = require('any-promise')

class PromiseOnceEvents extends EventEmitter {
  once (event, cb) {
    return new Promise(resolve => {
      super.once(event, (...args) => {
        if (cb) {
          return cb(...args, resolve)
        } else {
          return resolve(args)
        }
      })
    })
  }
}

module.exports = PromiseOnceEvents
