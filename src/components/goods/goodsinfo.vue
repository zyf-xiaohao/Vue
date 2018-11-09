<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section" v-if='goodsInfoData.goodsinfo'>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                              <div class="magnifier" id="magnifier1">
                                <div class="magnifier-container">
                                  <div class="images-cover"></div>
                                  <!--当前图片显示容器-->
                                  <div class="move-view"></div>
                                  <!--跟随鼠标移动的盒子-->
                                </div>
                                <div class="magnifier-assembly">
                                  <div class="magnifier-btn">
                                      <span class="magnifier-btn-left">&lt;</span>
                                      <span class="magnifier-btn-right">&gt;</span>
                                  </div>
                                  <!--按钮组-->
                                  <div class="magnifier-line">
                                      <ul class="clearfix animation03">
                                          <li v-for="item in goodsInfoData.imglist" :key="item.id">
                                              <div class="small-img">
                                                  <img :src="item.thumb_path" />
                                              </div>
                                          </li>
                                      </ul>
                                  </div>
                                  <!--缩略图-->
                                </div>
                                <div class="magnifier-view"></div>
                                <!--经过放大的图片显示容器-->
                              </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsInfoData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsInfoData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsInfoData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsInfoData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsInfoData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number :min='1' :max='goodsInfoData.goodsinfo.stock_quantity' size="small" v-model="buyCount"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsInfoData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="cartAddRef" @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>    
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="isShowCommtent=false" :class="isShowCommtent?'':'selected'">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;"  @click="isShowCommtent=true" :class="isShowCommtent?'selected':''">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isShowCommtent" class="tab-content entry">
                                <div style="padding: 0 50px 20px" v-html="goodsInfoData.goodsinfo.content"></div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isShowCommtent" class="tab-content">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textareaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComent" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="CommtentData.length===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in CommtentData" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | formatDate('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination
                                              @size-change="handleSizeChange"
                                              @current-change="handleCurrentChange"
                                              :current-page="pageIndex"
                                              :page-sizes="[2, 4, 6, 8, 10]"
                                              :page-size="pageSize"
                                              layout="total, sizes, prev, pager, next, jumper"
                                              :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goodsInfoData.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to='"/goodsinfo/"+item.id' class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to='"/goodsinfo/"+item.id' class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | formatDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 动画元素 -->
        <transition v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter">
            <div v-show="isShow" ref="cartRef" v-if="goodsInfoData.imglist" class="animateDiv">
                <img :src="goodsInfoData.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'

import { Affix } from 'iview' //有选择的引用iview

export default {
  components: {
    //局部注册
    Affix
  },
  data() {
    return {
      goodsInfoData: {},
      buyCount: 1,
      isShowCommtent: false,
      CommtentData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 2,
      isShow: false,
      cartAddoffset: null,
      shoppingCartoffset: null
    }
  },
  created() {
    this.getGoodsInfoData()
    this.getCommtentData()
  },
  methods: {
    getGoodsInfoData() {
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.goodsId}`)
        .then(response => {
          this.goodsInfoData = response.data.message;
          setTimeout(() => {
            this.cartAddoffset = $(this.$refs.cartAddRef).offset(); //动画初始位置
            this.shoppingCartoffset = $('#shoppingCartCount').offset(); //动画结束位置
            //console.log(this.cartAddoffset);
            //console.log(this.shoppingCartoffset);
          }, 500)
        })
    },
    getCommtentData() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${
            this.$route.params.goodsId
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.total = response.data.totalcount
          this.CommtentData = response.data.message
        })
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.pageIndex = 1;
      this.pageSize = val;
      this.getCommtentData();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`)
      this.pageIndex = val;
      this.getCommtentData();
    },
    postComent() {
      const comment = this.$refs.textareaRef.value;
      //console.log(comment)
      if (comment.trim() == '') {
        this.$message({
          message: '评论内容不能为空',
          type: 'warning'
        });
        return;
      }
      this.$axios
        .post(
          `site/validate/comment/post/goods/${this.$route.params.goodsId}`,
          { commenttxt: comment }
        )
        .then(response => {
          console.log(response)
          if (response.data.status == 0) {
            this.$message({
              message: '评论成功',
              type: 'success'
            })
            this.pageIndex = 1;
            this.getCommtentData();
            this.$refs.textareaRef.value = '';
          }
        })
    },
    cartAdd() {
      this.isShow = true;
      //
      const goods = {
        goodsId: this.$route.params.goodsId,
        count: this.buyCount
      }
      this.$store.commit('addGoods', goods)
    },
    beforeEnter: function(el) {
      $(el).css({
        top: this.cartAddoffset.top,
        left: this.cartAddoffset.left
      });
      el.style.transform = 'scale(1)';
    },
    enter: function(el, done) {
      el.style.transition = 'all 0.5s'
      el.offsetWidth
      $(el).css({
        top: this.shoppingCartoffset.top - 15,
        left: this.shoppingCartoffset.left + 10
      });
      el.style.transform = 'scale(0.3)';
      done()
    },
    afterEnter: function(el) {
      this.isShow = false;
    }
  },
  watch: {
    $route() {
      this.getGoodsInfoData();
      this.getCommtentData();
    }
  },
  updated() {
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
  }
}
</script>

<style scoped>
/* 导入css样式 scoped私有样式,只在该组件中有用 */
@import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
.animateDiv {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.animateDiv img {
  width: 100%;
  height: 100%;
}
</style>