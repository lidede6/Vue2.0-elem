<template>
  <transition name="move">
    <div class="food-detail-wrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
        <div class="back" @click="showToggle">
          <i class="icon-arrow_lift"></i>
        </div>
        <img width="100%" height="425" :src="food.image">
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <transition name="fade">
              <div class="text" v-show="!food.count" @click="addCart($event)">加入购物车</div>
            </transition>
          </div>
          <cart-control class="cartControl" :food="food"></cart-control>
        </div>
        <div class="split"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="split"></div>
        <div class="ratings">
          <div class="title">商品评价</div>
          <div class="classify">
            <span class="item"
                  v-for="(item,index) in classifyArr"
                  :class="{'active':item.active, 'bad': index==2, 'badActive':item.active && index==2}"
                  @click="filterEvel(item)">
              {{item.name}}<span class="count">{{item.count}}</span>
            </span>
          </div>
          <div class="switch" @click="evelflag = !evelflag">
            <span class="icon-check_circle" :class="{'on': evelflag}"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="evel in evelArr">
                <div class="userInfo">
                  <div class="time">{{evel.rateTime | time}}</div>
                  <div class="user">
                    <span>{{evel.username}}</span>
                    <span class="avatar">
                      <img width="12" height="12" :src="evel.avatar">
                    </span>
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="evel.rateType? 'icon-thumb_down' : 'icon-thumb_up' "></span>
                  <span class="text">{{evel.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import cartControl from './cartControl'
  import BScroll from 'better-scroll'
  import '../util/time'

  export default {
    // 这里是字符串
    name: 'foodDetail',
    props: {
      food: Object
    },
    components: {
      cartControl
    },
    data() {
      return {
        showDetail: false,
        evelflag: true, // 过滤，只剩有内容的评价
        classifyArr:[{
          name: '全部',
          count: this.food.ratings.length,
          active: true
        },{
          name: '推荐',
          count: this.food.ratings.filter((data) => data.rateType ===0).length,
          active: false
        },{
          name: '吐槽',
          count: this.food.ratings.filter((data) => data.rateType).length,
          active: false
        }]
      }
    },
    methods: {
      showToggle () {
        this.showDetail = !this.showDetail
        if (this.showDetail) {
          this.$nextTick(() => {
            this._initBScroll()
          })
        }
      },
      _initBScroll () {
        if (!this.foodDetailWrapper) {
          this.foodDetailWrapper = new BScroll (this.$refs.detailWrapper, {
            click: true
          })
        } else {
          this.foodDetailWrapper.refresh()
        }

      },
      // 过滤好评差评
      filterEvel (item) {
        this.classifyArr.forEach((data) => {
          data.active = false
        })
        item.active = true
      },
      addCart(el){
        if (!el._constructed) {
          return
        }
        // this.$set()和Vue.set()本质方法一样，前者可以用在methods中使用。
        // set方法调用时，可以触发页面全部重新渲染。
        this.$set(this.food, 'count', 1)
        this.$root.eventHub.$emit('cart.add', el.target)
      }
    },
    computed: {
      // 评价内容过滤后的数组
      evelArr () {
        let selectIndex = 0
        this.classifyArr.forEach((data,index) => {
          if (data.active) {
            selectIndex = index
          }
        })
        if (this.foodDetailWrapper) {
          this.$nextTick(() => {
            this.foodDetailWrapper.refresh()
          })
        }
        // 判断好评、差评以及是否有内容
        return selectIndex ? this.food.ratings.filter((data) => this.evelflag ? data.rateType === selectIndex-1 && data.text : data.rateType === selectIndex-1)
          : this.food.ratings.filter((data) => this.evelflag ? data.text : true)

      }
    }
  }
</script>
<style lang="less" scoped>
@import "./foodDetail.less";
</style>
