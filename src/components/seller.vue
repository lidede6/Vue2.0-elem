<template>
  <div class="seller wrapper" ref="sellerWrapper">
    <div>
    <div class="overview">
      <div class="title-wrap">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
      </div>
      <ul class="remark">
        <li class="block">
          <h1>起送价</h1>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h1>商家配送</h1>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h1>平均配送时间</h1>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
      <div class="favorite" @click="collectflag = !collectflag">
        <span class="icon-favorite" :class="{'active':collectflag}"></span>
        <span class="text">{{collectflag?'已收藏':'收藏'}}</span>
      </div>
    </div>
    <div class="split"></div>
    <div class="acticities">
      <div class="bulletin">
        <h1>公告与活动</h1>
        <div class="bulletin-text">
          {{seller.bulletin}}
        </div>
      </div>
      <div class="supports">
        <ul>
          <li class="item" v-for="item in seller.supports">
            <!--<span class="icon" :class="classMap[item.type]"></span>-->
            <icon-map class="iconMap" :iconType="item.type" ></icon-map>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="split"></div>
    <div class="pics">
      <h1>商家实景</h1>
      <div class="img-wrapper" ref="picsWrapper">
        <div ref="picList" class="picList">
          <img v-for="pic in seller.pics" :src="pic" width="120" height="90">
        </div>
      </div>
    </div>
    <div class="split"></div>
    <div class="infos">
     <h1>商家信息</h1>
      <ul class="info-list">
        <li class="info" v-for="item of seller.infos">{{item}}</li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
import star from './star'
import axios from 'axios'
import BScroll from 'better-scroll'
import iconMap from './iconMap'
  export default {
    name: 'seller',
    data() {
      return {
        collectflag: false,
        classMap : ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      iconMap:iconMap,
    },
    created() {
      this.scroll()
    },
    methods: {

      scroll() {
        this.$nextTick(() => {
          this.sellscroll = new BScroll(this.$refs.sellerWrapper,
            {click: true,
              mouseWheel: true,
              scrollbar: true
            })
        })
        this.initPicScroll()
      },
      initPicScroll () {
        if (this.picsScroll) {
          return
        }
        const PIC_WIDTH =120
        const MARGIN = 6
        let picLen = this.seller.pics.length
        setTimeout(() => {
          this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px'
        }, 100)

        // console.log(this.$refs.picsWrapper)
        setTimeout(()=>{
          this.picsScroll = new BScroll(this.$refs.picsWrapper, {
            scrollX: true,
          })
        },200)
      }
    }
  }
</script>
<style scoped lang="less">
@import "./seller.less";
</style>
