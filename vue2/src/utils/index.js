export function customOwnKeys(obj, config) {
  return new Proxy(obj, {
    ownKeys() {
      const keys = obj[customOwnKeys.ID] || []
      if(keys.length > 0) {
        return keys
      } else if(config && Array.isArray(config)) {
        return config
      } else if(isFunc(config)) {
        return Reflect.ownKeys(obj).sort(config)
      } else {
        return Reflect.ownKeys(obj).sort()
      }
    }
  })
}
customOwnKeys.ID = Symbol.for('customOwnKeys')
export function isFunc(val) {
  return val && typeof val === 'function'
}