import request from '@/utils/request'

export default {
  //生成本地数据
  createStaDate(day) {
    return request({
      url: `/staservice/sta/registerCount/${day}`,
      method: 'post'
    })
  },
  //获取到数据库的数据
  getData(searchObj) {
    return request({
      url: `/staservice/sta/shwoData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  }

}
