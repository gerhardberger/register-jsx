const debug = require('debug')('register-jsx:test')
const test = require('ava')

require('../')({ factory: 'tr' })
debug('require registered')

test('single element', t => {
  const d = require('./a.jsx')
  t.deepEqual(d.in, d.out)
})

test('nested elements', t => {
  const d = require('./b.jsx')
  t.deepEqual(d.in, d.out)
})
