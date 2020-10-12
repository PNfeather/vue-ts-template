<template>
  <div id="app" class="fill-contain">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less">
  @import "~@css/mixin.less";
  @import '~@css/common';

  #app {
    overflow: hidden;
  }
</style>
