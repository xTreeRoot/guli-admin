import request from '@/utils/request'

export default {
  //添加课程信息
  addCourseInfo(courseInfo) {
    return request({

      url: `/eduservice/course/addCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },
//  查询讲师
  getListTeacher(){
    return request({
      url:`/eduservice/teacher/findAll`,
      method:`get`
    })
  },
//根据课程id查询课程基本信息
  getCourseInfoId(id){
    return request({
      url:`/eduservice/course/getCourseInfo/${id}`,
      method:'get'
    })
  },
  //修改课程信息
  updateCourseInfoId(courseInfo){
    return request({
      url:`/eduservice/course/updateCourseInfo`,
      method:'post',
      data:courseInfo
    })
  },
  //课程确认信息
  getPublicCourseInfo(id){
    return request({
      url:`/eduservice/course/getPublicCourseInfo/${id}`,
      method: 'get'
    })
  },
  //课程最终发布
  PublicCourse(id){
    return request({
      url:`/eduservice/course/publishCourse/${id}`,
      method: 'post'
    })
  },
  //TODO课程列表
//课程最终发布
  getListCourse(){
    return request({
      url:`/eduservice/course`,
      method: 'get'
    })
  }
}
