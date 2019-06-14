/**
 * @file A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) = fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) = F.map(F.map(fa, ab), bc)`
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

/**
 * @since 2.0.0
 */
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}

/**
 * @since 2.0.0
 */
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <L, A, B>(fa: Kind2<F, L, A>, f: (a: A) => B) => Kind2<F, L, B>
}

/**
 * @since 2.0.0
 */
export interface Functor2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly map: <A, B>(fa: Kind2<F, L, A>, f: (a: A) => B) => Kind2<F, L, B>
}

/**
 * @since 2.0.0
 */
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <U, L, A, B>(fa: Kind3<F, U, L, A>, f: (a: A) => B) => Kind3<F, U, L, B>
}

/**
 * @since 2.0.0
 */
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <X, U, L, A, B>(fa: Kind4<F, X, U, L, A>, f: (a: A) => B) => Kind4<F, X, U, L, B>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition<F, G> {
  readonly map: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => B) => HKT<F, HKT<G, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorCompositionHKT1<F, G extends URIS> {
  readonly map: <A, B>(fa: HKT<F, Kind<G, A>>, f: (a: A) => B) => HKT<F, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorCompositionHKT2<F, G extends URIS2> {
  readonly map: <LG, A, B>(fa: HKT<F, Kind2<G, LG, A>>, f: (a: A) => B) => HKT<F, Kind2<G, LG, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorCompositionHKT2C<F, G extends URIS2, LG> {
  readonly map: <A, B>(fa: HKT<F, Kind2<G, LG, A>>, f: (a: A) => B) => HKT<F, Kind2<G, LG, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition11<F extends URIS, G extends URIS> {
  readonly map: <A, B>(fa: Kind<F, Kind<G, A>>, f: (a: A) => B) => Kind<F, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  readonly map: <LG, A, B>(fa: Kind<F, Kind2<G, LG, A>>, f: (a: A) => B) => Kind<F, Kind2<G, LG, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition12C<F extends URIS, G extends URIS2, LG> {
  readonly map: <A, B>(fa: Kind<F, Kind2<G, LG, A>>, f: (a: A) => B) => Kind<F, Kind2<G, LG, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  readonly map: <LF, A, B>(fa: Kind2<F, LF, Kind<G, A>>, f: (a: A) => B) => Kind2<F, LF, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition2C1<F extends URIS2, G extends URIS, LF> {
  readonly map: <A, B>(fa: Kind2<F, LF, Kind<G, A>>, f: (a: A) => B) => Kind2<F, LF, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  readonly map: <LF, LG, A, B>(fa: Kind2<F, LF, Kind2<G, LG, A>>, f: (a: A) => B) => Kind2<F, LF, Kind2<G, LG, B>>
}

/**
 * @since 2.0.0
 */
export interface FunctorComposition22C<F extends URIS2, G extends URIS2, LG> {
  readonly map: <LF, A, B>(fa: Kind2<F, LF, Kind2<G, LG, A>>, f: (a: A) => B) => Kind2<F, LF, Kind2<G, LG, B>>
}

/**
 * @since 2.0.0
 */
export function getFunctorComposition<F extends URIS2, G extends URIS2, LG>(
  F: Functor2<F>,
  G: Functor2C<G, LG>
): FunctorComposition22C<F, G, LG>
export function getFunctorComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): FunctorComposition22<F, G>
export function getFunctorComposition<F extends URIS2, G extends URIS, LF>(
  F: Functor2C<F, LF>,
  G: Functor1<G>
): FunctorComposition2C1<F, G, LF>
export function getFunctorComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): FunctorComposition21<F, G>
export function getFunctorComposition<F extends URIS, G extends URIS2, LG>(
  F: Functor1<F>,
  G: Functor2C<G, LG>
): FunctorComposition12C<F, G, LG>
export function getFunctorComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): FunctorComposition12<F, G>
export function getFunctorComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): FunctorComposition11<F, G>
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> {
  return {
    map: (fa, f) => F.map(fa, ga => G.map(ga, f))
  }
}
