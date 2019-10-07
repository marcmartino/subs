import {
  solveForMaximumAtHead as solve,
  isInvalidSolution,
  startMax
} from "../equations";
import { assert } from "chai";

describe("solving for a possible substitution", function() {
  it("should exclude invalid values", function() {
    assert.isFalse(isInvalidSolution(100), "maximum should be valid");
    assert.isFalse(isInvalidSolution(0), "minimum should be valid");
    
    assert.isTrue(isInvalidSolution(-1), "less than zero should be true");
  });

  it("should find appropriate variable maximums", function() {
    assert.equal(
      startMax(1)([85, 145], [70, 50]),
      1,
      "simple integer maximum"
    );
    assert.equal(
      startMax(.2)([85, 145], [70, 50]),
      1.2,
      "should round to nearest step"
    );
    assert.equal(
      startMax(.25)([850, 1051], [70, 50]),
      12.25,
      "maximum rounded to the quarter"
    );
  });

  it("should calculate very simple substitutions", function() {
    assert.deepEqual(
      solve(15, [15, 20], [[10, 0], [5, 20]]),
      [3 / 2, 5 / 8],
      "simple substitution"
    );
  });
  it("should brute force a the first value and calculate the others for substitutions", function() {
    assert.deepEqual(
      solve(20, [14, 17], [[1, 2, 3], [0, 7, 1]]),
      [9, 2.4210526315789473, 0.05263157894736836],
      "simple brute force option substitution"
    );
    assert.deepEqual(
      solve(5, [10, 16], [[2, 1, 2], [3, 2, 3]]),
      [4, 2, 0],
      "emphesize the first value and not come up with [1, 2, 3]"
    );
  });
  it("should brute force a the first two values and calculate the others for substitutions", function() {
    assert.deepEqual(
      solve(5, [12, 20], [[1, 2, 3, 4], [3, 1, 3, 1]]),
      [5, 2, 1, 0],
      "multiple brute forced values"
    );
  });
});
