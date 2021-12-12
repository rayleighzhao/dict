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
          <td>{{status4(item.status4)}}</td>
          <td>{{asyncStatus4(item.asyncStatus4)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapDictFilter, mapAsyncDictInit } from '@/filters/dict'

export default {
  name: 'example4',
  data() {
    return {
      list: [],
    }
  },
  methods: {
    ...mapDictFilter(['status4']),
  },
  mounted: mapAsyncDictInit([{dictName: 'asyncStatus4', asyncName: 'setAsyncStatus4'}], function() {
    const list = [
      {id: 1, status4: '001', asyncStatus4: '003'}, 
      {id: 2, status4: '002', asyncStatus4: '004'},
      {id: 3, status4: '001', asyncStatus4: '004'},
      {id: 4, status4: '002', asyncStatus4: '003'},
    ]
    setTimeout(() => this.list = list, 2000)
  })
}
</script>