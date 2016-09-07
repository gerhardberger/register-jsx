const tr = (n, o, c) => {
  return { n, o, c }
}

module.exports = {
  in: <foo a="b" />,
  out: {
    n: 'foo',
    o: { a: 'b' },
    c: undefined
  }
}
