import { snd, thrd } from "./util";
import { calculateSubstitutionOptions } from "./equations";

function SACCHARIDESUB(
  [[targetQty, targetPOD, targetPAC]]: [Triple<number, number, number>],
  ...substitutionOptions: subOption[][]
) {
  const subs: subOption[] = [].concat(...substitutionOptions);
  const calculatedOptions = calculateSubstitutionOptions(
    targetQty,
    [targetPOD, subs.map(snd)],
    [targetPAC, subs.map(thrd)]
  );
  //return `${targetQty}g, ${targetPOD} pod, ${targetPAC} pac` ;
  return calculatedOptions
    ? JSON.stringify(
        calculatedOptions.reduce((namedOptions, calcQty, i) => {
          namedOptions[subs[i][0]] = calcQty * targetQty;
          return namedOptions;
        }, {})
      )
    : "No Substitutions Found";
}
