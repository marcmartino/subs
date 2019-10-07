import { snd, thrd } from "./util";
import { calculateSubstitutionOptions } from "./equations";

const formatReturnList = (subs: subOption[], targetQty: number) => (
  namedOptions: string[],
  calcQty: number,
  i: number
): string[] => [
  ...namedOptions,
  `${subs[i][0]}: ${parseFloat((calcQty * targetQty).toFixed(2))}`
];

const flattenList = <T>(subsList: T[], someSubs: T[]) => [
  ...subsList,
  ...someSubs
];

function saccSub(
  step: number,
  [[targetQty, targetPOD, targetPAC]]: [Triple<number, number, number>],
  substitutionOptions: subOption[][]
): string[] {
  const subs: subOption[] = substitutionOptions.reduce(flattenList, []);
  const calculatedOptions = calculateSubstitutionOptions(
    targetQty,
    [targetPOD, subs.map(snd)],
    [targetPAC, subs.map(thrd)]
  );
  return calculatedOptions
    ? calculatedOptions.reduce(formatReturnList(subs, targetQty), [])
    : ["No Substitutions Found"];
}

const listPermutations = <T>(length: number, options: T[]): T[][] => {
  let perms: T[][] = [];
  if (length === 2) {
    for (let x = 0; x < options.length; x++) {
      const firstItem = options[x];
      for (let y = x + 1; y < options.length; y++) {
        const secondItem = options[y];
        perms = x !== y ? [...perms, [firstItem, secondItem]] : perms;
      }
    }
    return perms;
  }
  // TODO: higher length
  return [[options[0]]];
};

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
  );
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
