'use strict'

/* global Feature, Scenario, Given, When, Then */
const t = require('tap')
require('tap-given')(t)

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

Feature('Test promise-once-events module', () => {
  const PromiseOnceEvents = require('../lib/promise-once-events')

  Scenario('Once event with callback', function () {
    Given('PromiseOnceEvents object', () => {
      this.ev = new PromiseOnceEvents()
    })

    Given('callback for event', () => {
      this.callback = (arg1, arg2, done) => {
        this.arg1 = arg1
        this.arg2 = arg2
        done()
      }
    })

    When('subscribed once for event with callback', () => {
      this.result = this.ev.once('event', this.callback)
    })

    When('even is emitted with arguments and another callback', done => {
      this.ev.emit('event', 'arg1', 'arg2', done)
    })

    Then('result is an instance of the same class', () => {
      this.result.should.be.an.instanceOf(PromiseOnceEvents)
    })

    Then('callback has been called with correct arguments', () => {
      this.arg1.should.equal('arg1')
      this.arg2.should.equal('arg2')
    })
  })

  Scenario('Once event as promised', function () {
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
      return this.promise.should.eventually.deep.equal(['arg1', 'arg2'])
    })
  })
})
