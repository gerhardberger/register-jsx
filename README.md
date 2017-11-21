# register-jsx

a simple require hook for jsx transpilation without babel or react

``` jsx
// a.jsx

const tr = (name, options, children) => {
  return { name, options, children }
}

module.exports = <foo>
  <bar a={123} />
</foo>
```

``` js
require('register-jsx')({ factory: 'tr' })

console.log(require('a.jsx'))
/*
  {
    name: 'foo',
    options: undefined,
    children: [{
      name: 'bar',
      options: { a: 123 },
      children: undefined
    }]
  }
*/
```

## install

```
$ npm i register-jsx
```

## usage

#### `require('register-jsx')(options)`

it uses [**jsx-transform**](https://github.com/alexmingoia/jsx-transform) for transpiling and `options` are just passed onto [`jsxTransform.fromFile`](https://github.com/alexmingoia/jsx-transform#module_jsx-transform..fromFile).

it returns the `jsxTransform` object.

Starting from version `1.0.2`, the module ignores everything inside `node_modules` folders, and can also ignore other files if a `.jsxignore` file is present in the project's root directory. The `.jsxignore` file must have one pattern per line, and the lines are first trimmed, and then matched using `minimatch`.

## test

```
$ npm test
```
