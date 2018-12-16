<template>
    <span class="iconMap" :class="iconClassMap[iconType]"></span>
</template>
<script>
  export default {
    name: 'iconMap',
    data () {
      return {
        iconClassMap : ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    props: {
      iconType:{
        type: Number
      }
    }
  }
</script>
<style scoped lang="less">
  .iconMap{
    display: inline-block;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 12px;
    height: 12px;
    &.decrease{
      background-image:url('../assets/header/decrease_1@2x.png')
    }
    &.discount{
      background-image:url('../assets/header/discount_1@2x.png')
    }
    &.guarantee{
      background-image:url('../assets/header/guarantee_1@2x.png')
    }
    &.invoice{
      background-image:url('../assets/header/invoice_1@2x.png')
    }
    &.special{
      background-image: url('../assets/header/special_1@2x.png')
    }
  }



</style>
