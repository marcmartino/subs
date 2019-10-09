export const listPermutations = <T>(length: number, options: T[]): T[][] => {
  let perms: T[][] = [];
  if (length === 1) {
    return options.map((x) => [x]);
  }
  if (length === 2) {
    for (let x = 0; x < options.length; x++) {
      const firstItem = options[x];
      for (let y = x + 1; y < options.length; y++) {
        const secondItem = options[y];
        perms = x !== y ? [...perms, [firstItem, secondItem]] : perms;
      }
    }
    return perms;
  }
  // TODO: higher length
  return [[options[0]]];
};