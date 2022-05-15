import { reqDetailInfo } from '@/api'

export default {
    namespaced: true,
    state: {
        detailInfo: {}
    },
    getters: {
        categoryView(state) {
            return state.detailInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.detailInfo.skuInfo || {}
        }
    },
    mutations: {
        SETDETAILINFO(state, value) {
            state.detailInfo = value
        }
    },
    actions: {
        async getDetailInfo(context, skuId) {
            try {
                const result = await reqDetailInfo(skuId)
                console.log('getDetailInfo:', result)
                if (result.code === 200) {
                    context.commit('SETDETAILINFO', result.data)
                }
            } catch (err) {
                console.log('getDetailInfo err:', err)
            }

        }
    }
}