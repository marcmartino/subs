type Tuple<A, B> = [A, B];
type Triple<A, B, C> = [A, B, C];
type anyTriple = Triple<any, any, any>;

type weight = number;
type sumProduct = weight[];
type equation = Tuple<weight, sumProduct>;
type subOption = Triple<string, number, number>;

import { solveSystem } from "./txtMatricies";
import { tail } from "./util";

const combineEqs = (
  [equal1, val1s]: equation,
  [equal2, val2s]: equation
): Tuple<Tuple<number, number>, Tuple<number[], number[]>> => [
  [equal1, equal2],
  [val1s, val2s]
];

export const calculateSubstitutionOptions = (
  totalMass: weight,
  pod: equation,
  pac: equation
) => {
  // assumed that oth equations are sum products
  const [answers, eqs] = combineEqs(pod, pac);

  return solveForMaximumAtHead(totalMass, answers, eqs);
};

export const isInvalidSolution = (maximum: number) => (x: number) =>
  x < 0 || x > maximum || parseFloat(x.toFixed(5)) !== x;

export const solveForMaximumAtHead = (
  maximum: number,
  answers: Tuple<number, number>,
  eqs: Tuple<number[], number[]>
): number[] | false => {
  const firstKnowns = answers[0] - eqs[0][0] * maximum;
  const secondKnowns = answers[1] - eqs[1][0] * maximum;

  const firstUnknowns = tail(eqs[0]);
  const secondUnknowns = tail(eqs[1]);
  if (tail(eqs[0]).length > 2) {
    const childEqVals = solveForMaximumAtHead(
      200,
      [firstKnowns, secondKnowns],
      [firstUnknowns, secondUnknowns]
    );

    if (childEqVals) {
      console.log("found a working maxima", [maximum, ...childEqVals]);
      return [maximum, ...childEqVals];
    } else {
      console.log(" maxima was non working");
      return maximum >= 0
        ? solveForMaximumAtHead(maximum - 0.5, answers, eqs)
        : false;
    }
  }
  try {
    const solvedSystem = solveSystem(answers, [
      eqs[0] as Tuple<number, number>,
      eqs[1] as Tuple<number, number>
    ]);
    console.log("solved system calculated", solvedSystem);
    const roundedSolvedSystem = solvedSystem.map(x => parseFloat(x.toFixed(6)));
    return roundedSolvedSystem.filter(isInvalidSolution(maximum)).length === 0
      ? roundedSolvedSystem
      : false;
  } catch (error) {
    console.log("solve system catch " + maximum, error);
    return false;
  }
};
