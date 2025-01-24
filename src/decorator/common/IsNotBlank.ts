import { ValidationOptions } from '../ValidationOptions';
import { buildMessage, ValidateBy } from './ValidateBy';

export const IS_NOT_BLANK = 'isNotBlank';

/**
 * @param value The value to be checked
 * @returns true if the value is not blank, false otherwise
 */
export function isNotBlank(value: unknown): boolean {
  if (value == null) return false; // Verify if the value is null or undefined

  if (typeof value === 'string') return value.trim().length > 0;

  if (typeof value === 'number') return !isNaN(value);

  return false; // Any other type is considered invalid
}

/**
 * @param validationOptions The validation options
 * @returns {PropertyDecorator}
 *
 * @description
 * The decorator checks if the value is not blank
 * @description
 * The value is considered blank if it is null, undefined, empty string or NaN
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
