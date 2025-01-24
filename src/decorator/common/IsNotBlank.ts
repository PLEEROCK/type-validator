import { ValidationOptions } from '../ValidationOptions';
import { buildMessage, ValidateBy } from './ValidateBy';

export const IS_NOT_BLANK = 'isNotBlank';

export function isNotBlank(value: unknown): boolean {
  return !!value && typeof value === 'string' && value.trim().length > 0;
}

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
