<template>
  <div>
    <div>
      <label for="status1">普通字典</label>
      <select name="status1" id="status1" v-model="status1Value"> 
        <option value="" selected>全部</option>
        <option v-for="(value, key) in status1" :key="key" :value="key">{{value}}</option>
      </select>
    </div>
    <div>
      <label for="customOwnKeysStatus1">自定义顺序字典</label>
      <select name="customOwnKeysStatus1" id="customOwnKeysStatus1" v-model="customOwnKeysStatus1Value"> 
        <option value="" selected>全部</option>
        <option v-for="(value, key) in customOwnKeysStatus1" :key="key" :value="key">{{value}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'example1',
  data() {
    return {
      status1Value: '',
      customOwnKeysStatus1Value: '',
    }
  },
  computed: {
    ...mapState('dict', ['status1', 'customOwnKeysStatus1']),
  },
}
</script>