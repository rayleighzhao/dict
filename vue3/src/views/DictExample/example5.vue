<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>编号</td>
          <td>同步状态</td>
          <td>异步状态</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{status5(item.status5)}}</td>
          <td>{{asyncStatus5(item.asyncStatus5)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapDictFilter, mapAsyncDictInit } from '@/filters/dict'

export default {
  name: 'example5',
  data() {
    return {
      list: [],
    }
  },
  methods: {
    ...mapDictFilter(['status5']),
  },
  mounted: mapAsyncDictInit([{dictName: 'asyncStatus5', asyncName: 'setAsyncStatus5'}], { 
    push() {
      return new Promise(
        resolve => setTimeout(
          () => resolve([
            {id: 1, status5: '001', asyncStatus5: '003'}, 
            {id: 2, status5: '002', asyncStatus5: '004'},
            {id: 3, status5: '001', asyncStatus5: '004'},
            {id: 4, status5: '002', asyncStatus5: '003'},
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
}
</script>