'use strict'

const events = require('events')
const EventEmitter = events.EventEmitter

const Promise = require('any-promise')

class PromiseOnceEvents extends EventEmitter {
  once (event, cb) {
    if (cb) {
      return super.once(event, cb)
    } else {
      return new Promise(resolve => {
        super.once(event, (...args) => {
          return resolve(args)
        })
      })
    }
  }
}

module.exports = PromiseOnceEvents
