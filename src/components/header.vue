<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">

          <icon-map class="icon" :icon-type="seller.supports[0].type"></icon-map>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon iconfont icon-keyboard_arrow_right"></i> <!--如果不加v-if，直接length，会报错，即使有结果-->
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconfont icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailShow" @click="hideDetail">
      <div class="detail-wrapper clearFix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="supports-item" v-for="(item,index) in seller.supports" >
              <icon-map  class="icon" :iconType="item.type"></icon-map>
              <span class="text">{{seller.supports[index].description}}</span></li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
  import star from './star'
  import iconMap from './iconMap'
  export default {
    name: 'ratings',
    data () {
      return {
        detailShow: false,
      }
    },
    props: {
      seller: {
        type:Object
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    components: {
      star,
      iconMap
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>
<style scoped>
  @import "./header.less";
</style>
