import { snd, thrd } from "./util";
import { calculateSubstitutionOptions } from "./equations";

function SACCHARIDESUB(
  [[targetQty, targetPOD, targetPAC]]: [Triple<number, number, number>],
  ...substitutionOptions: subOption[][]
): string[] {
  const subs: subOption[] = substitutionOptions.reduce((subsList, someSubs) => [...subsList, ...someSubs], []);
  const calculatedOptions = calculateSubstitutionOptions(
    targetQty,
    [targetPOD, subs.map(snd)],
    [targetPAC, subs.map(thrd)]
  );
  return calculatedOptions
    ? calculatedOptions.reduce((namedOptions: string[], calcQty, i): string[] => {
        return [...namedOptions, `${subs[i][0]}: ${calcQty * targetQty}`];
      }, [])
    : ["No Substitutions Found"];
}
