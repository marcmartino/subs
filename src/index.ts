import { snd, thrd } from "./util";
import { listPermutations } from "./permutations";
import { calculateSubstitutionOptions } from "./equations";
import { flatten } from "./util";

const formatReturnList = (subs: subOption[], targetQty: number) => (
  namedOptions: string[],
  calcQty: number,
  i: number
): string[] => [
  ...namedOptions,
  `${subs[i][0]}: ${parseFloat((calcQty * targetQty).toFixed(2))}`
];

function saccSub(
  step: number,
  [[targetQty, targetPOD, targetPAC]]: [Triple<number, number, number>],
  substitutionOptions: subOption[][]
): string[] {
  const subs: subOption[] = flatten(substitutionOptions);
  const calculatedOptions = calculateSubstitutionOptions(
    targetQty,
    [targetPOD, subs.map(snd)],
    [targetPAC, subs.map(thrd)],
    step
  );
  return calculatedOptions
    ? calculatedOptions.reduce(formatReturnList(subs, targetQty), [])
    : ["No Substitutions Found"];
}

/**
 * Finds a saccharide substitution with pairs of options
 *
 * @param {Triple<number, number, number>} targets Target qty, pod/sweetness, freezing point depression/pac.
 * @param {subOption[][]} substitution_options list of triples denoting the options suited for substitutions
 * @return {string[]} either a list representing the found substitution, or a single that says no substitutions found
 * @customfunction
 */
function SACCHARIDEPAIRSTABLE(
  targets: [Triple<number, number, number>],
  substitutions: subOption[]
) {
  const [[targetQty, targetPOD, targetPAC]] = targets;
  const subOptions: {
    [substitutionName: string]: Tuple<number, number>;
  } = substitutions.reduce(
    (allOptions, [subName, ...subVals]) => ({
      ...allOptions,
      [subName]: subVals
    }),
    {}
  );
  const subPermutations = listPermutations(2, Object.keys(subOptions));
  return subPermutations.map(([subName1, subName2]) =>
    SACCHARIDESUBTENTHS(targets, [
      [subName1, ...subOptions[subName1]] as subOption,
      [subName2, ...subOptions[subName2]] as subOption
    ])
  ).map((sub, i) => [substitutions[i][0], sub]);
}

/**
 * Finds a saccharide substitution with 1/2 accuracy
 *
 * @param {Triple<number, number, number>} targets Target qty, pod/sweetness, freezing point depression/pac.
 * @param {subOption[][]} substitution_options list of triples denoting the options suited for substitutions
 * @return {string[]} either a list representing the found substitution, or a single that says no substitutions found
 * @customfunction
 */
function SACCHARIDESUBHALVES(
  targets: [Triple<number, number, number>],
  ...substitutionOptions: subOption[][]
): string[] {
  return saccSub(0.5, targets, substitutionOptions);
}

/**
 * Finds a saccharide substitution with tenths accuracy
 *
 * @param {Triple<number, number, number>} targets Target qty, pod/sweetness, freezing point depression/pac.
 * @param {subOption[][]} substitution_options list of triples denoting the options suited for substitutions
 * @return {string[]} either a list representing the found substitution, or a single that says no substitutions found
 * @customfunction
 */
function SACCHARIDESUBTENTHS(
  targets: [Triple<number, number, number>],
  ...substitutionOptions: subOption[][]
): string[] {
  return saccSub(0.1, targets, substitutionOptions);
}

/**
 * Finds a saccharide substitution with hundredths accuracy
 *
 * @param {Triple<number, number, number>} targets Target qty, pod/sweetness, freezing point depression/pac.
 * @param {subOption[][]} substitution_options list of triples denoting the options suited for substitutions
 * @return {string[]} either a list representing the found substitution, or a single that says no substitutions found
 * @customfunction
 */
function SACCHARIDESUBHUNDRETHS(
  targets: [Triple<number, number, number>],
  ...substitutionOptions: subOption[][]
): string[] {
  return saccSub(0.01, targets, substitutionOptions);
}
