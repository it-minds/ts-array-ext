declare const enum SortDirection {
  ASC = 0,
  DESC = 1
}

declare interface TypeSafeColDef<T extends object> {
  field: Extract<keyof T, string | number>;
}

interface Array<T> {
  sortByAttr<K extends keyof T>(
    callbackfn: (value: T) => T[K],
    sortDirection?: SortDirection,
    thisArg?: any[]
  ): T[];

  sum(callbackfn: (value: T) => number, thisArg?: any[]): number;

  groupBy<K extends keyof T, R = T[]>(
    callback: (value: T) => T[K],
    func?: (value: T[]) => R,
    thisArg?: any[]
  ): Record<T[K] extends string ? T[K] : string, R>;

  average(callbackfn: (value: T) => number, thisArg?: any[]): number;

  min(callbackfn: (value: T) => number, thisArg?: any[]): T;
  max(callbackfn: (value: T) => number, thisArg?: any[]): T;
  median(
    callbackfn: (value: T) => number,
    tieBreaker?: -1 | 1,
    thisArg?: any[]
  ): T;
}
