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

  return solveForMaximumAtHead(
    startMax(step)(answers, [eqs[0][0], eqs[1][0]]),
    answers,
    eqs,
    step,
    startMax(step)
  );
};

export const isInvalidSolution = (x: number) => x < 0; // || parseFloat(x.toFixed(5)) !== x;

const roundToNearestStep = (step: number, x: number) => {
  const inv = numericInverse(step);
  return parseFloat((Math.round(x * inv) / inv).toFixed(precision(x)));
};

export const startMax = (step: number) => (
  answers: Tuple<number, number>,
  coeffs: Tuple<number, number>
) => {
  const maxxed = roundToNearestStep(
    step,
    Math.min(
      Math.max(0, answers[0] / coeffs[0] /* * base */),
      Math.max(0, answers[1] / coeffs[1] /* * base */)
    )
  );

  return Math.max(0, maxxed);
};

export const solveForMaximumAtHead = (
  maximum: number,
  answers: Tuple<number, number>,
  eqs: Tuple<number[], number[]>,
  step: number = 1,
  newMax: (
    answers: Tuple<number, number>,
    coeffs: Tuple<number, number>
  ) => number = startMax(step)
): number[] | false => {
  const firstKnowns = answers[0] - eqs[0][0] * maximum;
  const secondKnowns = answers[1] - eqs[1][0] * maximum;

  const firstUnknowns = tail(eqs[0]);
  const secondUnknowns = tail(eqs[1]);
  if (tail(eqs[0]).length >= 2) {
    const childEqVals = solveForMaximumAtHead(
      newMax(
        [firstKnowns, secondKnowns],
        [firstUnknowns[0], secondUnknowns[0]]
      ),
      [firstKnowns, secondKnowns],
      [firstUnknowns, secondUnknowns],
      step,
      newMax
    );

    if (childEqVals) {
      return [maximum, ...childEqVals];
    } else {
      return maximum > 0
        ? solveForMaximumAtHead(maximum - step, answers, eqs, step, newMax)
        : false;
    }
  }
  try {
    const solvedSystem = solveSystem(answers, [
      eqs[0] as Tuple<number, number>,
      eqs[1] as Tuple<number, number>
    ]);
    const roundedSolvedSystem = solvedSystem;

    return roundedSolvedSystem.filter(isInvalidSolution).length === 0
      ? roundedSolvedSystem
      : false;
  } catch (error) {
    console.log("solve system catch " + maximum, error);
    return false;
  }
};
