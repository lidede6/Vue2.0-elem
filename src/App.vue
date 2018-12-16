<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="'/goods'" >
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to="'/ratings'" >
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" >
          商家
        </router-link>
      </div>
    </div>

    <keep-alive>
      <router-view :seller="seller" :ratings="ratings"/>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      seller : {},
      ratings: [],
      goods: {},
      id: (() => {

      })
    }
  },
  created() {

  },
  mounted() {
    this.getAxiosData()
  },
  components: {
    'v-header': header
  },
  methods: {
    getAxiosData () {
      axios.get('/api/data.json').then(this.getAxiosDataInfoSucc)

    },
    getAxiosDataInfoSucc (res) {
      if (res.data) {
        this.seller = res.data.seller
        this.ratings = res.data.ratings
        this.goods = res.data.goods
        // console.log(res.data)
      }

    }
  }
}
</script>

<style scoped>
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab .tab-item{
    flex:1;
    text-align:center;
  }
  .tab .tab-item a{
    text-decoration: none;
    color: #4d555d;
  }
  .tab .tab-item a.router-link-active{
    color: #f01414;
  }
  .border-1px{
    border-bottom:1px solid #ccc;
  }
</style>
