import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { addLocalGoods, getBuyGoodsTotal, updateLocalGoods, deleteLocalGoods } from '../common/localStorage.js' //有选择导入

const store = new Vuex.Store({
    state: {
        buyCount: 0
    },
    mutations: {
        addGoods(state, goods) {
            //state.buyCount += goods.count
            state.buyCount = addLocalGoods(goods) //实现store中数据保存到localStorage中,并把总数量返回给buyCount
        },
        updateGoods(state, goods) {
            state.buyCount = updateLocalGoods(goods)
        },
        deleteGoods(state, goods) {
            state.buyCount = deleteLocalGoods(goods)
        }
    },
    getters: {
        getBuyCount: state => {
            //判断buyCount数据是否等于0(每次刷新,store将会重置,因为它存贮在内存中),如果是0,就调用getBuyGoodsTotal
            //方法,从本地存储中获取数据,设置总商品数,如果不等于0,就加载buyCount的值
            return state.buyCount === 0 ? getBuyGoodsTotal() : state.buyCount
        }
    }
})

export default store