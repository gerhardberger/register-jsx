const tr = (n, o, c) => {
  return { n, o, c }
}

module.exports = {
  in: <foo a="b">
    <bar />
    <bar b={123}>
      <baz c={true} />
    </bar>
  </foo>,
  out: {
    n: 'foo',
    o: { a: 'b' },
    c: [
      {
        n: 'bar',
        o: undefined,
        c: undefined
      },
      {
        n: 'bar',
        o: { b: 123 },
        c: [
          {
            n: 'baz',
            o: { c: true },
            c: undefined
          }
        ]
      }
    ]
  }
}
