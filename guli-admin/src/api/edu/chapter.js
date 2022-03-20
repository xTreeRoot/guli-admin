import request from '@/utils/request'

export default {
  //1根据课程id获取章节和小节数据列表
  getAllChapterVideo(courseId) {
    return request({

      url: `/eduservice/chapter/getChapterVide/${courseId}`,
      method: 'get'

    })
  }
}
