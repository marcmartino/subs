import { assert } from "chai";
import {
  determinant as det,
  scalarMult,
  inverse,
  pairTimesTxt,
  txtTimesPair,
  solveSystem
} from "../txtMatricies";

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
      [[[4, -2], [-2, -2]], [[-3, -2], [1, -2]]],
      "basic inverse"
    );
    assert.deepEqual(
      inverse(testFractionMatrix),
      [[[4, -1], [-2, -1]], [[-3, -1], [1, -1]]],
      "inverse of matrix with fraction values"
    );
  });

  it("should multiply a 2x1 matrix by a 2x2", function() {
    assert.deepEqual(
      pairTimesTxt([1, 2], testMatrix),
      [7, 10],
      "basic pair times 2x2 multiplication"
    );
    assert.deepEqual(
      pairTimesTxt([1, 2], testFractionMatrix),
      [3.5, 5],
      "pair times 2x2 of fractions multiplication"
    );
    assert.deepEqual(
      pairTimesTxt([[1, 2], [2, 3]], testMatrix),
      [2.5, 11 / 3],
      "fraction pair times 2x2 multiplication"
    );
    assert.deepEqual(
      pairTimesTxt([[1, 2], [2, 3]], testFractionMatrix),
      [5 / 4, 11 / 6],
      "fraction pair times 2x2 of fractions multiplication"
    );
  });

  it("should multiply a 2x2 matrix by a 2x1", function() {
    assert.deepEqual(
      txtTimesPair(testMatrix, [1, 2]),
      [5, 11],
      "basic pair times 2x2 multiplication"
    );
    assert.deepEqual(
      txtTimesPair(testFractionMatrix, [1, 2]),
      [5 / 2, 11 / 2],
      "pair times 2x2 of fractions multiplication"
    );
    assert.deepEqual(
      txtTimesPair(testMatrix, [[1, 2], [1, 2]]),
      [3 / 2, 7 / 2],
      "fraction pair times 2x2 multiplication"
    );
    assert.deepEqual(
      txtTimesPair(testFractionMatrix, [[1, 2], [1, 2]]),
      [3 / 4, 7 / 4],
      "fraction pair times 2x2 of fractions multiplication"
    );
  });

  it("should solve two by two systems", function() {
    assert.deepEqual(
      solveSystem([10, 3], testMatrix),
      [-17, 27 / 2],
      "basic numeric system of equations"
    );
  });
});
