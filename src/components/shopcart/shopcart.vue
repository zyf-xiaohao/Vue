<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for='item in goodsList' :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelect"> </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <inputnumber :goodsId='item.id' :count='item.buycount' @passData='getshopcargoods'></inputnumber>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)" @click='deleteGoods(item.id)'>删除</a>
                                    </td>
                                </tr>
                                <tr v-if='goodsList.length===0'>
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalQuantity}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="continueShopping">继续购物</button>
                            <button class="submit" @click="formSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getLocalStorage } from '../../common/localStorage.js'
import inputnumber from '../subcomponents/inputnumber.vue' //导入
export default {
    components: { inputnumber }, //局部注册组件
    data() {
        return {
            goodsList: []
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            const Goods = getLocalStorage()
            let keys = Object.keys(Goods)
            if (keys.length === 0) {
                this.goodsList = []
                return
            }
            this.$axios.get(`site/comment/getshopcargoods/${keys.join(',')}`).then(response => {
                //console.log(response.data.message)
                response.data.message.forEach(item => {
                    item.buycount = Goods[item.id]
                    item.isSelect = true
                })
                //console.log(response.data.message)
                this.goodsList = response.data.message
            })
        },
        getshopcargoods(goodscounts) {
            //console.log(goodscounts)
            this.goodsList.forEach(item => {
                if (item.id == goodscounts.goodsId) {
                    item.buycount = goodscounts.count
                }
            })
            this.$store.commit('updateGoods', goodscounts)
        },
        deleteGoods(goodsId) {           
            this.$confirm('您确定删除此条商品吗?', '提示', {
       		  confirmButtonText: '确定',
       		  cancelButtonText: '取消',
       		  type: 'warning'
       		}).then(() => {
              this.$store.commit('deleteGoods',  goodsId )  
       		  this.getGoodsList(); 
       		})         
        },
        continueShopping(){
        	this.$router.push({ path: '/goodslist' })
        },
        formSubmit(){
        		let toPayGoodsId = []
        		this.goodsList.forEach(item=>{
        			if (item.isSelect) {
        				toPayGoodsId.push(item.id)
        			}        			
        		})
        		if (toPayGoodsId.length==0) {
        			this.$message({
          			message: '您还没有选中付款项',
          			type: 'warning'
        			})
        			return;
        		}
        		this.$router.push({ path: '/order', query: { ids: toPayGoodsId.join(',') }})
        }
    },
    computed: {
        totalQuantity() {
            let totalQuantity = 0
            this.goodsList.forEach(item => {
                if (item.isSelect) {
                    totalQuantity += item.buycount
                }
            })
            return totalQuantity
        },
        totalAmount() {
            let totalAmount = 0
            this.goodsList.forEach(item => {
                if (item.isSelect) {
                    totalAmount += item.sell_price * item.buycount
                }
            })
            return totalAmount
        }
    }
}
</script>