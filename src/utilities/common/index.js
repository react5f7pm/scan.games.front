const bindAllMethods = (that) => {
  const prototype = Object.getPrototypeOf(that)
  const methodNames = Object.getOwnPropertyNames(prototype)
  methodNames.forEach((methodName) => {
    that[methodName] = prototype[methodName].bind(that)
  })
}

const numberFormat = (number) => {
  return Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number)
}

export {
  bindAllMethods,
  numberFormat,
}
