import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (value, formatString) => {
  formatString  = formatString || 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
})
