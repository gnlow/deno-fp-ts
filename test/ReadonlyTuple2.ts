import * as assert from 'assert'
import { identity, pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as _ from '../src/ReadonlyTuple2'

describe('ReadonlyTuple2', () => {
  describe('combinators', () => {
    it('swap', () => {
      assert.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
    })
  })

  describe('type class members', () => {
    it('compose', () => {
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.compose([true, 2])), [true, 'a'])
    })

    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.map(double)), [2, 'a'])
    })

    it('extract', () => {
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: readonly [number, string]): number => _.snd(fa).length + _.fst(fa)
      assert.deepStrictEqual(pipe([1, 'bb'], _.extend(f)), [3, 'bb'])
    })

    it('bimap', () => {
      const double = (n: number): number => n * 2
      const len = (s: string): number => s.length
      assert.deepStrictEqual(pipe([1, 'a'], _.bimap(len, double)), [2, 1])
    })

    it('mapLeft', () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.mapLeft(len)), [1, 1])
    })

    it('duplicate', () => {
      assert.deepStrictEqual(pipe([1, 'a'] as const, _.duplicate), [[1, 'a'], 'a'])
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          ['b', 1] as const,
          _.reduce('a', (acc, a) => acc + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe(['a', 1] as const, _.foldMap(monoidString)(identity)), 'a')
    })

    it('reduceRight', () => {
      assert.deepStrictEqual(
        pipe(
          ['b', 1] as const,
          _.reduceRight('a', (acc, a) => acc + a)
        ),
        'ba'
      )
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
      assert.deepStrictEqual(traverse([2, 'a']), O.some([2, 'a']))
      assert.deepStrictEqual(traverse([1, 'a']), O.none)
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      assert.deepStrictEqual(sequence([O.some(1), 'a']), O.some([1, 'a']))
      assert.deepStrictEqual(sequence([O.none, 'a']), O.none)
    })
  })

  describe('instances', () => {
    it('getApplicative', () => {
      const A = _.getApplicative(monoidString)
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(A.of(1), [1, ''])
      assert.deepStrictEqual(pipe([double, 'a'] as const, A.ap([1, 'b'])), [2, 'ab'])
    })

    it('getMonad', () => {
      const M = _.getMonad(monoidString)
      assert.deepStrictEqual(
        pipe(
          [1, 'a'] as const,
          M.chain((a) => [a * 2, 'b'])
        ),
        [2, 'ab']
      )
    })
  })
})