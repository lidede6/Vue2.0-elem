        header的背后的虚化的背景：
        .background{
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          filter: blur(10px)
        }


        弹出来的提示信息
        .detail{
          position: fixed;
          z-index: 100;
          top: 0;
          right: 0;
          overflow: auto;
          background: rgba(7,17,27,0.8);
          width: 100%;
          height: 100%
        }
