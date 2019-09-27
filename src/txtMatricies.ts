type Tuple<A, B> = [A, B];

type matrixNum = number | Tuple<number, number>;
type txtMatrix = [[matrixNum, matrixNum], [matrixNum, matrixNum]];

const matrixNumVal = (num: matrixNum): number =>
  typeof num === "number" ? num : num[0] / num[1];

export const determinant = ([anb, cnd]: txtMatrix): number => {
  const [a, b, c, d] = [...anb, ...cnd].map(matrixNumVal);
  return a * d - b * c;
};

export const scalarMult = (
  cons: matrixNum,
  [[a, b], [c, d]]: txtMatrix
): txtMatrix => [
  [numberMult(cons, a), numberMult(cons, b)],
  [numberMult(cons, c), numberMult(cons, d)]
];

export const numberMult = (x: matrixNum, y: matrixNum): matrixNum => {
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
    } else {
      return [y[0] * x[0], x[1] * y[1]];
    }
  }
  return matrixNumVal(x) * matrixNumVal(y);
};

export const inverse = ([[a, b], [c, d]]: txtMatrix): txtMatrix => {
  const det = determinant([[a, b], [c, d]]);
  if (det === 0) throw new Error("Determinant of 0; cannot find inverse");
  return scalarMult([1, det], [[d, numberMult(-1, b)], [numberMult(-1, c), a]]);
};

export const pairTimesTxt = (
  pair: Tuple<matrixNum, matrixNum>,
  [[a, b], [c, d]]: txtMatrix
): Tuple<number, number> => [
  matrixNumVal(numberMult(pair[0], a)) + matrixNumVal(numberMult(pair[1], c)),
  matrixNumVal(numberMult(pair[0], b)) + matrixNumVal(numberMult(pair[1], d))
];

export const txtTimesPair = (
  [[a, b], [c, d]]: txtMatrix,
  pair: Tuple<matrixNum, matrixNum>
): Tuple<number, number> => [
  matrixNumVal(numberMult(pair[0], a)) + matrixNumVal(numberMult(pair[1], b)),
  matrixNumVal(numberMult(pair[0], c)) + matrixNumVal(numberMult(pair[1], d))
];

export const solveSystem = (
  answers: Tuple<number, number>,
  matrix: txtMatrix
) => {
  return txtTimesPair(inverse(matrix), answers);
};
