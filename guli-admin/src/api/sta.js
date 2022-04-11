import request from '@/utils/request'

export default {
  //生成本地数据
  createStaDate(day) {
    return request({
      url: `/staservice/sta/registerCount/${day}`,
      method: 'post'
    })
  }

}
