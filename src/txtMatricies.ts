const matrixNumVal = (num: matrixNum): number =>
  typeof num === "number" ? num : num[0] / num[1];

export const txtDeterminant = ([anb, cnd]: txtMatrix): number => {
  const [a, b, c, d] = [...anb, ...cnd].map(matrixNumVal);
  return a * d - b * c;
};

const txtConstMult = (
  cons: matrixNum,
  [[a, b], [c, d]]: txtMatrix
): txtMatrix => [
  [matrixNumMult(cons, a), matrixNumMult(cons, b)],
  [matrixNumMult(cons, c), matrixNumMult(cons, d)]
];

const matrixNumMult = (x: matrixNum, y: matrixNum): matrixNum => {
  if (typeof x === "number") {
    if (typeof y === "number") {
      return x * y;
    } else {
      return [x * y[0], y[1]];
    }
  } else {
    if (typeof y === "number") {
      if (x[0] === 1) {
        return [y, x[1]];
      }
    }
  }
  return matrixNumVal(x) * matrixNumVal(y);
};

export const txtInverse = ([[a, c], [b, d]]: txtMatrix): txtMatrix => {
  const determinant = txtDeterminant([[a, b], [c, d]]);
  if (determinant === 0)
    throw new Error("Determinant of 0; cannot find inverse");
  return txtConstMult(
    [1, determinant],
    [[d, matrixNumMult(-1, b)], [matrixNumMult(-1, c), a]]
  );
};

const pairTimesTxt = (
  pair: Tuple<number, number>,
  [[a, b], [c, d]]: txtMatrix
): [number, number] => [
  matrixNumVal(matrixNumMult(pair[0], a)) +
    matrixNumVal(matrixNumMult(pair[1], c)),
  matrixNumVal(matrixNumMult(pair[0], b)) +
    matrixNumVal(matrixNumMult(pair[1], d))
];

export const solveSystem = (
  answers: Tuple<number, number>,
  matrix: txtMatrix
): [number, number] => {
  //   console.log("solving a system", answers, matrix);
  return pairTimesTxt(answers, txtInverse(matrix));
};