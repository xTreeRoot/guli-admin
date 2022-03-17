import request from '@/utils/request'

export default {
  // 讲师列表（条件分页查询）
  // current分页中的当前页
  // limit 每页记录数
  // teacherQuery条件对象
  getSubjectList(current, limit, teacherQuery) {
    return request({

      url: `/eduservice/subject/getAllSbject`,
      method: 'get'
    })
  }
}
