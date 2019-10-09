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
      listPermutations(2, [1, 2, 3, 4]),
      [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]],
      "longer pairs"
    );
  });
  it("should create permutations of threes", function() {
    assert.deepEqual(
      listPermutations(3, [1, 2, 3]),
      [[1, 2, 3], [2, 1, 3], [3, 1, 2]],
      "simple threes"
    );
    assert.deepEqual(
      listPermutations(3, [1, 2, 3, 4]),
      [
        [1, 2, 3],
        [1, 2, 4],
        [1, 3, 4],
        [2, 1, 3],
        [2, 1, 4],
        [2, 3, 4],
        [3, 1, 2],
        [3, 1, 4],
        [3, 2, 4],
        [4, 1, 2],
        [4, 1, 3],
        [4, 2, 3]
      ],
      "long list of threes"
    );
  });
});
