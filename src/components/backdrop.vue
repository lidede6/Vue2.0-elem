<template>
  <transition name="fade-backdrop">
    <div class="backdrop" v-show="isShow"></div>
  </transition>
</template>
<script>
  export default {
    name: 'backdrop',
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="less" scoped>
  .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(7,17,27,0.6);
    /*backdrop-filter: blur(10px);*/
    z-index: 40;
    &.fade-backdrop-enter-active,&.fade-backdrop-leave-active{
      transition: opacity 0.5s;
    }
    &.fade-backdrop-enter,&.fade-backdrop-leave-active{
      opacity: 0;
    }
  }
</style>
