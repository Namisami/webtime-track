export type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends unknown[] ? K : never
}[keyof T];

export type ObjectKeys<T> = {
  [K in keyof T]: 
    T[K] extends object 
      ? T[K] extends Array<unknown> 
        ? never 
        : K 
      : never;
}[keyof T];

export type ArrayElement<T> = 
  T extends Array<infer ElementType> ? ElementType : T;
