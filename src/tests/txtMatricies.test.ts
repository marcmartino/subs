import { assert } from "chai";
import { determinant as det, scalarMult, inverse } from "../txtMatricies";

type Tuple<A, B> = [A, B];

type matrixNum = number | Tuple<number, number>;
type txtMatrix = [[matrixNum, matrixNum], [matrixNum, matrixNum]];

const testMatrix: txtMatrix = [[1, 2], [3, 4]];
const testMatrix2: txtMatrix = [[4, 5], [4, 5]];
const testFractionMatrix: txtMatrix = [[[1, 2], [2, 2]], [[3, 2], [4, 2]]];

describe("2x2 matrix algebra", function() {
  it("should calculate basic determinants", function() {
    assert.equal(det(testMatrix), -2, "two by two matrix determinant");
    assert.equal(
      det(testMatrix2),
      0,
      "two by two matrix determinant in zero case"
    );
    assert.equal(det([[4, 6], [3, 8]]), 14, "2x2 det example");

    assert.equal(
      det(testFractionMatrix),
      -0.5,
      "determinant with fraction values in the matrix"
    );
  });

  it("should do scalar multiplication", function() {
    assert.deepEqual(
      scalarMult(2, testMatrix),
      [[2, 4], [6, 8]],
      "basic scalar multiplication on matrix"
    );
    assert.deepEqual(
      scalarMult(3, testFractionMatrix),
      [[[3, 2], [6, 2]], [[9, 2], [12, 2]]],
      "scalar multiplication on a matrix of fractions"
    );
    assert.deepEqual(
      scalarMult([1, 3], testMatrix2),
      [[[4, 3], [5, 3]], [[4, 3], [5, 3]]],
      "fractional multiplication of a matrix"
    );
    assert.deepEqual(
      scalarMult([1, 2], testFractionMatrix),
      [[[1, 4], [2, 4]], [[3, 4], [4, 4]]],
      "fraction filed matrix times a fraction scalar"
    );
  });

  it("should find matrix inverses", function() {
    assert.deepEqual(
      inverse(testMatrix),
      [[[4, -2], [-2,-2]], [[-3, -2], [1, -2]]],
      "basic inverse"
    );
    console.log(JSON.stringify(inverse(testFractionMatrix)[0]))
    console.log(JSON.stringify(inverse(testFractionMatrix)[1]))
    assert.deepEqual(
      inverse(testFractionMatrix),
      [[-4, 2],
      [3, -1]],
      "inverse of matrix with fraction values"
    );
  });
});
