const KEY = "GOODS"

//获取localStorage
const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

/**
 * 获取总商品数量
 * @return {[type]} 加购的商品总数
 */
const getBuyGoodsTotal = () => {
    const Goods = getLocalStorage()
    var total = 0 //不能用const定义,常量不可改
    for (var key in Goods) {
        total += Goods[key]
    }
    return total
}

/**
 * 加入购物车操作
 * @param  {[type]} goods 加入购物车的商品id和数量组成的对象
 * @return {[type]}       加购的商品总数
 */
const addLocalGoods = (goods) => {
    const Goods = getLocalStorage()
        //console.log(goods)
    if (Goods[goods.goodsId]) {
        Goods[goods.goodsId] += goods.count
    } else {
        Goods[goods.goodsId] = goods.count
    }
    //console.log(Goods)
    localStorage.setItem(KEY, JSON.stringify(Goods)) //设置localStorage
    return getBuyGoodsTotal() //求出本地存储的总商品数量
}

/**
 * 修改购物车操作
 * @param  {[type]} goods 要修改商品id和数量组成的对象
 * @return {[type]}       购物车的商品总数
 */
const updateLocalGoods = (goods) => {
    const Goods = getLocalStorage()
        //for (var key in Goods) {
        //    if (key == goods.goodsId) {
        //        Goods[key] = goods.count
        //    }
        //}
    Goods[goods.goodsId] = goods.count
    localStorage.setItem(KEY, JSON.stringify(Goods))
    return getBuyGoodsTotal()
}

const deleteLocalGoods = (goodsId) => {
    const Goods = getLocalStorage()
    delete Goods[goodsId]
    localStorage.setItem(KEY, JSON.stringify(Goods))
    return getBuyGoodsTotal()
}

//有选择导出
export {
    addLocalGoods,
    getBuyGoodsTotal,
    getLocalStorage,
    updateLocalGoods,
    deleteLocalGoods
}
