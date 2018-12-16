better-scroll滚动无效 几种原因

      一、DOM层级关系
      
      <div class="wrapper">
        <div class="content">
          content...
        </div>
      </div>
      
      
      
      wrapper里面不能存在多个同级div，如果你这样写：

      <div class="classifyTitle"  ref="wrapper">
          <div class="">
        ss
          </div>
          <ul>
        <li v-for="(item,index) in classifyData.products">
            <router-link :to="{name:'详情'}">{{item.title}}</router-link>
        </li>
          </ul>
      </div>
      那么ul中的元素将不能滚动



      二、wrapper 与 content 高度问题
      只有content的高度大于wrapper高度时候，才可以滚动
      
      
      
      
      三、wrapper样式
      .wrapper元素上要给定位

      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      
      
      四      
      一定要保证在DOM渲染完毕后初始化better-scroll，也就是添加延时执行，
      
      setTimeout(() => { 
      this._initScroll() 
      }, 20)

      或者
      this.$nextTick(() => { 
      this._initScroll() 
      })




      关于横向滑动图片的better-scroll：
          created() {
            this.getAxiosData()   // 初始化时请求数据
          },
          
          methods: {
            getAxiosData() {
              axios.get('/api/data.json').then(this.getAxiosDataInfoSucc) // 请求数据
            },
            
            getAxiosDataInfoSucc(res) {
              if (res.data) {
                this.seller = res.data.seller
              }
              this.$nextTick(() => {                           // nextTick 设置整体页面的纵向滑动
                this.sellscroll = new BScroll(this.$refs.sellerWrapper,
                  {click: true,
                    mouseWheel: true,
                    scrollbar: true
                  })
              })
              this.initPicScroll()  // 请求到数据后初始化横向的滑动等
            },
            initPicScroll () {
              if (this.picsScroll) {
                return
              }
              const PIC_WIDTH =120
              const MARGIN = 6
              let picLen = this.seller.pics.length
              setTimeout(() => {                         // settimeout 防止报错
                this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px'
              }, 100)

              // console.log(this.$refs.picsWrapper)
              setTimeout(()=>{                               // settimeout 防止报错
                this.picsScroll = new BScroll(this.$refs.picsWrapper, {
                  scrollX: true,
                })
              },200)
            }
          }
