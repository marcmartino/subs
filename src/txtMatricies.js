"use strict";
exports.__esModule = true;
var matrixNumVal = function (num) {
    return typeof num === "number" ? num : num[0] / num[1];
};
exports.txtDeterminant = function (_a) {
    var anb = _a[0], cnd = _a[1];
    var _b = anb.concat(cnd).map(matrixNumVal), a = _b[0], b = _b[1], c = _b[2], d = _b[3];
    return a * d - b * c;
};
var txtConstMult = function (cons, _a) {
    var _b = _a[0], a = _b[0], b = _b[1], _c = _a[1], c = _c[0], d = _c[1];
    return [
        [matrixNumMult(cons, a), matrixNumMult(cons, b)],
        [matrixNumMult(cons, c), matrixNumMult(cons, d)]
    ];
};
var matrixNumMult = function (x, y) {
    if (typeof x === "number") {
        if (typeof y === "number") {
            return x * y;
        }
        else {
            return [x * y[0], y[1]];
        }
    }
    else {
        if (typeof y === "number") {
            if (x[0] === 1) {
                return [y, x[1]];
            }
        }
    }
    return matrixNumVal(x) * matrixNumVal(y);
};
exports.txtInverse = function (_a) {
    var _b = _a[0], a = _b[0], c = _b[1], _c = _a[1], b = _c[0], d = _c[1];
    var determinant = exports.txtDeterminant([[a, b], [c, d]]);
    if (determinant === 0)
        throw new Error("Determinant of 0; cannot find inverse");
    return txtConstMult([1, determinant], [[d, matrixNumMult(-1, b)], [matrixNumMult(-1, c), a]]);
};
var pairTimesTxt = function (pair, _a) {
    var _b = _a[0], a = _b[0], b = _b[1], _c = _a[1], c = _c[0], d = _c[1];
    return [
        matrixNumVal(matrixNumMult(pair[0], a)) +
            matrixNumVal(matrixNumMult(pair[1], c)),
        matrixNumVal(matrixNumMult(pair[0], b)) +
            matrixNumVal(matrixNumMult(pair[1], d))
    ];
};
exports.solveSystem = function (answers, matrix) {
    //   console.log("solving a system", answers, matrix);
    return pairTimesTxt(answers, exports.txtInverse(matrix));
};
