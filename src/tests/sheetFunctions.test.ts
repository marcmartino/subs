type Tuple<A, B> = [A, B];
type Triple<A, B, C> = [A, B, C];
type anyTriple = Triple<any, any, any>;

type weight = number;
type sumProduct = weight[];
type equation = Tuple<weight, sumProduct>;
type subOption = Triple<string, number, number>;

import { SACCHARIDEPAIRSTABLE } from "../index";
import { assert } from "chai";

describe("test the sheet output functions", function() {
  it("should create valid output tables", function() {
    console.log(
      JSON.stringify(
        SACCHARIDEPAIRSTABLE(
          [[200, 110, 90]],
          [
            ["duocrose", 200, 200],
            ["halfcrose", 60, 50],
            ["othercrose", 200, 90]
          ]
        )
      )
    );
    assert.deepEqual(
      SACCHARIDEPAIRSTABLE(
        [[200, 110, 90]],
        [["duocrose", 200, 200], ["halfcrose", 60, 50], ["othercrose", 200, 90]]
      ),
      [],
      "table calculation"
    );
  });
});
