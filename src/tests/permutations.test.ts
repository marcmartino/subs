import { listPermutations } from "../permutations";
import { assert } from "chai";

describe("calculating permutations", function() {
  it("should create non uniquely ordered permutations of twos", function() {
    assert.deepEqual(
      listPermutations(2, [1, 2, 3]),
      [[1, 2], [1, 3], [2, 3]],
      "simple pairs"
    );
    assert.deepEqual(
      listPermutations(3, [1, 2, 3]),
      [[1, 2, 3], [2, 1, 3], [3, 1, 3]],
      "simple triples"
    );
  });
});
