import assert from "assert";
import { txtDeterminant } from "../txtMatricies";

const testMatrix: txtMatrix = [[1, 2], [3, 4]];
const testMatrix2: txtMatrix = [[4, 5], [4, 5]];

assert.equal(txtDeterminant(testMatrix), -2, "two by two matrix determinant");
assert.equal(
  txtDeterminant(testMatrix2),
  0,
  "two by two matrix determinant in zero case"
);
