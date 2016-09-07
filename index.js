const debug = require('debug')('register-jsx:index')
const jsx = require('jsx-transform')
const mime = require('mime-types')

const types = [
  'application/javascript',
  'text/jsx'
]

module.exports = (options) => {
  types.forEach(t => {
    const ext = mime.extension(t)

    debug(`registering .${ext}`)
    require.extensions[`.${ext}`] = (module, filename) => {
      debug(`compiling ${filename}`)

      const code = jsx.fromFile(filename, options)
      module._compile(code, filename)
    }
  })

  return jsx
}
