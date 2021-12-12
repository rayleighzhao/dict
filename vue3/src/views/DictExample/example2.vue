<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>编号</td>
          <td>状态</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{status2(item.status2)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapDictFilter } from '@/filters/dict'

export default {
  name: 'example2',
  data() {
    return {
      list: [],
    }
  },
  methods: {
    ...mapDictFilter(['status2']),
  },
  mounted() {
    const list = [
      {id: 1, status2: '001'}, 
      {id: 2, status2: '002'},
      {id: 3, status2: '001'},
      {id: 4, status2: '002'},
    ]
    setTimeout(() => this.list = list, 2000)
  }
}
</script>