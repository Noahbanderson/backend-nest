import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	isDateString,
} from 'class-validator'

// prettier-ignore
export function IsBefore(neighborProperty: string, options?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBefore',
      target: object.constructor,
      propertyName,
      constraints: [neighborProperty],
      options,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [neighborPropertyName] = args.constraints as [string]
          const neighborValue = (args.object as any)[neighborPropertyName]

          if (
            typeof value === 'string' &&
            isDateString(value) &&
            typeof neighborValue === 'string' &&
            isDateString(neighborValue)
          ) {
            return new Date(value) < new Date(neighborValue)
          } else {
            return false
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.value} is not before ${
            (args.object as any)[args.constraints[0]]
          }`
        },
      },
    })
  }
}
