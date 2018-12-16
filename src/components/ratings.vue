<template>
<div class="ratingsWrapper" ref="ratingsWrapper">
  <div class="ratings-content">
    <div class="info">
      <div class="mark">
        <div class="num">{{seller.score}}</div>
        <div class="text">综合评分</div>
        <div class="constrast">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="stars">
        <div class="serviceScore">
          <span class="text">服务态度</span>
          <star :size="36" class="star" :score="seller.serviceScore"></star>
          <span class="num">{{seller.serviceScore}}</span>
        </div>
        <div class="foodScore">
          <span class="text">食物质量</span>
          <star :size="36" class="star" :score="seller.foodScore"></star>
          <span class="num">{{seller.foodScore}}</span>
        </div>
        <div class="deliveryTime">
          <div class="text">送达时间</div>
          <div class="time">{{seller.deliveryTime}}</div>
        </div>
      </div>
    </div>
    <div class="split"></div>
    <div class="ratings">
      <div class="classify">
        <span class="item" v-for="(item,index) in classifyArr"
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
            <div class="avatar">
              <img width="28" height="28" :src="evel.avatar">
            </div>
            <div class="content">
              <div class="user">
                <span class="name">{{evel.username}}</span>
                <span class="rateTime">{{evel.rateTime | time}}</span>
              </div>
              <div class="star-wrapper">
                <star :size="24" :score="evel.score" class="star"></star>
                <span class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">
                {{evel.text}}
              </div>
              <div class="recommend">
                <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                <span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import BScroll from 'better-scroll'
  import star from './star'
  import '../util/time'

  export default {
    name: 'ratings',
    props: {
      ratings: Array, // 父组件传值，子组件可以不接收
      seller: Object
    },
    components: {
      star
    },
    data () {
      return {
        evelflag: true,
        classifyArr: [{
          name: '全部',
          count: 0,
          active: true
        }, {
          name: '推荐',
          count: 0,
          active: false
        }, {
          name: '吐槽',
          count: 0,
          active: false
        }]

      }
    },
    computed: {
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
        return selectIndex ? this.ratings.filter((data) => this.evelflag ? data.rateType === selectIndex-1 && data.text : data.rateType === selectIndex-1)
          : this.ratings.filter((data) => this.evelflag ? data.text : true)

      }
    },
    methods: {
      _initBScroll () {
        this._initClassifyArr()
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          })
        })
      },
      filterEvel (item) {
        this.classifyArr.forEach((data) => {
          data.active = false
        })
        item.active = true
      },
      _initClassifyArr () {
        this.classifyArr.forEach((data, index) => {
          if (index) {
            data.count = this.ratings.filter((temp) => temp.rateType === index - 1 ).length
          } else {
            data.count = this.ratings.length
          }
        })
      }
    },
    created () {
      this._initBScroll()
    }
  }
</script>
<style scoped lang="less">
@import "./ratings.less";
</style>
