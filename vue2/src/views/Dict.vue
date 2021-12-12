<template>
  <div>
    <h2>字典下拉 顺序自定义</h2>
    <example1/>
    <h2>mapDictFilter示例</h2>
    <example2/>
    <h2>mapAsyncDictFilter示例</h2>
    <example3/>
    <h2>mapAsyncDictInit callback 是 function</h2>
    <example4/>
    <h2>mapAsyncDictInit callback 是 { push, after }</h2>
    <example5/>
  </div>
</template>

<script>
import example1 from '@/views/DictExample/example1.vue'
import example2 from '@/views/DictExample/example2.vue'
import example3 from '@/views/DictExample/example3.vue'
import example4 from '@/views/DictExample/example4.vue'
import example5 from '@/views/DictExample/example5.vue'

export default {
  name: 'Dict',
  components: {
    example1,
    example2,
    example3,
    example4,
    example5,
  }
}
</script>

<style lang="css">
div table {
  margin: 0 auto;
}
</style>
