// react에서 쓸만한 유틸 필요하면 여기에 구현
const bindAllMethods = (that) => {
  const prototype = Object.getPrototypeOf(that)
  const methodNames = Object.getOwnPropertyNames(prototype)
  methodNames.forEach((methodName) => {
    that[methodName] = prototype[methodName]
  })
  console.log(that)
}

export {
  bindAllMethods,
}
