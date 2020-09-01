const wrapAsync = async <T>(promise: Promise<T>) => {
  return promise
    .then((result: T) => [true, result, undefined])
    .catch(err => [false, undefined, err])
}

export { wrapAsync }
