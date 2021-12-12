<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>编号</td>
          <td>状态</td>
          <td>异步获得的状态</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.status3 | status3}}</td>
          <td>{{item.asyncStatus3 | asyncStatus3}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapDictFilter, mapAsyncDictFilter } from '@/filters/dict'

export default {
  name: 'example3',
  data() {
    return {
      list: [],
    }
  },
  methods: {
    ...mapActions('dict', ['status3', 'setAsyncStatus3'])
  },
  filters: {
    ...mapDictFilter(['status3', 'asyncStatus3']),
  },
  watch: {
    ...mapAsyncDictFilter(['asyncStatus3'])
  },
  created() {
    this.setAsyncStatus3()
  },
  mounted() {
    const list = [
      {id: 1, status3: '001', asyncStatus3: '003'}, 
      {id: 2, status3: '002', asyncStatus3: '004'},
      {id: 3, status3: '001', asyncStatus3: '004'},
      {id: 4, status3: '002', asyncStatus3: '003'},
    ]
    setTimeout(() => this.list = list, 2000)
  },
}
</script>