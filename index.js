const path = require('path')
const fs = require('fs')

const jsx = require('jsx-transform-modern')
const mime = require('mime-types')
const findRoot = require('find-root')
const minimatch = require('minimatch')

const types = [
  'application/javascript',
  'text/jsx'
]

let ignores = { }

module.exports = (options) => {
  types.forEach(t => {
    const ext = mime.extension(t)

    require.extensions[`.${ext}`] = (module, filename) => {
      const isDependency = filename.indexOf('node_modules') >= 0

      if (isDependency) {
        module._compile(fs.readFileSync(filename, 'utf8'), filename)
      } else {
        try {
          const root = findRoot(filename)
          if (!ignores[root]) {
            try {
              const jsxignore = path.join(root, '.jsxignore')
              ignores[root] = fs.readFileSync(jsxignore, 'utf8')
                .split('\n')
                .map(str => str.trim())
                .filter(str => str.length > 0)
            } catch (e) {
              ignores[root] = []
            }
          }

          const relative = path.relative(root, filename)
          const isIgnored = !!ignores[root].find(ignore =>
            minimatch(relative, ignore, { matchBase: true }))

          if (isIgnored) {
            module._compile(fs.readFileSync(filename, 'utf8'), filename)
          } else {
            module._compile(jsx.fromFile(filename, options), filename)
          }
        } catch (e) {
          module._compile(jsx.fromFile(filename, options), filename)
        }
      }
    }
  })

  return jsx
}
