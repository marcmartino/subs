type Tuple<A, B> = [A, B];
type Triple<A, B, C> = [A, B, C];
type anyTriple = Triple<any, any, any>;

type weight = number;
type sumProduct = weight[];
type equation = Tuple<weight, sumProduct>;
type subOption = Triple<string, number, number>;

import { solveSystem } from "./txtMatricies";
import { tail, numericInverse, precision } from "./util";

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
  pac: equation,
  step: number = 1
) => {
  // assumed that oth equations are sum products
  const [answers, eqs] = combineEqs(pod, pac);

  return solveForMaximumAtHead(totalMass, answers, eqs, step);
};

export const isInvalidSolution = (maximum: number) => (x: number) =>
  x < 0 || x > maximum || parseFloat(x.toFixed(5)) !== x;

const roundToNearestStep = (step: number, x: number) => {
  const inv = numericInverse(step);
  return parseFloat((Math.round(x * inv) / inv).toFixed(precision(x)));
}

export const startMax = (base: number, step: number) => (
  answers: Tuple<number, number>,
  coeffs: Tuple<number, number>
) => 
  roundToNearestStep(step, Math.min(
    (answers[0] / coeffs[0]) * base,
    (answers[1] / coeffs[1]) * base
  ));

export const solveForMaximumAtHead = (
  maximum: number,
  answers: Tuple<number, number>,
  eqs: Tuple<number[], number[]>,
  step: number = 1
): number[] | false => {
  const firstKnowns = answers[0] - eqs[0][0] * maximum;
  const secondKnowns = answers[1] - eqs[1][0] * maximum;

  const firstUnknowns = tail(eqs[0]);
  const secondUnknowns = tail(eqs[1]);
  if (tail(eqs[0]).length >= 2) {
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
      return maximum > 0
        ? solveForMaximumAtHead(maximum - step, answers, eqs)
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
