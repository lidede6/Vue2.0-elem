<template>
  <div class="star">
    <div :class="starType" class="star-item">
      <span v-for="itemClass of itemClasses" :class="itemClass" class="star-item"></span>
    </div>
  </div>
</template>
<script>
  const LENGTH = 5;
  const CLS_ON = 'on'
  const CLS_OFF = 'off'
  const CLS_HALF = 'half'
  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses() {
        let res = [];
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let interger = Math.floor(score)
        for (let i = 0; i < interger; i++){
          res.push(CLS_ON)
        }
        if (hasDecimal) {
          res.push(CLS_HALF)
        }
        while (res.length < LENGTH) {
          res.push(CLS_OFF)
        }
        // console.log(res)
        return res

      }
    }
  }
</script>
<style scoped>
  .star{
    font-size:0px;
  }
  .star-item{
    display: inline-block;
    background-repeat: no-repeat;
  }
  .star-48 .star-item{
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
  }
  .star-48 :last-child{
    margin-right:0
  }
  .star-48 .on{
    background-image: url('../assets/star/star48_on@2x.png')
  }
  .star-48 .off{
    background-image: url('../assets/star/star48_off@2x.png')
  }
  .star-48 .half{
    background-image: url('../assets/star/star48_half@2x.png')
  }
  .star-36 .star-item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 100% 100%;
  }
  .star-36 :last-child{
    margin-right:0
  }
  .star-36 .on{
    background-image: url('../assets/star/star36_on@2x.png')
  }
  .star-36 .off{
    background-image: url('../assets/star/star36_off@2x.png')
  }
  .star-36 .half{
    background-image: url('../assets/star/star36_half@2x.png')
  }

  .star-24 .star-item{
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 100% 100%;
  }
  .star-24 :last-child{
    margin-right:0
  }
  .star-24 .on{
    background-image: url('../assets/star/star24_on@2x.png')
  }
  .star-24 .off{
    background-image: url('../assets/star/star24_off@2x.png')
  }
  .star-24 .half{
    background-image: url('../assets/star/star24_half@2x.png')
  }
</style>
