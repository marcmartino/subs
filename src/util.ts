type Tuple<A, B> = [A, B];
type Triple<A, B, C> = [A, B, C];
type anyTriple = Triple<any, any, any>;

export const frst = (triple: anyTriple) => triple[0];
export const snd = (triple: anyTriple) => triple[1];
export const thrd = (triple: anyTriple) => triple[2];
export const head = <T>(arr: T[]) => (arr.length ? arr[0] : []);
export const tail = <T>(arr: T[]) => arr.slice(1);
export const precision = (x: number) => ((x + "").split(".")[1] || []).length;
export const numericInverse = (x: number) =>
  Math.pow(10, precision(x)) / (x * Math.pow(10, precision(x)));

export const flatten = <T>(xs: T[][]) =>
  xs.reduce(
    (flattenedXs: T[], innerXs: T[]) => [...flattenedXs, ...innerXs],
    []
  );
export const flatMap = <T, U>(xs: T[], func: (x: T) => U[]): U[] =>
  flatten(xs.map(func));

export const fromEntries = <T>(xs: [string, ][]) =>
  xs.reduce((obj, [prop, ...val]) => ({ ...obj, [prop]: val }));

export const get = (prop: string) => <T>(obj: {[key: string]: T}): T => obj[prop];