'use strict'

const PromiseOnceEvents = require('../lib/promise-once-events')
const fs = require('fs')

async function main () {
  const readable = fs.createReadStream(process.argv[2] || __filename)

  readable.once = PromiseOnceEvents.prototype.once

  readable.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`)
  })

  await readable.once('end')
  console.log('There will be no more data.')
}

main()
