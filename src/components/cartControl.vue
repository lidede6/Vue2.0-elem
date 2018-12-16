<template>
  <div class="cart-control">
    <transition name="fadeRotate">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
      <span class="icon-remove_circle_outline inner"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'cartControl',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (e) {
        if (!e._constructed) {
          return
        }
        if (!this.food.count) {
          // 重要,全局使用 this.$set(this.data,”key”,value’)  给data对象新增属性，并触发视图更新
          Vue.set(this.food, 'count', 0)
        }
        this.food.count++;
        // 重要
        this.$root.eventHub.$emit('cart.add', e.target)
      },
      decreaseCart (e) {
        if (!e._constructed || !this.food.count) {
          return
        }
        this.food.count--
      }
    }
  }
</script>
<style lang="less" scoped>
.cart-decrease{
  display: inline-block;
  padding: 6px;
  transition: all 0.4s linear;
  .inner{
    line-height: 24px;
    font-size: 24px;
    color:#00a0dc;
    transition: all 0.4s linear;
  }
  &.fadeRotate-enter-active, &.fadeRotate-leave-active{
    transform: translate3d(0,0,0);
    .inner{
      display: inline-block;
      transform: rotate(0);
    }
  }
  &.fadeRotate-enter, &.fadeRotate-leave-active{
    opacity: 0;
    transform: translate3d(24px,0,0); /*x y z 坐标*/
    .inner{
      transform: rotate(540deg);
    }
  }
}
.cart-count{
  vertical-align: top;
  font-size: 10px;
  color: #93999f;
  line-height: 24px;
  text-align: center;
  padding: 6px 0;
  display: inline-block;
}
.cart-add{
  display: inline-block;
  padding: 6px;
  vertical-align: top;
  font-size: 24px;
  line-height: 24px;
  color:#00a0dc;
}
</style>
