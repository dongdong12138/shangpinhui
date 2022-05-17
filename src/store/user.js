import { reqLogin, reqRegister, reqSendCode, reqUserInfo } from '@/api'

export default {
    namespaced: true,
    state: {
        token: '',
        userInfo: {}
    },
    getters: {},
    mutations: {
        SETUSERTOKEN(state, value) {
            state.token = value
        },
        SETUSERINFO(state, value) {
            state.userInfo = value
        }
    },
    actions: {
        async sendCode(context, tel) {
            try {
                const result = await reqSendCode(tel)
                // console.log('sendCode:', result)
                return result
            } catch (err) {
                console.log('sendCode err:', err)
            }
        },
        async userRegister(context, userInfo) {
            try {
                const result = await reqRegister(userInfo)
                // console.log('userRegister:', result)
                return result
            } catch (err) {
                console.log('userRegister err:', err)
            }
        },
        async userLogin(context, userInfo) {
            try {
                const result = await reqLogin(userInfo)
                // console.log('userLogin:', result)
                if (result.code === 200) {
                    context.commit('SETUSERTOKEN', result.data.token)
                }
                return result
            } catch (err) {
                console.log('userLogin err:', err)
            }
        },
        async getUserInfo(context) {
            try {
                const result = await reqUserInfo()
                console.log('getUserInfo:', result)
                if (result.code === 200) {
                    context.commit('SETUSERINFO', result.data)
                }
            } catch (err) {
                console.log('getUserInfo err:', err)
            }
        }
    }
}