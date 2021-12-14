import store from '@/store'
import { isFunc } from '@/utils'

const $state = store.state
const $getters = store.getters
const $dispatch = store.dispatch
const $dict = dictName => {
  if($state.dict && $state.dict[dictName]) {
    return $state.dict[dictName]
  } else if($getters[`dict/${dictName}`]) {
    return $getters[`dict/${dictName}`]
  }
}
const $keyName = dictName => {
  if($state.dict && $state.dict[dictName]) {
    return `$store.state.dict.${dictName}`
  } else if($getters[`dict/${dictName}`]) {
    return `$store.getters.dict/${dictName}`
  }
}
const $getObj = that => that.$options.filters

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

export const mapDictFilter = commonMap( key => commonFilter($dict(key)) )

export const mapAsyncDictFilter = commonMap( key => commonAsyncFilter(key), key => $keyName(key))

export function mapAsyncDictInit(arr, callback) {   
  return function init() {
    const length = arr.length
    const promises = arr.map(({ dictName, asyncName }) => new Promise(resolve => {
      const obj = $getObj(this)
      obj[dictName] = commonFilter($dict(dictName))
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
        .then(datas => datas[length])
        .then(pop.bind(this))
      }
    }
  }
}