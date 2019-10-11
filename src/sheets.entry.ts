type Tuple<A, B> = [A, B];
type Triple<A, B, C> = [A, B, C];
type anyTriple = Triple<any, any, any>;

type weight = number;
type sumProduct = weight[];
type equation = Tuple<weight, sumProduct>;
type subOption = Triple<string, number, number>;

import { snd, thrd, frst } from "./util";
import { listPermutations } from "./permutations";
import { calculateSubstitutionOptions } from "./equations";
import { flatten, get, existsInCollection } from "./util";

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
export function SACCHARIDEPAIRSTABLE(
  [targets]: [Triple<number, number, number>],
  substitutions: subOption[]
) {
  const [targetQty, targetPOD, targetPAC] = targets;
  const subOptions: {
    [substitutionName: string]: Tuple<number, number>;
  } = substitutions.reduce(
    (allOptions, [subName, ...subVals]) => ({
      ...allOptions,
      [subName]: subVals
    }),
    {}
  );

  const subsCollection: {
    [saccharideName: string]: number;
  }[] = [
    ...listPermutations(2, Object.keys(subOptions)),
    ...listPermutations(3, Object.keys(subOptions)).slice(0, Object.keys(subOptions).length)
  ]
    .map(subNames =>
      subNames.map(
        (subName): Triple<string, number, number> => [
          subName,
          subOptions[subName][0],
          subOptions[subName][1]
        ]
      )
    )
    .map((perms: Triple<string, number, number>[]) => {
      const option = calculateSubstitutionOptions(
        targetQty,
        [targetPOD, perms.map(snd)],
        [targetPAC, perms.map(thrd)],
        0.01
      );
      if (option)
        return option.reduce(
          (optionsObj, qty, i) => ({
            ...optionsObj,
            [frst(perms[i])]: parseFloat((qty * targetQty).toFixed(2))
          }),
          {}
        );
      return false;
    })
    .filter(opt => opt)
    .reduce(
      (collection: {}[], sub: {}) =>
        existsInCollection(collection, sub) ? collection : [...collection, sub],
      []
    );

  return subCollectionToTable(Object.keys(subOptions), subsCollection);
}

const subCollectionToTable = (
  sacchNames: string[],
  subs: { [saccharideName: string]: number }[]
): (string | number)[][] => [
  ["", ...Object.keys(subs).map(i => `Option #${parseInt(i, 10) + 1}`),   ""],
  ...sacchNames.map(name => [
    name,
    ...subs.map(get(name)).map(val => val || 0.0),
    name
  ])
];

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