export const listPermutations = <T>(len: number, options: T[]): T[][] => {
  let perms: T[][] = [];

  // if (len === 1) {
  //   return options.map(x => [x]);
  // }
  if (len > 2) {
    const permXs = options;
    const permYs = listPermutations(len - 1, options);

    for (let i = 0; i < permXs.length; i++) {
      const x = permXs[i];
      for (let yIndex = 0; yIndex < permYs.length; yIndex++) {
        const y = permYs[yIndex];
        if (y.indexOf(x) === -1) perms = [...perms, [x, ...y]];
      }
    }
    return perms;
  }
  if (len === 2) {
    for (let x = 0; x < options.length; x++) {
      const firstItem = options[x];
      for (let y = x + 1; y < options.length; y++) {
        const secondItem = options[y];
        perms = x !== y ? [...perms, [firstItem, secondItem]] : perms;
      }
    }
    return perms;
  }
  return [];
};
