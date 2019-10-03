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
  10 ** precision(x) / (x * 10 ** precision(x));
