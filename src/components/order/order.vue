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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="order" status-icon :rules="rules" ref="orderFormRef" label-width="150px">
                                    <el-form-item label="收货人姓名：" prop="accept_name">
                                      <el-input v-model="order.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区：" prop="area">
                                      <v-distpicker :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value" @selected="onSelected"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址：" prop="address">
                                      <el-input v-model="order.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码：" prop="mobile">
                                      <el-input v-model="order.mobile"></el-input>
                                    </el-form-item>
                                   <!--  <el-form-item label="联系电话：">
                                      <el-input v-model="order.telphone"></el-input>
                                    </el-form-item> -->
                                    <el-form-item label="电子邮箱：">
                                      <el-input v-model="order.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码：">
                                      <el-input v-model="order.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="order.payment_id" :label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group @change='expressChange' v-model="order.express_id">
                                      <el-radio :label="1">顺丰快递<em>费用：20.00元</em></el-radio>
                                      <el-radio :label="2">圆通快递<em>费用：10.00元</em></el-radio>
                                      <el-radio :label="3">韵达快递<em>费用：8.00元</em></el-radio>
                                    </el-radio-group>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for='item in goodsList'>
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price*item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <el-input
                                      type="textarea"
                                      :rows="2"
                                      placeholder="订单备注(100字符以内)"
                                      v-model="order.message">
                                    </el-input>

                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalQuantity}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{order.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="goodsAmount" class="price">{{goodsAmounts}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <router-link class="btn button" to="/shopcart">返回购物车</router-link>
                                        <a id="btnSubmit" class="btn submit" @click='committed'>确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
    import VDistpicker from 'v-distpicker'
    import { getLocalStorage } from '../../common/localStorage.js'
	export default{
        components: { VDistpicker },
		data() {
            /**
             * 自定义验证
             * @param  {[type]}   rule     验证的元素
             * @param  {[type]}   value    input标签输入的值
             * @param  {Function} callback 回调函数
             * @return {[type]}            [description]
             */
            var checkMobile = (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('收货人的手机号码不能为空'));
                }
                setTimeout(() => {
                  if (!(/^1[34578]\d{9}$/.test(value))) {
                    callback(new Error('手机号码有误，请重填'));
                  } else {
                   callback()
                  }
                }, 1000);
              };
            return {
                order:{
                    accept_name: '姚钱树',//收件人
                    area:{//订单地址
                      "province": {
                        "code": "230000",
                        "value": "黑龙江省"
                      },
                      "city": {
                        "code": "230300",
                        "value": "鸡西市"
                      },
                      "area": {
                        "code": "230302",
                        "value": "鸡冠区"
                      }
                    },
                    address:'天府之国',//详细地址
                    mobile:'13329900007',//手机号
                    email:'12222222@qq.com',//邮箱
                    post_code:'432901',//邮编
                    message:'',//订单备注
                    payment_id: 6,
                    express_id: 1,
                    expressMoment: 20, //运费
                    goodsAmount: 0 //总金额
                },
                rules: {
                    accept_name: [
                      { required: true, message: '请输入活动名称', trigger: 'blur' },
                      { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],address: [
                      { required: true, message: '请输入除上面所属地区外的详细地址', trigger: 'blur' }
                    ],mobile: [
                      { required: true, validator: checkMobile, trigger: 'blur' }
                    ]
                },
                goodsList: [],//商品清单
                totalQuantity: 0
            }
    	},
        created() {
          this.getGoodsList();          
        },
    	methods:{
            onSelected(data){//省市区联动选择项
                this.order.area = data;
            },
    		getGoodsList(){//获取订单商品
                const Goods = getLocalStorage()
                this.order.goodsids = this.$route.query.ids
                const toPayGoodsId = this.$route.query.ids.split(",")
                toPayGoodsId.forEach(id=>{
                 if(!Goods[id]){
                    this.$message.error('您下单的商品不在您购物车内,请重新确认订单')
                    this.$router.push({ path: '/shopcart' })
                    return false
                 }
                })
                const obj = {}
                this.$axios.get(`site/validate/order/getgoodslist/${this.$route.query.ids}`).then(response => {
                    response.data.message.forEach(item=>{
                        item.buycount = Goods[item.id]
                        this.totalQuantity += item.buycount
                        this.order.goodsAmount += item.sell_price * item.buycount
                        obj[item.id] = item.buycount
                    })
                   this.goodsList = response.data.message
                   this.order.cargoodsobj = obj
                })    			
    		},
            expressChange(label){
                switch(label){
                    case 1:
                    this.order.expressMoment = 20.00
                    break;
                    case 2:
                    this.order.expressMoment = 10.00
                    break;
                    case 3:
                    this.order.expressMoment = 8.00
                    break;
                }
            },
            committed(){//提交订单
                //console.log(this.order)
                this.$refs['orderFormRef'].validate((valid) => {
                  if (!valid) {
                    console.log('error submit!!');
                    return false;
                  } 
                  this.$axios.post('site/validate/order/setorder',this.order).then(response => {
                    //console.log(response.data.message)
                    if (response.data.status == 0) {
                        this.$router.push({path: '/pay', query: { orderid: response.data.message.orderid } })
                        const toPayGoodsId = this.$route.query.ids.split(",")
                        toPayGoodsId.forEach(id=>{
                         this.$store.commit('deleteGoods', id)
                        })
                     }
                  })  
                });
                
            }
    	},
    	computed: {
    	    goodsAmounts() {//订单总金额
    	        return this.order.goodsAmount + this.order.expressMoment
    	    }
    	}
	}
</script>