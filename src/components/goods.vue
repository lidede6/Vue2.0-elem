<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item current"
            v-for="(item,index) in goods"
            @click="menuCick(index, $event)"
            :class="index==menuCurrentIndex?'menu-item-select':'menu-item'">
          <span class="text">
            <icon-map v-if="item.type>0" class="iconMap" :icon-type="item.type" ></icon-map>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="showFoodDetail(food,$event)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class="description" v-show="food.description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="sellRating">好评率{{food.sellCount}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice">
                    <span class="unit">￥</span>
                    {{food.price}}
                  </span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="carControl-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods">
    </shop-cart>
    <!--下面不能用v-show，必须v-if，v-show的话因为还没传值，会报错-->
    <food-detail :food="selectedFood" v-if="selectedFood" ref="myFood"></food-detail>
  </div>
</template>
<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import iconMap from './iconMap'
  import cartControl from './cartControl'
  import shopCart from './shopCart'
  import foodDetail from './foodDetail'

  export default {
    name: 'goods',
    data() {
      return {
        goods: [],
        listHeight: [],
        selectedFood: '',
        foodsScrollY: 0, // 实时变化
      }
    },
    props:{
      seller: {
        type: Object
      }
    },
    computed: {
      menuCurrentIndex () { // 也是实时变化
        for (let i=0; i < this.listHeight.length; i++) {
          let topHeight = this.listHeight[i]
          let bottomHeight = this.listHeight[i+1]
          // 下面的后面的判断不能用 <= 只能用<
          if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    components: {
      iconMap,
      cartControl,
      shopCart,
      foodDetail
    },
    methods: {
      getAxiosData() {
        axios.get('/api/data.json').then(this.getAxiosDataInfoSucc)

      },
      getAxiosDataInfoSucc(res) {
        if (res.data) {
          this.goods = res.data.goods
        }
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      },
      _initScroll () {
        this.menuscroll = new BScroll(this.$refs.menuWrapper, {click: true})
        this.foodscroll = new BScroll(this.$refs.foodWrapper, {click: true, probeType: 3})
        // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        // 如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
        // console.log(this.foodscroll)

        // 监控滚动事件
        this.foodscroll.on('scroll', (pos) => {
          this.foodsScrollY = Math.abs(Math.round(pos.y))
          // console.log(this.foodsScrollY)
        })
      },
      // 计算每个大列表的叠加高度，放到数组里
      _calculateHeight () {
        let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        // console.log(this.listHeight)
      },
      // 点击左侧导航，跳到对应食物
      menuCick (index, e) {
        // 如果不存在这个属性,则为原生点击事件，不执行下面的函数
        if (!e._constructed){
          return
        }
        // 参数分别为横纵轴坐标，动画时间
        this.foodscroll.scrollTo(0, -this.listHeight[index], 300)
      },
      showFoodDetail (food, e) {
        if (!e._constructed) {
          return
        }
        // console.log(food)
        this.selectedFood = food
        this.$nextTick(() => {
          // console.log(this.$refs.myFood)
          // 父组件可以调用子组件的方法，子组件不能调用父组件的方法
          // 外层组件是不是使用了v-if，换成v-show 试一下
          // this.refs的组件在v-if为false的父节点下，导致这个子组件未渲染，所以获取不到。
          this.$refs.myFood.showToggle()
        })
      }
    },
      created() {
        this.getAxiosData()
      }
    }

</script>
<style scoped lang="less">
@import "./goods.less";
</style>
