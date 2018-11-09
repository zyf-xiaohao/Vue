<!-- 自定义组件需要用template标签包裹 -->
<template>
    <div>
        <div @click='subtraction' class="left">-</div>
        <div class="middle">{{shopcount}}</div>
        <div @click='addition' class="right">+</div>
    </div>
</template>
<style>
.left,
.middle,
.right {
    width: 25px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    border: 1px solid #eee;
    text-align: center;
    /*div点击事件 鼠标放上去显示小手*/
    cursor: pointer;
}

.middle {
    width: 30px;
    margin: 0px 2px;
}
</style>
<script>
export default {
    props: ['goodsId', 'count'], //使用props获取父组件传递过来的值
    data() {
        return {
            shopcount: this.count
        }
    },
    methods: {
        subtraction() {
            if (this.shopcount === 1) {
                return
            }
            this.shopcount--
            this.transmit()
        },
        addition() {
            this.shopcount++
            this.transmit()
        },
        transmit() {
            //自定义事件给父组件传值
            this.$emit('passData', {
                goodsId: this.goodsId,
                count: this.shopcount
            })
        }
    }
}
</script>