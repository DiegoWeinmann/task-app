const wrapAsync = async <T, E = any>(promise: Promise<T>) => {
  return promise
    .then((result: T) => {
      return [result, undefined] as [T, undefined]
    })
    .catch((err: E) => {
      return [undefined, err] as [undefined, any]
    })
}

export { wrapAsync }
