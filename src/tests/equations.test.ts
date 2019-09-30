/*
    {"0":[[200,77.5,90]],
    "1":[["sucrose",100,100]],
    "2":[["invert syrup",130,167]],
    "3":[["corn syrup 42 de",48,80]],
    "4":[["dextrose",70,190]]}

    {"0":[[200,77.5,90]],"1":[["invert syrup",130,167]],"2":[["corn syrup 42 de",48,80]],"3":[["dextrose",70,190]]}
    {"0":[[200,77.5,90]],"1":[["corn syrup 42 de",48,80]],"2":[["dextrose",70,190]],"3":[["sucrose",100,100]]}
    {"0":[[200,77.5,90]],"1":[["dextrose",70,190]],"2":[["sucrose",100,100]],"3":[["invert syrup",130,167]]}
*/
import {
  solveForMaximumAtHead as solve,
  isInvalidSolution
} from "../equations";
import { assert } from "chai";

describe("solving for a possible substitution", function() {
  it("solution predicate should be accurate", function() {
    assert.isFalse(isInvalidSolution(100)(100), "maximum should be valid");
    assert.isFalse(isInvalidSolution(100)(0), "minimum should be valid");
    assert.isTrue(isInvalidSolution(100)(101), "over maximum should be true");
    assert.isTrue(isInvalidSolution(100)(-1), "less than zero should be true");
    assert.isTrue(
      isInvalidSolution(100)(2 / 3),
      "repeating decimal should be true"
    );
    assert.isFalse(
      isInvalidSolution(100)(3 / 2),
      "non-repeating decimal should be false"
    );
  });
  it("should emphasize the first value", function() {
    assert.deepEqual(
      solve(60, [15, 20], [[10, 0], [5, 20]]),
      [7, 10],
      "simple substitution"
    );
  });
});
