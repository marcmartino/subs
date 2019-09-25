export const frst = (triple: anyTriple) => triple[0];
export const snd = (triple: anyTriple) => triple[1];
export const thrd = (triple: anyTriple) => triple[2];
export const head = <T>(arr: T[]) => (arr.length ? arr[0] : []);
export const tail = <T>(arr: T[]) => arr.slice(1);