# vue 字典辅助函数管理下拉列表和filter实践

### Gitee 地址
[https://gitee.com/rayleighvickecn/dict](https://gitee.com/rayleighvickecn/dict)

### customOwnKeys 源码
@/utils/index.js
```javascript
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
```

### mapDictFilter、mapAsyncDictFilter、mapAsyncDictInit 源码
@/filters/dict.js
```javascript
import store from '@/store'
import { isFunc } from '@/utils'

const $dict = { ...store.state.dict, ...store.getters.dict }
const $dispatch = store.dispatch
const $isGetter = key => Boolean(store.getters && store.getters.dict && store.getters.dict[key])
const $keyName = key => `$store.${$isGetter(key) ? 'getters' : 'state'}.dict.${key}`
const $getObj = that => that

function commonFilter(dictName) {
  return function filter(val) {
    return dictName[val] || val || '未知'
  }
}

function commonAsyncFilter(key, callback) {
  return function watch(dictName) {
    const obj = $getObj(this)
    obj[key] = commonFilter(dictName)
    if (isFunc(callback)) {
      callback()
    }
  }
}

function commonMap(func, keyFunc) {
  return function map(arr) {
    const returnObj = {}
    arr.forEach(key => {
      const keyName = keyFunc && isFunc(keyFunc) ? keyFunc(key) : key
      returnObj[keyName] = func(key)
    })
    return returnObj
  }
}

export const mapDictFilter = commonMap( key => commonFilter($dict[key]) )

export const mapAsyncDictFilter = commonMap( key => commonAsyncFilter(key), key => $keyName(key))

export function mapAsyncDictInit(arr, callback) {   
  return function init() {
    const promises = arr.map(({ dictName, asyncName }) => new Promise(resolve => {
      const obj = $getObj(this)
      obj[dictName] = commonFilter($dict[dictName])
      this.$watch($keyName(dictName), commonAsyncFilter(dictName, resolve))
      $dispatch(`dict/${asyncName}`)
    }))
    if(isFunc(callback)) {
      Promise.all(promises).then(callback.bind(this))
    } else {
      const { push = null, pop = null } = callback || {}
      const promise = Promise.resolve()
      if(isFunc(push)) {
        promises.push(promise.then(push.bind(this)))
      }
      const result = Promise.all(promises)
      if(isFunc(pop)) {
        result
        .then(arr => arr[promises.length -1])
        .then(pop.bind(this))
      }
    }
  }
}
```