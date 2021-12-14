# vue 字典辅助函数管理下拉列表和过滤器实践

## Gitee 地址
[https://gitee.com/rayleighvickecn/dict](https://gitee.com/rayleighvickecn/dict)

## github 地址
[https://github.com/rayleighzhao/dict](https://github.com/rayleighzhao/dict)

## 简介
管理下拉列表的函数: customOwnKeys<br>
管理过滤器用到三个函数: mapDictFilter、mapAsyncDictFilter、mapAsyncDictInit

## 字典数据
定义在Vuex<br>
@/store/modules/dict.js
```javascript
import { customOwnKeys } from '@/utils'

function mutationFunc(key) {
  return function mutation(state, val) {
    state[key] = val
  }
}

export default {
  namespaced: true,
  state() {
    return {
      customOwnKeysStatus1: customOwnKeys({
        '01': '壹',
        '09': '玖',
        '11': '拾壹',
        '21': '廿壹',
        // [customOwnKeys.ID]: ['01','09','11','21']
      }, /*(a, b) => String(a) > String(b) ? 1 : -1 */),
      status2: {
        '001': '状态2-1',
        '002': '状态2-2',
      },
      asyncStatus3: {
        '003': '状态3-3',
        '004': '状态3-4',
      },
      asyncStatus4: {
        '003': '状态4-3',
        '004': '状态4-4',
      },
      asyncStatus5: {
        '003': '状态5-3',
        '004': '状态5-4',
      },
    }
  },
  getters: {},
  mutations: {
    setAsyncStatus3: mutationFunc('asyncStatus3'),
    setAsyncStatus4: mutationFunc('asyncStatus4'),
    setAsyncStatus5: mutationFunc('asyncStatus5'),
  },
  actions: {
    setAsyncStatus3(context) {
      setTimeout(() => {
        context.commit('setAsyncStatus3', {
          '003': '状态3-33',
          '004': '状态3-44',
        })
      }, 2000)
    },
    setAsyncStatus4(context) {
      setTimeout(() => {
        context.commit('setAsyncStatus4', {
          '003': '状态4-33',
          '004': '状态4-44',
        })
      }, 2000)
    },
    setAsyncStatus5(context) {
      setTimeout(() => {
        context.commit('setAsyncStatus5', {
          '003': '状态5-33',
          '004': '状态5-44',
        })
      }, 2000)
    }
  },
}
```

## customOwnKeys
用法一: key转换成字符串, 按Unicode排序
```javascript
customOwnKeysStatus1: customOwnKeys({
  '01': '壹',
  '09': '玖',
  '11': '拾壹',
  '21': '廿壹',
}),
```
用法二:
```javascript
customOwnKeysStatus1: customOwnKeys({
  '01': '壹',
  '09': '玖',
  '11': '拾壹',
  '21': '廿壹',
  [customOwnKeys.ID]: ['01','09','11','21']
}),
```
用法三:
```javascript
customOwnKeysStatus1: customOwnKeys({
  '01': '壹',
  '09': '玖',
  '11': '拾壹',
  '21': '廿壹',
}, ['01','09','11','21']),
```
用法四: 同 Array.prototype.sort
```javascript
customOwnKeysStatus1: customOwnKeys({
  '01': '壹',
  '09': '玖',
  '11': '拾壹',
  '21': '廿壹',
}, (a, b) => String(a) > String(b) ? 1 : -1),
```
自定义顺序下拉列表示例
```html
<select name="customOwnKeysStatus1" id="customOwnKeysStatus1" v-model="customOwnKeysStatus1Value"> 
  <option value="" selected>全部</option>
  <option v-for="(value, key) in customOwnKeysStatus1" :key="key" :value="key">{{value}}</option>
</select>
```
```javascript
data() {
  return {
    customOwnKeysStatus1Value: '',
  }
},
computed: {
  ...mapState('dict', ['customOwnKeysStatus1']),
},
```

## mapDictFilter
vue2用法
```html
<td>{{item.status | status2}}<td>
```
```javascript
filters: {
  ...mapDictFilter(['status2'])
}
```
vue3用法
```html
<td>{{status2(item.status)}}<td>
```
```javascript
methods: {
  ...mapDictFilter(['status2'])
}
```

## mapAsyncDictFilter
vue2用法
```html
<td>{{item.asyncStatus3 | asyncStatus3}}</td>
```
```javascript
methods: {
  ...mapActions('dict', ['setAsyncStatus3'])
},
filters: {
  ...mapDictFilter(['asyncStatus3']),
},
watch: {
  ...mapAsyncDictFilter(['asyncStatus3'])
},
created() {
  this.setAsyncStatus3()
},
```
vue3用法
```html
<td>{{asyncStatus3(item.asyncStatus3)}}</td>
```
```javascript
methods: {
  ...mapActions('dict', ['setAsyncStatus3'])
},
watch: {
  ...mapAsyncDictFilter(['asyncStatus3']),
},
created() {
  this.setAsyncStatus3()
},
```

## mapAsyncDictInit callback 是 function
因为 mapAsyncDictFilter 是异步获得, 存在数据先获得而字典后获得不同步的问题, 所以用 mapAsyncDictInit 更稳妥, 数组 [{dictName: 'asyncStatus4', asyncName: 'setAsyncStatus4'}] 字典并发获取, 全部获取完了才运行 callback<br>
vue2用法
```html
<td>{{item.asyncStatus4 | asyncStatus4}}</td>
```
vue3用法
```html
<td>{{asyncStatus4(item.asyncStatus4)}}</td>
```
js 部分无差别
```javascript
mounted: mapAsyncDictInit([{dictName: 'asyncStatus4', asyncName: 'setAsyncStatus4'}], function() {
  const list = [
    {id: 1, asyncStatus4: '003'}, 
    {id: 2, asyncStatus4: '004'},
    {id: 3, asyncStatus4: '004'},
    {id: 4, asyncStatus4: '003'},
  ]
  setTimeout(() => this.list = list, 2000)
})
```
## mapAsyncDictInit callback 是 { push, pop }
push 函数和 [{dictName: 'asyncStatus5', asyncName: 'setAsyncStatus5'}] 字典数组并发获取, push 函数获取的结果后, 运行 pop 函数, 第一个参数就是获得的结果<br>
vue2用法
```html
<td>{{item.asyncStatus5 | asyncStatus5}}</td>
```
vue3用法
```html
<td>{{asyncStatus5(item.asyncStatus5)}}</td>
```
js 部分无差别
```javascript
mounted: mapAsyncDictInit([{dictName: 'asyncStatus5', asyncName: 'setAsyncStatus5'}], { 
  push() {
    return new Promise(
      resolve => setTimeout(
        () => resolve([
          {id: 1, asyncStatus5: '003'}, 
          {id: 2, asyncStatus5: '004'},
          {id: 3, asyncStatus5: '004'},
          {id: 4, asyncStatus5: '003'},
        ])
        ,
        2000
      )
    )
  },
  pop(data) {
    this.list = data
  }
})
```

## customOwnKeys 源码
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
customOwnKeys.ID = Symbol.for('customOwnKeys')
```

## mapDictFilter、mapAsyncDictFilter、mapAsyncDictInit 源码
vue2 和 vue3 只是 $getObj 部分不同<br>
@/filters/dict.js
```javascript
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
// vue2
const $getObj = that => that.$options.filters
// // vue3
// const $getObj = that => that

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

function commonMap(keyFunc, func) {
  return function map(arr) {
    const returnObj = {}
    arr.forEach(key => {
      returnObj[keyFunc(key)] = func(key)
    })
    return returnObj
  }
}

export const mapDictFilter = commonMap( key => key, key => commonFilter($dict(key)) )

export const mapAsyncDictFilter = commonMap( key => $keyName(key), key => commonAsyncFilter(key) )

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
```