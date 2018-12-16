   商品列表页左侧固定一栏样式：
   
      .goods {
         display: flex; 
         position: absolute;
         top:174px;
         /*bottom: 46px;*/
         width: 100%;
         overflow: hidden;

         .menu-wrapper{
           flex: 0 0 80px;
           width: 80px;
           background: #f3f5f7;
           margin-top: 2px;

           .menu-item{
             position: relative;
             display: table;                          //  display: table;
             height: 54px;
             line-height: 14px;
             margin: 0 12px;
             width: 56px;
             /*border-bottom: 1px solid #ccc;    // 第一种方式

             &:last-child{
               border:none;
             }*/
           }
           .menu-item-select{
             background: #fff;
             font-weight: 700;
             margin-top: -1px;
           }
           .menu-item:after{                         // 第二种方式
             content: '';
             position: absolute;
             left: 0;
             width: 56px;
             bottom: 0;
             border-bottom: 1px solid rgba(7,17,27,0.1)
           }
           .text{
             display: table-cell;                 //  display: table-cell; 
             vertical-align: middle;
             font-size: 12px;
             font-weight:200;
             white-space: normal;
             line-height: 14px;
           }
             .iconMap{
               vertical-align: middle;
             }
         }
       }




      display:table=>相当于“table”标签； 
      display:table-row=>相当于“tr”标签； 
      display:table-cell=>相当于“td”标签；


      1、table至少有一个display:table和display:table-cell这个其实是跟html的table一致的，那么使用了
      table布局之后就可以对应的使用一些table常用的css样式：如border-collapse，text-align 和 
      vertical-align，border-spacing，caption-side，empty-cells等等；

      2、table-cell同样会被其他一些CSS属性破坏，例如float, position:absolute，所以，在
      使用display:table-cell与float:left或是position:absolute属性尽量不用同用。

      3、设置了display:table-cell的元素对宽度高度敏感，对margin值无反应，响应padding属性，
      基本上就是活脱脱的一个td标签元素了。
