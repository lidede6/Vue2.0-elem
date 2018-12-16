<template>
  <div class="">
    <div class="shopCart">
      <div class="content">
        <div class="content-left" @click="listToggle">
          <div class="logo-wrapper">
            <div class="badge" v-show="totalCount">
              {{totalCount}}
            </div>
            <div class="logo" :class="{'active':totalPrice}">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price" :class="{'active':totalPrice}">
            ￥{{totalPrice}}
          </div>
          <div class="desc">
            另需要配送费￥{{deliveryPrice}}
          </div>
        </div>
        <div class="content-right" :class="{'enough':totalPrice>=minPrice}">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-container">
        <transition name="drop"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    v-for="(ball, index) in balls"
                    :key="index">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <transition name="transHeight">
        <div class="shopCart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="setEmpty">清空</span>
          </div>
          <div class="list-content" ref="foodlist">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <backdrop class="backdrop" :is-show="showBackdrop" @click="hideBackdrop"></backdrop>
    <!--listShow为false的时候（购物车清空），backdrop自然消失-->
  </div>
</template>
<script>
  import CartControl from "./cartControl";
  import BScroll from 'better-scroll'
  import backdrop from './backdrop'
  export default {
    name: 'shopCart',
    components: {
      CartControl,
      backdrop
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        listShow: false,
        dropBalls: [],
        balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}]
      }
    },
    computed: {
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
      })
        return count
      },
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          if (food.count) {
            total += food.price * food.count
          }
        })
        return total
      },
      leftAmount () {
        if (this.minPrice >= this.totalPrice && this.totalPrice) {
          return true
        }
        return false
      },
      payDesc () {
        let diff = this.minPrice - this.totalPrice
        if (!this.totalCount) {
          return `￥${this.totalPrice}起送`
        } else if (diff > 0) {
          return `还差￥${diff}元`
        } else {
          return '去结算'
        }
      },
      showBackdrop () {
        if (this.listShow && this.totalPrice) {
          return true
        }
        // 从shopCart-list中减光，背景和list都要消失
        this.listShow = false
        return false
      }
    },
    methods: {
      _initScroll () {
        this.foodListScroll = new BScroll(this.$refs.foodlist, { click: true })
      },
      listToggle () {
        if (!this.selectFoods.length) {
          return
        }
        this.listShow = !this.listShow
        if (this.listShow) {
          this.$nextTick(() => {
            if (!this.foodListScroll) {
              this._initScroll()
            } else {
              // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
              this.foodListScroll.refresh()
            }
          })
        }
      },
      hideBackdrop() {
        console.log(1)
        this.listShow = false
      },
      setEmpty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })

      },
      drop (el) {
        // console.log(el)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter (el) {
        // console.log('beforeEnter')
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            // 元素相对视窗的位置集合
            let rect = ball.el.getBoundingClientRect()
            // console.log(rect)
            let x = rect.left -32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
            el.style.transform = `translate3d(0, ${y}px, 0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            inner.style.transform = `translate3d(${x}px, 0, 0)`
          }
        }

      },
      enter (el) {
        // console.log('enter')
        el.offsetHeight  // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
        // enter回调函数里应该要有done()
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0, 0, 0)`
          el.style.transform = `translate3d(0, 0, 0)`
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = `translate3d(0, 0, 0)`
          inner.style.transform = `translate3d(0, 0, 0)`
        })

      },
      afterEnter (el) {
        // console.log('afterEnter')
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    created () {
      // 事件的派发与接收,前提是main.js中有eventHub数据
      this.$root.eventHub.$on('cart.add', this.drop)
    }
  }
</script>
<style lang="less" scoped>
@import "./shopCart.less";
</style>
