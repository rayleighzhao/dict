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
      status1: {
        '01': '壹',
        '09': '玖',
        '11': '拾壹',
        '21': '廿壹',
      },
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
      status3: {
        '001': '状态3-1',
        '002': '状态3-2',
      },
      asyncStatus3: {
        '003': '状态3-3',
        '004': '状态3-4',
      },
      status4: {
        '001': '状态4-1',
        '002': '状态4-2',
      },
      asyncStatus4: {
        '003': '状态4-3',
        '004': '状态4-4',
      },
      status5: {
        '001': '状态5-1',
        '002': '状态5-2',
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