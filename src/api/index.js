import request from '@/api/ajax'
import requestMock from '@/api/ajaxMock'

/**
 * 请求三级联动数据
 * @returns {Promise}
 */
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })

/**
 * 请求首页轮播图数据
 * @returns {Promise}
 */
export const reqBannerList = () => requestMock.get('/banner')

/**
 * 请求楼层数据
 * @returns {Promise}
 */
export const reqFloorList = () => requestMock.get('/floor')

/**
 * 请求搜索模块数据
 * {
 *   "category3Id": "61",
 *   "categoryName": "手机",
 *   "keyword": "小米",
 *   "order": "1:desc",
 *   "pageNo": 1,
 *   "pageSize": 10,
 *   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
 *   "trademark": "4:小米"
 * }
 * @param {Object} params 参数对象，如果没有，默认传 {}
 * @returns {Promise}
 */
export const reqSearchInfo = (params = {}) => request({ url: '/list', method: 'post', data: params })