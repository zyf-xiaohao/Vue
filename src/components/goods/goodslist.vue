<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsListData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{ item.title }}</span>
                                        <p>
                                            <span v-for="itemsub in item.subcates" :key="itemsub.id">
                                                {{ itemsub.title }}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{ item.title }}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemsub in item.subcates" :key="itemsub.id" href="/goods/43.html">{{ itemsub.title }}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div> 
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                               <el-carousel :interval="3000" height='341px' arrow="always">
                                 <el-carousel-item v-for="item in goodsListData.sliderlist" :key="item.id">
                                   <img :src="item.img_url" alt="">
                                 </el-carousel-item>
                               </el-carousel>     
                            </div>
                        </div>
                    </div>
                    <!--幻灯片结束-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in goodsListData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | formatDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in listData" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem in item.datas" :key="subitem.artID">
                            <router-link :to='"/goodsinfo/"+subitem.artID' class="">
                                <div class="img-box">
                                    <img v-lazy="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .el-carousel-item img {
        width: 100%;
        height: 100%;
    }
</style>


<script>

export default {
  data() {
    return {
      goodsListData: {},
      listData:[]
    }
  },
  created() {
    this.getGoodsListData();
    this.getListData();
  },
  methods: {
    getGoodsListData() {
      this.$axios.get('site/goods/gettopdata/goods').then(
        response => {
          this.goodsListData = response.data.message
        }
      )
    },
    getListData() {
      this.$axios.get('site/goods/getgoodsgroup').then(
        response => {
          this.listData = response.data.message
        }
      )
    }
  }
}
</script>
   