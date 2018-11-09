import Vue from 'vue'
import App from './App.vue'
//import ElementUI from 'element-ui'
import Vuelazyload from 'vue-lazyload'

Vue.config.productionTip = false

//导入头部和底部样式
import './statics/site/css/style.css'

//导入过滤器
import './filters'

//图片懒加载
Vue.use(VueLazyload, {
    loading: require('./statics/site/images/01.gif')
})

//按需导入ElementUI
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
} from 'element-ui'

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(VueLazyload, {
    loading: require('./statics/site/images/01.gif')
})

//轮播图
//import 'element-ui/lib/theme-chalk/index.css'
//Vue.use(ElementUI)

//导入路由
import router from './router/index.js'

//导入vuex
import store from './store'

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
