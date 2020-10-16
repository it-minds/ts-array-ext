import { Exception_FindReplaceIllegalAction } from "./customErrors";
import { isFunction } from "./typeGuards";

const findAndReplace: <T>(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    replaceVal: T | ((t?: T) => T),
    addIfNotFound?: boolean,
    thisArg?: any[]
) => T = function <T extends unknown>(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    replaceVal: T | ((t?: T) => T),
    addIfNotFound = false,
    thisArg = this
) {
        const oldIndex = thisArg.findIndex(predicate);
        if (oldIndex === -1) {
            if (!addIfNotFound) {
                return null;
            }

            if (isFunction(replaceVal)) {
                throw new Exception_FindReplaceIllegalAction();
            } else {
                thisArg.push(replaceVal);
            }
            return null;
        }
        const oldItem = thisArg[oldIndex];

        if (isFunction(replaceVal)) {
            thisArg[oldIndex] = replaceVal(thisArg[oldIndex]);
        } else {
            thisArg[oldIndex] = replaceVal;
        }

        return oldItem;
    };;

/**
* Given a predicate of finding an element and another element to take its place.
* Mutates the array and returns the found (old) element.
* If no element is found using the predicate the new element will not be added to the array, except if the addIfNotFound arg is true.
*
* @param addIfNotFound If true, the new element will be added at the end of the array, if the old element wasn't found.
*
* Example:
* ```typescript
* const oldElement = myArr.findAndReplace(x => x.score === 100, new Score())
* ```
*
* Example: User is added, if it doesn't already exist.
* ```typescript
* const user = {id: 2, name: "Paul"};
* const oldElement = myArr.findAndReplace(x => x.id === 2, user, true);
* ```
*/
Array.prototype.findAndReplace = findAndReplace;