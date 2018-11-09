    import Vue from 'vue'
    import VueRouter from 'vue-router'

    Vue.use(VueRouter)

    //优化axios
    import axios from 'axios'
    axios.defaults.baseURL = 'http://47.106.148.205:8899/'
    axios.defaults.withCredentials = true //让ajax携带cookie
    Vue.prototype.$axios = axios

    // import goodslist from '../components/goods/goodslist.vue'
    // import goodsinfo from '../components/goods/goodsinfo.vue'
    // import shopcart from '../components/shopcart/shopcart.vue'
    // import order from '../components/order/order.vue'
    // import login from '../components/account/login.vue'
    // import pay from '../components/order/payorder.vue'
    // import paySuccess from '../components/pay/paySuccess.vue'
    // import vipcenter from '../components/vip/vipcenter.vue'
    // import myOrders from '../components/vip/myOrders.vue'
    // import orderInfo from '../components/vip/orderInfo.vue'
    const goodslist = () =>
        import ( /* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
    const goodsinfo = () =>
        import ( /* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
    const shopcart = () =>
        import ( /* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
    const order = () =>
        import ( /* webpackChunkName: "order" */ '../components/order/order.vue')
    const login = () =>
        import ( /* webpackChunkName: "login" */ '../components/account/login.vue')
    const pay = () =>
        import ( /* webpackChunkName: "pay" */ '../components/order/payorder.vue')
    const paySuccess = () =>
        import ( /* webpackChunkName: "paySuccess" */ '../components/pay/paySuccess.vue')
    const vipcenter = () =>
        import ( /* webpackChunkName: "vipcenter" */ '../components/vip/vipcenter.vue')
    const myOrders = () =>
        import ( /* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
    const orderInfo = () =>
        import ( /* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')

    const router = new VueRouter({
        routes: [{
            path: '/',
            redirect: '/goodslist'
        }, {
            path: '/goodslist',
            component: goodslist
        }, {
            path: '/goodsinfo/:goodsId',
            component: goodsinfo
        }, {
            path: '/shopcart',
            component: shopcart
        }, {
            path: '/order',
            component: order,
            meta: { isCheck: true } //路由元信息,标注该路由的执行情况
        }, {
            path: '/login',
            component: login
        }, {
            path: '/pay',
            component: pay,
            meta: { isCheck: true }
        }, {
            path: '/paySuccess',
            component: paySuccess,
            meta: { isCheck: true }
        }, {
            path: '/vipcenter',
            component: vipcenter,
            meta: { isCheck: true }
        }, {
            path: '/myOrders',
            component: myOrders,
            meta: { isCheck: true }
        }, {
            path: '/orderInfo/:orderid',
            component: orderInfo,
            meta: { isCheck: true }
        }]
    })

    /**
     * 导航守卫
     * @param  to 即将要进入的目标 路由对象, 
     * from 当前导航正要离开的路由,         
     * next 执行跳转
     * @return {[type]}      [description]
     */
    router.beforeEach((to, from, next) => {
        if (to.path != '/login') {
            localStorage.setItem('wantToGo', to.fullPath)
        }

        if (to.meta.isCheck) {
            axios.get('site/account/islogin').then(response => {
                //console.log(response.data.code)
                if (response.data.code == 'logined') {
                    next()
                } else {
                    router.push({ path: '/login' })
                }
            })
        } else {
            next()
        }
    });

    export default router
