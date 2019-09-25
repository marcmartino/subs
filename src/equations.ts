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
    const solvedSystem = solveSystem(
      [firstKnowns, secondKnowns],
      [firstUnknowns, secondUnknowns]
    );
    console.log("solved system calculated", solvedSystem);
    const roundedSolvedSystem = solvedSystem.map(x => parseFloat(x.toFixed(6)));
    return roundedSolvedSystem.filter(
      x => x < 0 || x > maximum || parseFloat(x.toFixed(4)) !== x
    ).length === 0
      ? [maximum, ...roundedSolvedSystem]
      : maximum >= 0
      ? solveForMaximumAtHead(maximum - 0.5, answers, eqs)
      : false;
  } catch (error) {
    console.log("solve system catch");
    return maximum >= 0
      ? solveForMaximumAtHead(maximum - 0.5, answers, eqs)
      : false;
  }
};
