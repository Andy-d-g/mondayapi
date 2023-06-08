type Head<T extends string> = T extends `${infer First}.${string}` ? First : T;

type Tail<T extends string> = T extends `${string}.${infer Rest}`
  ? Rest
  : never;

type NonEmptyArray<T> = [T, ...T[]];

export type DeepPick<T, K extends string> = T extends object
  ? {
      [P in Head<K> & keyof T]: T[P] extends readonly unknown[]
        ? DeepPick<T[P][number], Tail<Extract<K, `${P}.${string}`>>>[]
        : DeepPick<T[P], Tail<Extract<K, `${P}.${string}`>>>;
    }
  : T;

type FlattenObject<
  T extends Record<string, unknown>,
  TKey = keyof T
> = TKey extends string
  ? T[TKey] extends Record<string, unknown>
    ? `${TKey}.${FlattenObject<T[TKey]>}`
    : T[TKey] extends Array<Record<string, unknown>>
    ? `${TKey}.${FlattenObject<T[TKey][number]>}`
    : `${TKey}`
  : never;

export type DistinctArgs<T extends Record<string, unknown>> = NonEmptyArray<
  FlattenObject<T>
>;

type BuildTuple<L extends number, T extends unknown[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, unknown]>;

export type MinusOne<N extends number> = BuildTuple<N> extends [
  ...infer U,
  unknown
]
  ? U["length"]
  : never;
