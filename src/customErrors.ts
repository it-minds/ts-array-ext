/**
 * This is a base class used only to wrap a few required attributes away from each custom exception
 */
class BaseException extends Error {
  readonly _e = true;
  readonly key: string;

  constructor(msg: string, key: string) {
    super(msg);
    this.key = key;
  }
}

export class Exception_OutOfBounds extends BaseException {
  static defaultMessage = "Out of bounds";
  static key = "out_of_bounds";

  constructor(msg = Exception_OutOfBounds.defaultMessage) {
    super(msg, Exception_OutOfBounds.key);
  }
}

export class Exception_FindReplaceIllegalAction extends BaseException {
  static defaultMessage =
    "Action not allowed. addIfNotFound and replaceVal as a function isn't allowed at the same time.";
  static key = "find_replace_illegal_action";

  constructor(msg = Exception_FindReplaceIllegalAction.defaultMessage) {
    super(msg, Exception_FindReplaceIllegalAction.key);
  }
}

/**
 * This is ~~black magic~~ a helper type for declaring static variables to be present on the type of a static input.
 *
 * Say you want to put in the class declaration and not an instance of the class, this interface wraps this
 * and provides a required typed constructor.
 *
 * Example:
 * ```typescript
 *
 * const myMethod = (input: ClassBuilder) => {
 *    console.log(input.key)
 * }
 *
 * myMethod(BaseError) // Gives type error `Property 'key' is missing in type 'typeof BaseError' but required in type 'ClassBuilder<BaseError>'`
 *
 * myMethod(OutOfBounds) // OK
 * ```
 */
interface ClassBuilder<T = BaseException> {
  new(msg: string): T;
  defaultMessage: string;
  key: string;
}

/**
 * Assert and type guard input error to be one of the custom Error types.
 * The asserted type is derived from the second parameter.
 *
 * Example:
 * ```typescript
 * try { ... } catch (err) {
 *   assertErrorType(err, Exception_FindReplaceIllegalAction);
 *   // err is now typed as Exception_FindReplaceIllegalAction
 * }
 * ```
 *
 * @param err instance of the error to assert and type guard
 * @param errorClass Static class input of a custom Error
 */
export function assertErrorType<T extends BaseException>(
  err: BaseException,
  errorClass: ClassBuilder<T>
): asserts err is T {
  if (err._e !== true) {
    throw Error("Not a custom Error");
  }

  if (err.key !== errorClass.key) {
    throw Error("Not the same error type");
  }
}

/**
 * Custom type guard of the exception classes.
 *
 * Example:
 * ```typescript
 * try { ... } catch (err) {
 *   if (isErrorType(err, Exception_FindReplaceIllegalAction)) {
 *      // err is now typed as Exception_FindReplaceIllegalAction
 *   }
 * }
 * ```
 *
 * @param err instance of the error to type guard
 * @param errorClass Static class input of a custom Error
 */
export function isErrorType<T extends BaseException>(
  err: BaseException,
  errorClass: ClassBuilder<T>
): err is T {
  return err._e === true && err.key === errorClass.key;
}
