# Vue2-elem
Vue2-elem, learn and do it

      bulletin
     
     HTML:
     <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconfont icon-keyboard_arrow_right"></i>
    </div>
    
    CSS:
    .bulletin-wrapper{
      overflow: hidden;
      height: 28px;
      line-height:28px;
      background: rgba(7,17,27,0.2);
      text-overflow: ellipsis;
      white-space: nowrap;  试试normal
      position: relative;
      padding:0 22px 0 12px; 不能在文字上加，因为箭头是绝对定位，脱离文档流了
    }
    .bulletin-wrapper .bulletin-title{
      background-image: url('../assets/header/bulletin@2x.png');
      width: 22px;
      height: 12px;
      display: inline-block;
      background-size:100% 100%;
      margin-left: 4px;
      margin-top: 2px;
    }
    .bulletin-wrapper .bulletin-text{
      vertical-align: top;
      font-size: 10px;
      margin: 0 4px;
    }
    .bulletin-wrapper .icon-keyboard_arrow_right {
      position: absolute;
      right:12px;
      top: 8px;
      font-size: 10px;

    }
    
    
    
    
    
    小图标和文字在一排的时候，给小图标设置vertical-align: top;
    或者给他俩都设置vertical-align: middle;
    
    
    vertical-align:
    
      值	描述
      top	      把元素的顶端与行中最高元素的顶端对齐
      bottom	把元素的顶端与行中最低的元素的顶端对齐。
      
      baseline	默认。元素放置在父元素的基线上。
     
      text-top	把元素的顶端与父元素字体的顶端对齐
      middle	把此元素放置在父元素的中部。
      
      text-bottom	把元素的底端与父元素字体的底端对齐。
      
      
      
      
      
      
      
      使用 ref 来定位 DOM 节点很方便。但是期间遇到了一个问题，就是在生命周期 mounted 钩子函数里面使用 this.$refs.xx，
      打印出来的却是 undefined？
      
      如果在 DOM 结构中的某个 DOM 节点使用了 v-if、v-show 或者 v-for（即根据获取到的后台数据来动态操作 DOM，即响应式），
      那么这些 DOM 是不会在 mounted 阶段找到的。
      
      mounted 阶段，一般是用于发起后端请求，获取数据，配合路由钩子做一些事情。
      简单来说就是在 mounted 钩子中加载数据而已，加载回来的数据是不会在这个阶段更新到 DOM 中的。所以在 mounted 钩子中使用 $refs，
      如果 ref 是定位在有 v-if、v-for、v-show 的 DOM 节点中，返回来的只能是 undefined，因为在 mounted 阶段他们根本不存在！！！
      
      如果说 mounted 阶段是加载阶段，那么 updated 阶段则是完成了数据更新到 DOM 的阶段(对加载回来的数据进行处理)，
      此时，再使用 this.$refs.xx，就 100% 能找到该 DOM 节点。
      
      updated 与 mounted 不同的是，在每一次的 DOM 结构更新，Vue.js 都会调用
      一次 updated 钩子函数！而 mounted 钩子函数仅仅只执行一次而已。

