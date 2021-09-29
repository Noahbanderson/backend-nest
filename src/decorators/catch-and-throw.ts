// prettier-ignore
export function CatchAndThrow(ErrorWrapper: any) {
  return (_parentClass: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = function(...args: any[]) {
      try {
        const result = originalMethod.apply(this, args)

        // check if method is asynchronous
        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          return result.catch((error: Error) => {
            throw new ErrorWrapper(error.message)
          })
        }

        return result
      } catch (error) {
        throw new ErrorWrapper(error.message)
      }
    }

    return descriptor
  }
}
