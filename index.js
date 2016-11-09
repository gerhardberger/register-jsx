const jsx = require('jsx-transform')
const mime = require('mime-types')

const types = [
  'application/javascript',
  'text/jsx'
]

module.exports = (options) => {
  types.forEach(t => {
    const ext = mime.extension(t)

    require.extensions[`.${ext}`] = (module, filename) => {
      const code = jsx.fromFile(filename, options)
      module._compile(code, filename)
    }
  })

  return jsx
}
