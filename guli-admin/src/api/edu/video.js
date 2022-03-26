import request from '@/utils/request'

export default {

  // 添加小节
  addVideo(video) {
    return request({
      url: `/eduservice/eduvideo/addVideo`,
      method: 'post',
      data: video

    })
  },
//  删除小节
  deleteVideo(id) {
    return request({
      url: `/eduservice/eduvideo/${id}`,
      method: 'delete'
    })
  },


}
