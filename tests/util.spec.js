import { expect } from './tools.js'
import {
  echo,
  fill,
  where,
  remove,
} from '../index.js'


describe('Util', () => {

  it('should echo', () => {
    const o = {}
    expect(echo(o)).to.eq(o)
    expect(echo(1)).to.eq(1)
    expect(echo()).to.eq(undefined)
  })

  describe('fill', () => {
    it('should create array and fill it with indexes', () => {
      const i = 3
      const a = fill(i)
      expect(a).to.eql([ 0, 1, 2 ])
      expect(a.length).to.eq(i)
    })

    it('should create array and fill with map callback', () => {
      const i = 3
      const a = fill(i, x => x * 2)
      expect(a).to.eql([ 0, 2, 4 ])
      expect(a.length).to.eq(i)
    })
  })

  describe('where', () => {
    it('should filter by callback', () => {
      const a = where([ 0, 1, 2, 3 ], x => x%2)
      expect(a).to.eql([ 1, 3 ])
    })

    it('should filter by array', () => {
      const e = [ 1, 2 ]
      const a = where([ 0, 1, 2, 3 ], e)
      expect(a).to.eql(e)
    })

    it('should filter by object', () => {
      const a = [
        { name: 'a', kind: 'dog' },
        { name: 'b', kind: 'human' },
        { name: 'c', kind: 'dog' },
        { name: 'd', kind: 'human' },
      ]
      expect(where(a, { kind: 'dog' })).to.eql([ a[ 0 ], a[ 2 ] ])
    })

    it('should filter by primitive', () => {
      expect(where([ 0,1,2,1 ], 1)).to.eql([ 1,1 ])
      expect(where([ true,false,true ], true)).to.eql([ true, true ])
      expect(where([ 'a','b','c' ], 'b')).to.eql([ 'b' ])
    })
  })

  describe('remove', () => {
    it('should remove by callback', () => {
      const a = [ 0, 1, 2, 3 ]
      const b = remove(a, x => x%2)
      expect(a).to.eql([ 0, 2 ])
      expect(b).to.eql([ 1, 3 ])
    })

    it('should remove by array', () => {
      const a = [ 0, 1, 2, 3 ]
      const b = [ 1, 2 ]
      expect(remove(a, b)).to.eql(b)
      expect(a).to.eql([ 0, 3 ])
    })

    it('should remove by object', () => {
      const a = [
        { name: 'a', kind: 'dog' },
        { name: 'b', kind: 'human' },
        { name: 'c', kind: 'dog' },
        { name: 'd', kind: 'human' },
      ]

      const actual = [ a[ 1 ], a[ 3 ] ]
      const removed = [ a[ 0 ], a[ 2 ] ]

      expect(remove(a, { kind: 'dog' })).to.eql(removed)
      expect(a).to.eql(actual)
    })

    it('should remove by primitive', () => {
      let a = [ 0,1,2,1 ]
      expect(remove(a, 1)).to.eql([ 1,1 ])
      expect(a).to.eql([ 0,2 ])

      a = [ true,false,true ]

      expect(remove(a, true)).to.eql([ true, true ])
      expect(a).to.eql([ false ])

      a = [ 'a','b','c' ]
      expect(remove(a, 'b')).to.eql([ 'b' ])
      expect(a).to.eql([ 'a','c' ])
    })

  })
})

