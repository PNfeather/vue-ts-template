<template>
  <div name="home">
    hello World!
  </div>
</template>

<script lang='ts'>
// vue扩展插件
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'home',
})
export default class Home extends Vue {
}
</script>
<style scoped lang="less">
[name = 'home'] {
}
</style>
