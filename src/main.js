import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.min.css'

import TypeNav from '@/components/TypeNav'
import BaseSwiper from '@/components/BaseSwiper'
import BasePagination from '@/components/BasePagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(BaseSwiper.name, BaseSwiper)
Vue.component(BasePagination.name, BasePagination)

Vue.config.productionTip = false

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    router,
    store,
    render: h => h(App),
}).$mount('#app')
