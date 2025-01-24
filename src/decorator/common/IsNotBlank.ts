import { ValidationOptions } from '../ValidationOptions';
import { buildMessage, ValidateBy } from './ValidateBy';

export const IS_NOT_BLANK = 'isNotBlank';

/**
 * @param value The value to be checked
 * @returns true if the value is not blank, false otherwise
 * @description
 * The value is considered blank if it is null, undefined or empty string
 * @description
 * Non-string values is considered not blank
 */
export function isNotBlank(value: unknown): boolean {
  if (value == null) return false;

  if (typeof value === 'string') return value.trim().length > 0;

  return true;
}

/**
 * @param validationOptions The validation options
 * @returns {PropertyDecorator}
 *
 * @description
 * The decorator checks if the value is not blank
 * @description
 * The value is considered blank if it is null, undefined or empty string
 * @description
 * Non-string values is considered not blank
 */
export function IsNotBlank(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_NOT_BLANK,
      validator: {
        validate: (value): boolean => isNotBlank(value),
        defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property should not be blank', validationOptions),
      },
    },
    validationOptions
  );
}
