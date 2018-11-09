import Vue from 'vue'
import moment from 'moment'

//filter挂载到Vue上,不需要导出
Vue.filter('formatDate', (input, formatDate='YYYY-MM-DD') => { 
    return moment().format(formatDate)
})