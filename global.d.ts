type Tuple<A, B> = [A, B];
type Triple<A, B, C> = [A, B, C];
type anyTriple = Triple<any, any, any>;

type weight = number;
type sumProduct = weight[];
type equation = Tuple<weight, sumProduct>;
type subOption = Triple<string, number, number>;


type matrixNum = number | Tuple<number, number>;
type txtMatrix = [[matrixNum, matrixNum], [matrixNum, matrixNum]];