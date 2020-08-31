const wrapAsync = <T>(promise: Promise<T>) => {
  return promise
    .then((result: T) => ({ ok: true, result, error: undefined }))
    .catch(err => ({ ok: false, result: undefined, error: err }))
}

export { wrapAsync }
