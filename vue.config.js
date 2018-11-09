module.exports = {
    // 选项...
    baseUrl: './', //设置baseUrl,在index.html中导入js，其它文件的时候用到
    productionSourceMap: false, // 不生成source Map文件
    lintOnSave: false,
    configureWebpack: {
        externals: {
            vue: 'Vue',
            axios: 'axios',
            moment: 'moment',
            "v-distpicker": 'VDistpicker',
            "vue-lazyload": 'VueLazyload',
            "vue-router": 'VueRouter',
            vuex: 'Vuex'
        }
    }
}
