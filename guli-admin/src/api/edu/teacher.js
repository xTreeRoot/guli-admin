import request from '@/utils/request'

export default {
  // 讲师列表（条件分页查询）
  // current分页中的当前页
  // limit 每页记录数
  // teacherQuery条件对象
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      // url: `/eduservice/teacher/pageTeacherCondition/` + current + '/' + limit,

      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象,后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: teacherQuery
    })
  },
  deleteTeacherId(id) {
    return request({
      // url: `/eduservice/teacher/pageTeacherCondition/` + current + '/' + limit,

      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  addTeacher(teacher) {
    return request({
      // url: `/eduservice/teacher/pageTeacherCondition/` + current + '/' + limit,

      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherId(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updateTeacherInfo(teacher) {
    return request({
      // url: `/eduservice/teacher/pageTeacherCondition/` + current + '/' + limit,

      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
