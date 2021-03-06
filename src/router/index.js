import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import TheDetail from '@/pages/TheDetail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import TheTrade from '@/pages/TheTrade'
import ThePay from '@/pages/ThePay'
import PaySuccess from '@/pages/PaySuccess'
import TheCenter from '@/pages/TheCenter'
import MyOrder from '@/components/Center/MyOrder'
import GroupOrder from '@/components/Center/GroupOrder'

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('@/pages/TheHome'),
            meta: { showFooter: true }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import('@/pages/TheSearch'),
            meta: { showFooter: true }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/pages/TheLogin'),
            meta: { showFooter: false }
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/pages/TheRegister'),
            meta: { showFooter: false }
        },
        {
            name: 'detail',
            path: '/detail/:skuId',
            component: TheDetail,
            meta: { showFooter: true }
        },
        {
            name: 'addCartSuccess',
            path: '/addCartSuccess',
            component: AddCartSuccess,
            meta: { showFooter: true }
        },
        {
            name: 'shopCart',
            path: '/shopCart',
            component: ShopCart,
            meta: { showFooter: true }
        },
        {
            name: 'trade',
            path: '/trade',
            component: TheTrade,
            meta: { showFooter: true },
            beforeEnter(to, from ,next) {
                if (from.name === 'shopCart') {
                    next()
                } else {
                    next(false)
                }
            },
        },
        {
            name: 'pay',
            path: '/pay',
            component: ThePay,
            meta: { showFooter: true },
            beforeEnter(to, from, next) {
                if (from.name === 'trade') {
                    next()
                } else {
                    next(false)
                }
            },
        },
        {
            name: 'paySuccess',
            path: '/paySuccess',
            component: PaySuccess,
            meta: { showFooter: true }
        },
        {
            name: 'center',
            path: '/center',
            component: TheCenter,
            meta: { showFooter: true },
            children: [
                {
                    name: 'myOrder',
                    path: 'myOrder',
                    component: MyOrder
                },
                {
                    name: 'groupOrder',
                    path: 'groupOrder',
                    component: GroupOrder
                },
                {
                    path: '/center',
                    redirect: '/center/myOrder'
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    scrollBehavior() {
        // ?????????????????????
        return { y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    const { token, userInfo } = store.state.user
    if (token) {
        if (to.name === 'login' || to.name === 'register') {
            next(from.path)
        } else {
            if (userInfo.name) {
                next()
            } else {
                const result = await store.dispatch('user/getUserInfo')
                if (result.code === 200) {
                    next()
                } else {
                    // token ????????????????????????????????????????????????????????????
                    const result = store.dispatch('user/userLogout')
                    if (result.code === 200) {
                        next('/login')
                    } else {
                        next(from.path)
                    }
                }
            }
        }
    } else {
        const nameArr = ['trade', 'pay', 'paySuccess', 'myOrder', 'groupOrder']
        if (nameArr.includes(to.name)) {
            next(`/login?redirect=${to.path}`)
        } else {
            next()
        }
    }
})

export default router