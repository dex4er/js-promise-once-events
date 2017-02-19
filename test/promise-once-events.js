'use strict'

const PromiseOnceEvents = require('../lib/promise-once-events')

/* global Feature, Scenario, Given, When, Then */
const t = require('tap')
require('tap-given')(t)
require('chai').should()

Feature('Test promise-once-events module', () => {
  Scenario('On event with callback', function () {
    Given('PromiseOnceEvents object', () => {
      this.ev = new PromiseOnceEvents()
    })

    Given('callback for event', () => {
      this.callback = (arg1, arg2, resolve) => {
        this.arg1 = arg1
        this.arg2 = arg2
        this.resolve = resolve
        resolve('result')
      }
    })

    When('subscribed once for event with promise and callback', () => {
      this.promise = this.ev.once('event', this.callback)
    })

    When('even is emitted with arguments', () => {
      this.ev.emit('event', 'arg1', 'arg2')
    })

    Then('promise is fulfilled with correct result', () => {
      return this.promise
      .then(result => {
        result.should.equal('result')
      })
    })

    Then('callback has been called with correct arguments', () => {
      this.arg1.should.equal('arg1')
      this.arg2.should.equal('arg2')
      this.resolve.should.be.a('function')
    })
  })

  Scenario('On event without callback', () => {
    Given('PromiseOnceEvents object', () => {
      this.ev = new PromiseOnceEvents()
    })

    When('subscribed once for event with promise without callback', () => {
      this.promise = this.ev.once('event')
    })

    When('even is emitted with arguments', () => {
      this.ev.emit('event', 'arg1', 'arg2')
    })

    Then('promise is fulfilled with arguments as result', () => {
      return this.promise
      .then(result => {
        result.should.deep.equal(['arg1', 'arg2'])
      })
    })
  })
})
